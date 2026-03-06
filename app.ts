import express from "express";

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8085, () => {
  console.log("Server is running");
});
