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
    </body>
    `);
});

app.get('/dashboard', (req, res) => {
  console.log("dashboard endpoint", req.method);
  res.send("Hello Word")
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

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});