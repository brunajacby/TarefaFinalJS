//Elementos
const loginSection = document.getElementById("login-section");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const appSection = document.getElementById("app-section");
const welcome = document.getElementById("welcome");
const dateTime = document.getElementById("date-time");
const themeBtn = document.getElementById("theme-btn");
const logoutBtn = document.getElementById("logout-btn");

const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navDashboard = document.getElementById("nav-dashboard");
const navTasks = document.getElementById("nav-tasks");
const pageTitle = document.getElementById("page-title");
const dashboardView = document.getElementById("dashboard-view");
const tasksView = document.getElementById("tasks-view");
const celebration = document.getElementById("celebration");

const cityForm = document.getElementById("city-form");
const weather = document.getElementById("weather");
const holidaysMessage = document.getElementById("holidays-message");
const holidaysList = document.getElementById("holidays-list");

const taskForm = document.getElementById("task-form");
const taskMessage = document.getElementById("task-message");
const taskList = document.getElementById("task-list");
const listTitle = document.getElementById("list-title");
const taskDateInput = document.getElementById("task-date");
const filterBtns = document.querySelectorAll(".filter-btn");
const allBtn = document.getElementById("all-btn");
const searchForm = document.getElementById("search-form");
const todayMessage = document.getElementById("today-message");
const todayList = document.getElementById("today-list");

const calendarMonth = document.getElementById("calendar-month");
const calendarDays = document.getElementById("calendar-days");
const selectedDateText = document.getElementById("selected-date");

let tasks = [];
let holidays = [];
let currentFilter = "all";
let selectedDate = null;
let calendarDate = new Date();
let holidaysYear = null;
let editingIndex = null;
let searchText = "";

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];