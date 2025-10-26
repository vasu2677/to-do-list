const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  li.appendChild(span);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.onclick = (e) => {
    if (e.target.tagName === 'SPAN') {
      li.classList.toggle('completed');
      saveTasks();
    }
  };

  li.appendChild(deleteBtn);
  if (completed) li.classList.add('completed');

  taskList.appendChild(li);
}

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;
  renderTask(text);
  saveTasks();
  taskInput.value = '';
};

window.onload = loadTasks;
