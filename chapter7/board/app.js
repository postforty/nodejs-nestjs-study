const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const { ObjectId } = require("mongodb");

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postService = require("./services/post-service");

// 몽고디비 연결 함수
const mongodbConnection = require("./configs/mongodb-connection");

app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); // __dirname는 node를 실행하는 디렉토리 경로

app.get("/", async (req, res) => {
  // home은 템플릿 파일 이름
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const [posts, paginator] = await postService.list(collection, page, search);
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.log(error);
    res.render("home", {
      title: "테스트 게시판",
    });
  }
});

app.get("/detail/:id", async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);
  res.render("detail", {
    title: "테스트 게시판",
    post: result.value,
  });
});
// 글쓰기
app.post("/write", async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
});
// 댓글 추가
app.post("/write-comment", async (req, res) => {
  const { id, name, password, comment } = req.body;
  const post = await postService.getPostById(collection, id);

  if (post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt: new Date().toISOString(),
      },
    ];
  }
  postService.updatePost(collection, id, post);
  return res.redirect(`/detail/${id}`);
});
// 쓰기 페이지 이동
app.get("/write", (req, res) => {
  res.render("write", {
    title: "테스트 게시판",
    mode: "create",
  });
});
// 수정 페이지로 이동
app.get("/modify/:id", async (req, res) => {
  const { id } = req.params.id;
  const post = await postService.getPostById(collection, req.params.id);
  console.log(post);
  res.render("write", { title: "테스트 게시판 ", mode: "modify", post });
});
// 게시글 수정 API
app.post("/modify", async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString(),
  };
  const result = postService.updatePost(collection, id, post);
  res.redirect(`/detail/${id}`);
});
// 게시글 삭제
app.delete("/delete", async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await collection.deleteOne({
      _id: ObjectId(id),
      password: password,
    });
    if (result.deletedCount !== 1) {
      console.log("삭제 실패");
      return res.json({ isSuccess: false });
    }
    return res.json({ isSuccess: true });
  } catch (error) {
    console.log(error);
    return res.json({ isSuccess: false });
  }
});
// 패스워드 체크
app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;

  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  if (!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

let collection;
app.listen(3000, async () => {
  console.log("Server started");
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection("post");
  console.log("MongoDB connected");
});
