'use strict'

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // отмена обновления страницы
});