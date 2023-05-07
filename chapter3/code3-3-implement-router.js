const http = require("http");
const url = require("url");
http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path === "/user") {
      user(req, res);
    } else if (path === "/feed") {
      feed(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen("3000", () => console.log("라우터를 만들어 보자!"));

// createServer() 리펙터링
// 라우팅 이후의 처리를 별도의 함수를 만들어서 처리
const user = (req, res) => {
  res.end("[user] name : andy, age: 30");
};

const feed = (req, res) => {
  res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};
