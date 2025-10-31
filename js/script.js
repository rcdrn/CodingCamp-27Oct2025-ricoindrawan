let todos = [];

function validateForm(task, date) {
  return task.trim() !== '' && date !== '';
}

function addTodo() {
  const taskInput = document.getElementById('todo-input');
  const dateInput = document.getElementById('todo-date');
  const task = taskInput.value;
  const date = dateInput.value;

  if (!validateForm(task, date)) {
    alert('Please fill in both fields.');
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function renderTodos() {
  const tbody = document.getElementById('todo-body');
  tbody.innerHTML = '';

  if (todos.length === 0) {
    tbody.innerHTML = `<tr class="no-task"><td colspan="4">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.done ? 'Completed' : 'Pending'}</td>
        <td>
          <button class="status-btn" onclick="toggleStatus(${index})"   
            ${todo.done ? 'Undo' : 'Done'}
          </button>
          <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById('add-btn').addEventListener('click', addTodo);
document.getElementById('clear-all-btn').addEventListener('click', deleteAll);
