//Calendário
function renderCalendar() {
    let year = calendarDate.getFullYear();
    let month = calendarDate.getMonth();

    // Dia da semana do dia 1 (0 = domingo) e número de dias do mês
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // A semana começa à segunda-feira
    let emptyDays = firstDay - 1;

    if (firstDay === 0) {
        emptyDays = 6;
    }

    calendarMonth.innerText = monthNames[month] + " " + year;
    calendarDays.innerText = "";

    for (let i = 0; i < emptyDays; i++) {
        calendarDays.appendChild(document.createElement("span"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let date = formatDate(year, month, day);
        let button = createButton(day, () => selectDate(date));
        let holiday = findHoliday(date);

        if (date === getToday()) {
            button.classList.add("today");
        }

        if (date === selectedDate) {
            button.classList.add("selected");
        }

        if (tasks.some((task) => task.date === date)) {
            button.classList.add("has-tasks");
        }

        if (holiday) {
            button.classList.add("holiday");
            button.setAttribute("title", holiday.localName);
        }

        calendarDays.appendChild(button);
    }
}

function selectDate(date) {
    selectedDate = date;
    taskDateInput.value = date;

    let text = "Tarefas para " + showDate(date);
    let holiday = findHoliday(date);

    if (holiday) {
        text = text + " — 🎉 Feriado: " + holiday.localName;
    }

    selectedDateText.innerText = text;
    renderTasks();
}

function changeMonth(amount) {
    // Pôr o dia a 1 para não saltar meses (ex.: 31 de outubro + 1 mês)
    calendarDate.setDate(1);
    calendarDate.setMonth(calendarDate.getMonth() + amount);

    // Mudou de ano: buscar os feriados desse ano
    if (calendarDate.getFullYear() !== holidaysYear) {
        loadHolidays(calendarDate.getFullYear());
    }

    renderCalendar();
}

function clearDateFilter() {
    selectedDate = null;
    taskDateInput.value = getToday();
    selectedDateText.innerText = "A mostrar todas as tarefas.";

    // Limpa a pesquisa
    searchText = "";
    searchForm.reset();

    // Volta ao filtro "Todas"
    currentFilter = "all";
    listTitle.innerText = "Todas as tarefas";
    filterBtns.forEach((button) => button.classList.remove("active"));
    allBtn.classList.add("active");

    renderTasks();
}