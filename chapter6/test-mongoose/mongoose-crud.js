const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false); // 설정해야 경고가 안뜸(예제용 코드이므로 false 설정)

const app = express();
app.use(bodyParser.json()); // HTTP에서 Body 파싱 가능
app.listen(3000, async () => {
  console.log("Server started");
  const mongodbUri =
    "mongodb+srv://postforty:jhm687912JHM@cluster0.k7h9fij.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(mongodbUri, { useNewUrlParser: true }) // 서버 기능에는 문제 없으나 아틀라스 사용시 설정하는 것이 좋음
    .then(console.log("Connected to MongoDB"));
});

// 모든 데이터 출력
app.get("/person", async (req, res) => {
  const person = await Person.find({}); // {} 필터링 없이 모든 데이터를 가져옴
  res.send(person);
});

// email로 person 찾기
app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email }); // findOne 결과 값 하나
  res.send(person);
});

// person 데이터 추가
app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  // const person = await Person.create(req.body); // 위와 동일한 코드
  await person.save();
  res.send(person);
});

// person 데이터 수정
app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );
  console.log(person);
  res.send(person);
});

// person 데이터 삭제하기
app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
