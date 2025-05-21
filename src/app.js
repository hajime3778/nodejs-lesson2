const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

// port3000でサーバーを立ち上げ
const app = express();
const server = app.listen(3000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
})

// cors設定
app.disable("x-powered-by");
app.use(cors()).use(express.json());

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "sample",
});

connection.connect(function (err) {
  if (err) {
    console.log(`failed mysql connect: ${err}`);
    throw err;
  }
  console.log("connected mysql");
});

app.get("/api/todos", (req, res) => {
  const sql = `
    SELECT
      id,
      title,
      description
    FROM 
      todos
  `
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json();
      return;
    }
    res.status(200).json(results);
  });
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT
      id,
      title,
      description
    FROM
      todos
    WHERE
      id = ${id};
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json();
      return;
    }
    if (results.length === 0) {
      res.status(404).json();
      return;
    }
    res.status(200).json(results[0]);
  });
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  const sql = `
    INSERT INTO todos (title, description) 
    VALUES ("${todo.title}", "${todo.description}")
  `
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json();
      return;
    }
    res.status(201).json(results.insertId);
  })
});
