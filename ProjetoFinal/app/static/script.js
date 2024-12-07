async function fetchTasks() {
    const response = await fetch("http://localhost:5000/render");
    const tasks = await response.json();

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');

        const taskCheck = document.createElement('input');
        taskCheck.type = 'checkbox';
        taskCheck.dataset.id = task.tarefa_id
        taskCheck.checked = task.tarefa_status || false;
        taskCheck.onclick = () => toggleCompletion(taskCheck.dataset.id);

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
            
        taskText.textContent = task.tarefa_titulo + (task.tarefa_data ? ` (Prazo: ${task.tarefa_data})` : '');
            
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = task.tarefa_descricao ? `Descrição: ${task.tarefa_descricao}` : '';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Excluir';
        deleteButton.dataset.id = task.tarefa_id
        deleteButton.onclick = () => deleteTask(deleteButton.dataset.id);

        taskItem.appendChild(taskCheck);
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskDescription);

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate');
    const taskDescription = document.getElementById('taskDescription');
    
    if (taskInput.value.trim() === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    if (dueDate.value.trim() === '') {
        alert('Por favor, insira uma data.');
        return;
    }

    const newTask = {
        titulo: taskInput.value.trim(),
        data: dueDate.value || null,
        descricao: taskDescription.value.trim() || '',
        status: false
    };

    const response = await fetch("http://localhost:5000/add_tarefa",
        {method: 'POST',
         headers:{'Content-Type': 'application/json',},
         body: JSON.stringify(newTask)}
        );

    if (response.ok) {
        fetchTasks();
    }
}

async function deleteTask(index) {
    const response = await fetch(`http://localhost:5000/deletar_tarefa/${index}`, {method: 'POST',
        headers:{'Content-Type': 'application/json',},
    });

    if (response.ok) {
        fetchTasks();
    }
}

async function toggleCompletion(index) {
    const response = await fetch(`http://localhost:5000/concluir_tarefa/${index}`, {method: 'POST',
        headers:{'Content-Type': 'application/json',},
    });

    if (response.ok) {
        fetchTasks();
    }
}

fetchTasks();