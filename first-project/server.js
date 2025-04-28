const express = require('express');
const app = express();
const PORT = 8383;

let data = [
  {
    name: 'John',
    age: 23,
  },
]

// middleware
app.use(express.json())

app.get('/', (req, res) => {
  console.log("home", req.method);
  res.send(`
    <body>
      <h1>
        DATA:
      </h1>
      <p> 
        ${JSON.stringify(data)}
      </p>  
      <a href="/dashboard">
        Home
      </a>
    </body>
    <script>console.log("Hello Script")</script>
    `);
});

app.get('/dashboard', (req, res) => {
  console.log("dashboard endpoint", req.method);
  res.send(`
    <body>
      <h1>
        dashboard
      </h1>
      <a href="/">
        Home
      </a>
    </body>
    `);
});

// api endpoint

app.get('/api/data', (req, res) => {
  console.log('This data api endpoint', req.method);
  res.send(data)
});

app.post('/api/data', (req, res) => {
  // create data user sign up
  const newData = req.body;
  console.log(newData)
  data.push(newData)
  res.sendStatus(201);
});

// delete data
app.delete('/api/data', (req, res) => {
  data.pop()
  console.log("We Success Delete")
  res.sendStatus(203)
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});