const express = require('express');
const app = express();
const PORT = 8383;

let data = [
  {
    name: 'John',
    age: 23,
  },
]

app.get('/', (req, res) => {
  console.log("I hit a endpoint", req.method);
  res.send('<h1>Hello H1 Element</h1>');
});

app.get('/dashboard', (req, res) => {
  console.log("dashboard endpoint", req.method);
  res.send("Hello Word")
});

// api endpoint

app.get('/api/data', (req, res) => {
  console.log('This data', req.method);
  res.send(data)
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});