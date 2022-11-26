import { v4 as uuidv4 } from 'uuid';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'test1234'
});

await client.connect();

export async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM todos
    ORDER BY created_at
  `);

  return result.rows;
}

export async function getById(todoId) {
  const result = await client.query(`
    SELECT *
    FROM todos
    WHERE id='${todoId}'
  `);

  return result.rows[0] || null;
}

export async function create(title) {
  const id = uuidv4();

  await client.query(`
    INSERT INTO todos (id, title)
    VALUES ('${id}', '${title}')
  `);

  const newTodo = await getById(id);

  return newTodo;
}

export async function remove(todoId) {
  await client.query(`
    DELETE FROM todos
    WHERE id='${todoId}'
    VALUES ('${id}', '${title}')
  `);
}

export async function update({ id, title, complited }) {
  await client.query(`
    UPDATE todos (id, title)
    SET title='${title}', completed=${completed}
    WHERE id='${todoId}'
  `);

  const newTodo = await getById(id);

  return newTodo;
}

export function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error();
  }

  todos = todos.filter(todo => ids.includes(todo.id));
}

export function updateMany(todos) {
  for (const { id, title, complited } of todos) {
    const foundTodo = getById(id);

    if (!foundTodo) {
      continue;
    }

    update({ id, title, complited });
  }
}
