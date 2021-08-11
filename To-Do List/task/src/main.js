const NewTask = document.getElementById("input-task"); //Поле для добавления задачи
const BtnAdd = document.getElementById("add-task-button"); //Кнопка "Добавить"

const TaskBlock = document.getElementById('task-list'); //Блок с задачами

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Обновление localStorage
const updateLocal = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const IfCheckbox = function (i) {
    let BtnCheckbox = document.querySelectorAll("input[type=checkbox]");
    let TaskList = document.querySelectorAll(".task");

    BtnCheckbox[i].addEventListener('change', function () {
        tasks[i][1]= !tasks[i][1];
        TaskList[i].classList.toggle("check");
        updateLocal();
    });
    console.log(tasks);

    if(tasks[i][1]){
        BtnCheckbox[i].checked = true;
        TaskList[i].classList.add("check");
    }
};

const IfDelete = function (i) {
    let BtnDel = document.querySelectorAll(".delete-btn"); //Кнопки "Удалить"
    BtnDel[i].addEventListener("click", function () {
        BtnDel[i].parentElement.remove();
        tasks.splice(i, 1);
        updateLocal();
    });
}

//Отрисовка списка в HTML
const fillHtmlList = function () {
    TaskBlock.innerHTML = '';

    for(let i=0; i < tasks.length; i++) {
        let item = document.createElement('li'); //Новая задача

        item.innerHTML = '<input type="checkbox">\n' +
            '            <span class="task">' + tasks[i][0] + '</span>\n' +
            '            <button class="delete-btn"></button>\n';
        TaskBlock.appendChild(item);
        IfCheckbox(i);
        IfDelete(i);
    }
}
fillHtmlList();

//Обработчик добавления новой задачи
BtnAdd.addEventListener("click", function () {
    if (NewTask.value != "") {
        tasks.push([NewTask.value,0]);
        updateLocal();
        fillHtmlList();
        NewTask.value = "";
    }
})
