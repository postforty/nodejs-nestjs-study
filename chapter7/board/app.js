const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); // __dirname는 node를 실행하는 디렉토리 경로

app.get("/", (req, res) => {
  // home은 템플릿 파일 이름
  res.render("home", {
    title: "hi!",
    message: "express, mongodb, handlebars!",
  });
});

app.listen(3000);
