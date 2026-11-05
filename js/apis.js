//API do tempo
//Descobrir onde fica a cidade
function searchCity(name) {
    weather.innerText = "A procurar " + name + "...";

    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + name + "&count=1&language=pt")
        .then((response) => response.json())
        .then((data) => {
            if (!data.results) {
                weather.innerText = "Cidade não encontrada: " + name;
                return;
            }

            let place = data.results[0];
            localStorage.setItem("city-" + localStorage.getItem("user"), place.name);
            loadWeather(place.latitude, place.longitude, place.name + ", " + place.country);
        })
        .catch(() => {
            weather.innerText = "Não foi possível procurar a cidade.";
        });
}

// Buscar o tempo das cidades
function loadWeather(lat, lon, placeName) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,weather_code&timezone=auto")
        .then((response) => response.json())
        .then((data) => {
            weather.innerText = placeName + ": " + weatherDescription(data.current.weather_code) +
                " | " + Math.round(data.current.temperature_2m) + " °C";
        })
        .catch(() => {
            weather.innerText = "Não foi possível carregar o tempo.";
        });
}

function weatherDescription(code) {
    if (code === 0) {
        return "☀️ Céu limpo";
    } else if (code <= 3) {
        return "⛅ Nublado";
    } else if (code <= 48) {
        return "🌫️ Nevoeiro";
    } else if (code <= 67) {
        return "🌧️ Chuva";
    } else if (code <= 77) {
        return "❄️ Neve";
    } else {
        return "⛈️ Trovoada";
    }
}

function changeCity(e) {
    e.preventDefault();

    let city = new FormData(this).get("city").trim();

    if (city.length < 2) {
        weather.innerText = "Escreve o nome de uma cidade.";
        return;
    }

    this.reset();
    searchCity(city);
}

//API dos feriados (Nager.Date)
function loadHolidays(year) {
    holidaysYear = year;

    fetch("https://date.nager.at/api/v3/PublicHolidays/" + year + "/PT")
        .then((response) => response.json())
        .then((data) => {
            // Só os feriados nacionais
            holidays = data.filter((holiday) => holiday.global);

            // A lista do Dashboard só mostra os feriados do ano atual
            if (year === new Date().getFullYear()) {
                let upcoming = holidays.filter((holiday) => holiday.date >= getToday());

                holidaysMessage.innerText = "Os próximos feriados:";
                holidaysList.innerText = "";

                upcoming.forEach((holiday, index) => {
                    if (index < 3) {
                        let li = document.createElement("li");
                        li.innerText = showDate(holiday.date) + " — " + holiday.localName;
                        holidaysList.appendChild(li);
                    }
                });
            }

            renderCalendar();
        })
        .catch(() => {
            holidaysMessage.innerText = "Não foi possível carregar os feriados.";
        });
}

function findHoliday(date) {
    return holidays.find((holiday) => holiday.date === date);
}