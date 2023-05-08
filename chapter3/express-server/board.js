const express = require("express");
const app = express();
let posts = []; // 게시글 리스트

app.use(express.json()); // req.body 사용위한 미들웨어

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json(posts); // 게시글 리스트를 JSON형식으로 보여줌
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  // 게시글 리스트에 새로운 게시글 정보 추가
  posts.push({ id: posts.length + 1, title, name, text, createDt: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id); // +id는 문자열 id를 숫자로
  const isLengthChanged = posts.length !== filteredPosts.length; // 삭제 확인, posts의 데이터 개수가 변경되었으면 삭제 성공
  posts = filteredPosts;
  if (isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

app.listen(3000, () => {
  console.log("welcome posts START!");
});
