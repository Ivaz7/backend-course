import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:');

// execute sqLite 
db.exec(`
  CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`
  CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );  
`);

// authentication queries 
export const insertUser = db.prepare(`
  INSERT INTO users(username, password)
  VALUES(?, ?);
`);

export const insertTodo = db.prepare(`
  INSERT INTO todos(user_id, task)
  VALUES(?, ?);
`);

export const getUser = db.prepare(`
  SELECT * FROM users WHERE username = ?  
`)

// todos queries
export const getTodos = db.prepare(`
   SELECT * FROM todos WHERE user_id = ? 
`)

export default db;
