import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export async function getAll() {
  return await axios.get('/todos');
}

export async function getOne(todoId) {
  return await axios.get(`/todos/${todoId}`);
}

export async function add(title) {
  return await axios.post('todos', { title });
}

export async function remove(todoId) {
  return await axios.delete(`/todos/${todoId}`);
}

export async function update({ id, title, complited }) {
  return await axios.put(`/todos/${id}`, { title, complited });
}

export async function updateAll(todos) {
  return await axios.get('/todos?action=update', {
    items: todos,
  });
}

export async function removeAll(ids) {
  return await axios.get('/todos?action=delete', { ids });
}

axios.post(url, data);
