document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let inputElement = document.getElementById("taskInput");
    let inputValue = inputElement.value;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: inputValue })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task added successfully:', data);
        loadTasks(); // Reload tasks after adding a new one
        inputElement.value = ""; // Clear input field after submission
    })
    .catch(error => {
        console.error('Error adding task:', error);
    });
});

function loadTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(data => {
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = '';

        data.tasks.forEach(task => {
            let listItem = document.createElement("li");
            listItem.textContent = task.text;
            taskList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error loading tasks:', error);
    });
}

// Load tasks when the page loads
window.onload = loadTasks;
