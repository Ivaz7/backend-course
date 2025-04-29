"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updatedTodo = exports.insertTodo = exports.getTodos = exports.getUser = exports.insertUser = void 0;
const node_sqlite_1 = require("node:sqlite");
const db = new node_sqlite_1.DatabaseSync(':memory:');
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
exports.insertUser = db.prepare(`
  INSERT INTO users(username, password)
  VALUES(?, ?);
`);
exports.getUser = db.prepare(`
  SELECT * FROM users WHERE username = ?  
`);
// todos queries
exports.getTodos = db.prepare(`
  SELECT * FROM todos WHERE user_id = ? 
`);
exports.insertTodo = db.prepare(`
  INSERT INTO todos(user_id, task)
  VALUES(?, ?);
`);
exports.updatedTodo = db.prepare(`
  UPDATE todos SET completed = ? WHERE id = ?;  
`);
exports.deleteTodo = db.prepare(`
  DELETE from todos WHERE id = ? AND user_id = ?;
`);
exports.default = db;
