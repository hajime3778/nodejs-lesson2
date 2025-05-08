const express = require("express");
const cors = require("cors");

const app = express();

const server = app.listen(3000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
})

app.disable("x-powered-by");
app.use(cors()).use(express.json());

app.get("/", (req, res) => {
  res.json({
    id: "1",
    name: "hogehoge",
    description: "hello world",
  });
});
