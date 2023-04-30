'use strict'

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

form.addEventListener('submit', addTask); //Добавление задачи
tasksList.addEventListener('click', deleteTask); // Удаление задачи 
tasksList.addEventListener('click', doneTask); // Отмечать выполненные задачи


function addTask(event) {
    event.preventDefault(); // отмена обновления страницы и отправку формы

    const taskText = taskInput.value; // достаем текст задачи из поля ввода

    const newTask = {   // Задача в виде объекта
        id: Date.now(), // айди в милисекундах
        text: taskText,
        done: false
    };

    tasks.push(newTask); // Добавляем задачу в массив с задачами
    console.log(tasks);

    // формируем css class 
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

    // добавляем разметку новой задачи
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML); // Добавляем разметку на страницу

    taskInput.value = ''; //Очищаем поле ввода и возращаем фокус на инпут
    taskInput.focus();

    if (tasksList.children.length > 1) {     //Проверка. Если в списке задач более 1-го элемента, скрываем блок
        emptyList.classList.add('none');
    }
}

function deleteTask(event) {
    // проверяем если был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;
    // проверяем клик по кнопке "удалить задачу"
    const padrentNode = event.target.closest('.list-group-item');
    padrentNode.remove();
    //Проверка. Если в списке задач 1 элемент, показываем блок
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}

function doneTask(event) {
    // Проверяем клик не по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return;
    // Проверяем клик по кнопке "задача выполнена"
    const padrentNode = event.target.closest('.list-group-item');
    const taskTitle = padrentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}