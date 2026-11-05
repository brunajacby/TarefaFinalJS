//Login
function login(e) {
    e.preventDefault();

    let email = new FormData(this).get("email").trim().toLowerCase();

    this.email.classList.remove("input-error");

    if (email === "") {
        this.email.classList.add("input-error");
        loginMessage.innerText = "Escreve o teu email.";
        return;
    }

    // Se a primeira vez com email, pedir o nome para guardar no localStorage.
    if (!localStorage.getItem("name-" + email)) {
        let name = prompt("Bem-vindo! Qual é o teu nome?");

        if (name === null || name.trim().length < 2) {
            loginMessage.innerText = "Precisas de indicar um nome (mínimo 2 letras).";
            return;
        }

        localStorage.setItem("name-" + email, name.trim());
    }

    localStorage.setItem("user", email);
    loginMessage.innerText = "";
    this.reset();
    showApp();
}

function showApp() {
    let user = localStorage.getItem("user");

    if (user) {
        loginSection.classList.add("hidden");
        appSection.classList.remove("hidden");
        let name = localStorage.getItem("name-" + user);
        welcome.innerText = "Olá, " + name + "! " + getGreeting();

        let saved = localStorage.getItem("tasks-" + user);

        if (saved) {
            tasks = JSON.parse(saved);
        } else {
            tasks = [];
        }

        renderTasks();

        // Cidade guardada por utilizador
        if (localStorage.getItem("city-" + user)) {
            searchCity(localStorage.getItem("city-" + user));
        } else {
            searchCity("Lisboa");
        }
    } else {
        loginSection.classList.remove("hidden");
        appSection.classList.add("hidden");
    }
}

function logout() {
    localStorage.removeItem("user");
    showView(dashboardView, "Dashboard", navDashboard);
    showApp();
}

function getGreeting() {
    let hour = new Date().getHours();

    if (hour < 12) {
        return "Bom dia";
    } else if (hour < 20) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

//Menu e navegação
function toggleMenu() {
    if (sidebar.classList.contains("open")) {
        closeMenu();
    } else {
        sidebar.classList.add("open");
        overlay.classList.add("show");
    }
}

function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
}

function showView(view, title, button) {
    dashboardView.classList.add("hidden");
    tasksView.classList.add("hidden");
    view.classList.remove("hidden");

    navDashboard.classList.remove("active");
    navTasks.classList.remove("active");
    button.classList.add("active");

    pageTitle.innerText = title;
    closeMenu();
}

//Data e hora
function showDateTime() {
    let now = new Date();
    dateTime.innerText = now.toLocaleDateString("pt-PT") + " - " + now.toLocaleTimeString("pt-PT");
}

// Junta a data no formato "2026-11-05"
function formatDate(year, month, day) {
    month = month + 1;

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

function getToday() {
    let today = new Date();
    return formatDate(today.getFullYear(), today.getMonth(), today.getDate());
}

function showDate(date) {
    return new Date(date).toLocaleDateString("pt-PT");
}

//Tema
function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);

    if (theme === "night") {
        themeBtn.innerText = "Tema claro";
    } else {
        themeBtn.innerText = "Tema escuro";
    }
}

function changeMode() {
    if (document.body.classList.contains("day")) {
        applyTheme("night");
    } else {
        applyTheme("day");
    }
}