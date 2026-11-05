//Eventos 
loginForm.addEventListener("submit", login);
logoutBtn.addEventListener("click", logout);
themeBtn.addEventListener("click", changeMode);

menuBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);
navDashboard.addEventListener("click", () => showView(dashboardView, "Dashboard", navDashboard));
navTasks.addEventListener("click", () => showView(tasksView, "Tarefas", navTasks));

cityForm.addEventListener("submit", changeCity);
taskForm.addEventListener("submit", addTask);
filterBtns.forEach((button) => button.addEventListener("click", setFilter));
searchForm.addEventListener("submit", searchTasks);

document.getElementById("prev-month").addEventListener("click", () => changeMonth(-1));
document.getElementById("next-month").addEventListener("click", () => changeMonth(1));
document.getElementById("clear-date-filter").addEventListener("click", clearDateFilter);

//Início 
if (localStorage.getItem("theme") === "night") {
    applyTheme("night");
} else {
    applyTheme("day");
}

taskDateInput.value = getToday();
showApp();
renderCalendar();
showDateTime();
setInterval(showDateTime, 1000);

loadHolidays(new Date().getFullYear());