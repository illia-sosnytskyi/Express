import * as todoServices from '../services/todos.js';

export const getAll = (req, res) => {
  const todos = todoServices.getAll();

  res.send(todos);
};

export const getOne = (req, res) => {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  res.send(foundTodo)
}

export const add = (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(422);
    return;
  }

  const newTodo = todoServices.create(title);

  res.statusCode = 201;
  res.send(newTodo);
}

export const remove = (req, res) => {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  todoServices.remove(todoId);
  res.sendStatus(204);
}

export const update = (req, res) => {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  const { title, complited } = req.body;

  if (typeof title !== 'string' || typeof complited !== 'boolean') {
    res.sendStatus(422);
    return;
  }

  todoServices.update({ id: todoId, title, complited });
  res.send(foundTodo);
}

export const removeMany = (req, res, next) => {
  const { ids } = req.body; 

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  try {
    todoServices.removeMany(ids);
  } catch (error) {
    res.sendStatus(404);
    return;
  }

  todoServices.removeMany(ids);
  res.sendStatus(204);
}

export const updateMany = (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }

  const results = [];
  const errors = [];
  
  for (const { id, title, complited } of todos) {
    const foundTodo = getById(id);

    if (!foundTodo) {
      todoServices.update({ id, title, complited });
      results.push({ id, status: 'OK' });
    } else {
      errors.push({ id, status: 'NOT FOUND' });
    }

    update({ id, title, complited });
  }
  
  res.send({ results, errors });
}
