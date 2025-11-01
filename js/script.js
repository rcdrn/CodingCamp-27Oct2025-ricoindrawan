let todos = [];
let currentFilter = 'all'; // all | done | pending

// Validasi input
function validateForm(task, date) {
  return task.trim() !== '' && date !== '';
}

// Tambah todo
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

  saveTodos();
  renderTodos();
}

// Hapus satu todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Ubah status selesai/belum
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

// Hapus semua todo
// Hapus semua todo
function deleteAll() {
  if (todos.length === 0) {
    alert('No task found!');
    return;
  }

  if (confirm('Are you sure you want to delete all tasks?')) {
    todos = [];
    saveTodos();
    renderTodos();
  }
}


// Simpan ke localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Ambil dari localStorage
function loadTodos() {
  const stored = localStorage.getItem('todos');
  if (stored) {
    todos = JSON.parse(stored);
  }
}

// 🔹 Ganti filter setiap kali tombol diklik
function toggleFilter() {
  if (currentFilter === 'all') currentFilter = 'done';
  else if (currentFilter === 'done') currentFilter = 'pending';
  else currentFilter = 'all';
  updateFilterButtonText();
  renderTodos();
}

// 🔹 Ubah teks tombol filter sesuai mode
function updateFilterButtonText() {
  const btn = document.getElementById('filter-todos-btn');
  if (currentFilter === 'all') btn.textContent = 'SHOW: ALL';
  else if (currentFilter === 'done') btn.textContent = 'SHOW: DONE';
  else btn.textContent = 'SHOW: PENDING';
}

// Render todo list
function renderTodos() {
  const tbody = document.getElementById('todo-body');
  tbody.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'done') return todo.done;
    if (currentFilter === 'pending') return !todo.done;
    return true;
  });

  if (filteredTodos.length === 0) {
    tbody.innerHTML = `<tr class="no-task"><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.done ? '✅ Done' : '🕓 Pending'}</td>
        <td>
          <button class="status-btn bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded-md"
            onclick="toggleStatus(${todos.indexOf(todo)})">
            ${todo.done ? 'Undo' : 'Done'}
          </button>
          <button class="delete-btn bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded-md"
            onclick="deleteTodo(${todos.indexOf(todo)})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Jalankan saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  renderTodos();
  updateFilterButtonText();

  document.getElementById('add-btn').addEventListener('click', addTodo);
  document.getElementById('clear-all-btn').addEventListener('click', deleteAll);
  document.getElementById('filter-todos-btn').addEventListener('click', toggleFilter);
});
