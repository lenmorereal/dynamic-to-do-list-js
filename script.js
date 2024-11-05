document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create Clear All Tasks button
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Clear All Tasks';
    clearAllButton.id = 'clear-all-btn';
    clearAllButton.style.marginTop = '10px';
    document.getElementById('todo-app').appendChild(clearAllButton);

    // Load tasks from local storage on page load
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    // Save all tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.firstChild.textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the DOM
    function addTaskToDOM(taskText, completed = false) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        if (completed) listItem.classList.add('completed');

        // Toggle completion status on click
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveTasks(); // Save the updated state to local storage
        });

        // Create remove button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            saveTasks(); // Update local storage after removing
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // Add a new task and save it to local storage
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        addTaskToDOM(taskText); // Add the task to the DOM
        saveTasks(); // Save tasks to local storage
        taskInput.value = ''; // Clear the input field
    }

    // Clear all tasks from the list and local storage
    clearAllButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks'); // Remove all tasks from local storage
    });

    // Event listeners for adding tasks
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Load tasks on page load
    loadTasks();
});

