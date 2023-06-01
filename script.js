// Selecting DOM elements
const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');
const taskList = document.querySelector('.task-list');

// Loading saved tasks on application startup
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a task
addButton.addEventListener('click', addTask);

function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        const taskItem = createTaskElement(taskName);
        taskList.appendChild(taskItem);
        taskInput.value = '';

        saveTask(taskName);
    }
}

// Create a task element
function createTaskElement(taskName) {
    const task = document.createElement('div');
    task.classList.add('task');

    const taskNameSpan = document.createElement('span');
    taskNameSpan.classList.add('task-name');
    taskNameSpan.textContent = taskName;

    const doneButton = document.createElement('button');
    doneButton.classList.add('done-button');
    doneButton.textContent = 'Done';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    task.appendChild(taskNameSpan);
    task.appendChild(doneButton);
    task.appendChild(deleteButton);

    doneButton.addEventListener('click', markTaskAsDone);
    deleteButton.addEventListener('click', deleteTask);

    return task;
}

// Mark a task as done
function markTaskAsDone(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('done');
    saveTaskState(taskItem);
}

// Delete a task
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    const taskName = taskItem.querySelector('.task-name').textContent;

    taskList.removeChild(taskItem);
    removeTaskFromStorage(taskName);
}

// Save a task to local storage
function saveTask(taskName) {
    let tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    const task = {
        name: taskName,
        done: false,
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Save task state (done or not done) to local storage
function saveTaskState(taskItem) {
    const taskName = taskItem.querySelector('.task-name').textContent;
    let tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.findIndex((task) => task.name === taskName);
        if (taskIndex !== -1) {
            tasks[taskIndex].done = taskItem.classList.contains('done');
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

// Remove a task from local storage
function removeTaskFromStorage(taskName) {
    let tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.findIndex((task) => task.name === taskName);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

// Load saved tasks from local storage
function loadTasks() {
    let tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        const taskItem = createTaskElement(task.name);
        if (task.done) {
            taskItem.classList.add('done');
        }
        taskList.appendChild(taskItem);
    });
}