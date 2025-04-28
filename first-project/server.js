const express = require('express');
const app = express();
const PORT = 8383;

app.get('/', (req, res) => {
  console.log("I hit a endpoint", req.method);
  res.sendStatus(201);
});

app.get('/dashboard', (req, res) => {
  console.log("dashboard endpoint", req.method);
  res.send("Hello Word")
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`)
});