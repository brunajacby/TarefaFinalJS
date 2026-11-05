//Tarefas
function saveTasks() {
    localStorage.setItem("tasks-" + localStorage.getItem("user"), JSON.stringify(tasks));
}

function showMessage(text, isSuccess) {
    taskMessage.innerText = text;

    if (isSuccess) {
        taskMessage.classList.add("success");
    } else {
        taskMessage.classList.remove("success");
    }

    setTimeout(() => {
        taskMessage.innerText = "";
    }, 2500);
}

// Verificações adicionar e editar
// Devolve a mensagem de erro, ou "" se estiver tudo bem
function validateTask(text, date, index) {
    if (text.length < 3) {
        return "A tarefa tem de ter pelo menos 3 letras.";
    }

    if (text.length > 60) {
        return "A tarefa pode ter no máximo 60 letras.";
    }

    if (tasks.some((task, i) => i !== index && task.text.toLowerCase() === text.toLowerCase() && task.date === date)) {
        return "Já tens essa tarefa nesse dia.";
    }

    return "";
}

function addTask(e) {
    e.preventDefault();

    const dataFromForm = new FormData(this);
    let text = dataFromForm.get("task").trim();
    let date = dataFromForm.get("taskDate");

    // Tira o vermelho dos campos antes de voltar a verificar
    this.task.classList.remove("input-error");
    this.taskDate.classList.remove("input-error");

    let error = validateTask(text, date, null);

    if (error !== "") {
        this.task.classList.add("input-error");
        showMessage(error, false);
        return;
    }

    if (date === "") {
        this.taskDate.classList.add("input-error");
        showMessage("Escolhe uma data para a tarefa.", false);
        return;
    }

    if (date < getToday()) {
        this.taskDate.classList.add("input-error");
        showMessage("Não podes escolher um dia que já passou.", false);
        return;
    }

    tasks.push({ text: text, date: date, doing: false, done: false });

    this.reset();

    if (selectedDate) {
        taskDateInput.value = selectedDate;
    } else {
        taskDateInput.value = getToday();
    }

    saveTasks();
    showMessage("Tarefa adicionada!", true);
    renderTasks();
}

// Muda uma tarefa e volta a guardar e desenhar
function updateTask(message) {
    saveTasks();

    if (message) {
        showMessage(message, true);
    }

    renderTasks();
}

// Abre a edição na própria lista
function editTask(index) {
    editingIndex = index;
    renderTasks();
}

function cancelEdit() {
    editingIndex = null;
    renderTasks();
}

function saveEdit(index, newText) {
    let error = validateTask(newText.trim(), tasks[index].date, index);

    if (error !== "") {
        showMessage(error, false);
        return;
    }

    tasks[index].text = newText.trim();
    editingIndex = null;
    updateTask("Tarefa editada!");
}

function removeTask(index) {
    if (!confirm("Tens a certeza que queres remover esta tarefa?")) {
        return;
    }

    tasks = tasks.filter((task, i) => i !== index);
    editingIndex = null;
    updateTask("Tarefa removida!");
}

function createButton(text, action) {
    let button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", action);
    return button;
}

function createTaskItem(task, index) {
    let li = document.createElement("li");

    // Tarefa em edição: campo de texto com Guardar e Cancelar
    if (index === editingIndex) {
        let input = document.createElement("input");
        input.type = "text";
        input.value = task.text;

        // Enter também guarda
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveEdit(index, input.value);
            }
        });

        let saveBtn = createButton("Guardar", () => saveEdit(index, input.value));
        saveBtn.classList.add("btn-done");

        li.appendChild(input);
        li.appendChild(saveBtn);
        li.appendChild(createButton("Cancelar", cancelEdit));

        return li;
    }

    if (task.done) {
        li.classList.add("done");
    } else if (task.doing) {
        li.classList.add("doing");
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
        tasks[index].done = checkbox.checked;
        tasks[index].doing = false;

        if (checkbox.checked) {
            updateTask("Tarefa concluída!");
        } else {
            updateTask();
        }
    });

    let span = document.createElement("span");
    span.innerText = task.text;

    let date = document.createElement("small");
    date.innerText = showDate(task.date);

    // Tarefa atrasada: não concluída e com data que já passou
    if (!task.done && task.date < getToday()) {
        li.classList.add("late");
        date.innerText = showDate(task.date) + " · Atrasada";
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(date);
    li.appendChild(createButton("Editar", () => editTask(index)));

    //botão para começar (para concluir usa a checkbox)
    if (!task.done && !task.doing) {
        li.appendChild(createButton("Começar", () => {
            tasks[index].doing = true;
            updateTask();
        }));
    }

    let removeBtn = createButton("Remover", () => removeTask(index));
    removeBtn.classList.add("btn-remove");
    li.appendChild(removeBtn);

    return li;
}

