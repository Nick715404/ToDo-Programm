'use strict'

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи 
tasksList.addEventListener('click', deleteTask)

function addTask(event) {
    // отмена обновления страницы и отправку формы
    event.preventDefault();

    // достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    // добавляем разметку новой задачи
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`;

    // Добавляем разметку на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    //Очищаем поле ввода и возращаем фокус на инпут
    taskInput.value = '';
    taskInput.focus();

    //Проверка. Если в списке задач более 1-го элемента, скрываем блок
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
}

function deleteTask(event) {
    // проверяем клик по кнопке "удалить задачу"
    if (event.target.dataset.action === 'delete') {
        const padrentNode = event.target.closest('.list-group-item');
        padrentNode.remove();
    }

    //Проверка. Если в списке задач 1 элемент, показываем блок
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}