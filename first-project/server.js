const express = require('express');
const app = express();
const PORT = 8383;

app.get('/', (req, res) => {
  console.log("I hit a endpoint", req.method);
  res.send('<h1>Hello H1 Element</h1>');
});

app.get('/dashboard', (req, res) => {
  console.log("dashboard endpoint", req.method);
  res.send("Hello Word")
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`)
});