function matchesFilter(task) {
    if (selectedDate && task.date !== selectedDate) {
        return false;
    }

    if (searchText && !task.text.toLowerCase().includes(searchText)) {
        return false;
    }

    if (currentFilter === "active") {
        return !task.done;
    } else if (currentFilter === "doing") {
        return !task.done && task.doing;
    } else if (currentFilter === "done") {
        return task.done;
    } else {
        return true;
    }
}

function renderTasks() {
    taskList.innerText = "";

    tasks.forEach((task, index) => {
        if (matchesFilter(task)) {
            taskList.appendChild(createTaskItem(task, index));
        }
    });

    if (taskList.children.length === 0) {
        let empty = document.createElement("li");
        empty.innerText = "Sem tarefas aqui ✨";
        empty.classList.add("empty");
        taskList.appendChild(empty);
    }

    updateCounters();
    renderToday();
    renderCalendar();
}

function updateCounters() {
    let done = tasks.filter((t) => t.done).length;
    let percent = 0;

    if (tasks.length > 0) {
        percent = Math.round((done / tasks.length) * 100);
    }

    document.getElementById("done-count").innerText = done;
    document.getElementById("active-count").innerText = tasks.length - done;
    document.getElementById("doing-count").innerText = tasks.filter((t) => !t.done && t.doing).length;
    document.getElementById("total-count").innerText = tasks.length;
    document.getElementById("progress-text").innerText = percent + "% concluído";
    document.getElementById("progress-bar").style.width = percent + "%";

    if (percent === 100) {
        celebration.classList.remove("hidden");
    } else {
        celebration.classList.add("hidden");
    }
}

// Cartão no Dashboard
function renderToday() {
    let todayTasks = tasks.filter((task) => task.date === getToday());
    let lateTasks = tasks.filter((task) => !task.done && task.date < getToday());

    todayList.innerText = "";

    if (todayTasks.length === 0) {
        todayMessage.innerText = "Dia livre! 🌿 Não tens tarefas para hoje.";
    } else {
        let doneToday = todayTasks.filter((task) => task.done).length;
        let doingToday = todayTasks.filter((task) => !task.done && task.doing).length;

        todayMessage.innerText = "Tens " + todayTasks.length + " tarefa(s) para hoje: " +
            doneToday + " concluída(s) e " + doingToday + " em andamento.";

        todayTasks.forEach((task) => {
            let li = document.createElement("li");
            li.innerText = task.text;

            if (task.done) {
                li.classList.add("done");
            }

            todayList.appendChild(li);
        });
    }

    if (lateTasks.length > 0) {
        let li = document.createElement("li");
        li.innerText = "⚠️ Tens " + lateTasks.length + " tarefa(s) atrasada(s).";
        li.classList.add("late");
        todayList.appendChild(li);
    }
}

// Pesquisa pelo formulário
function searchTasks(e) {
    e.preventDefault();

    searchText = new FormData(this).get("search").trim().toLowerCase();
    renderTasks();
}

function setFilter() {
    currentFilter = this.getAttribute("data-filter");
    listTitle.innerText = this.getAttribute("data-title");

    filterBtns.forEach((button) => button.classList.remove("active"));
    this.classList.add("active");

    renderTasks();
}