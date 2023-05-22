const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

async function writePost(collection, post) {
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // 날짜는 ISO 포맷으로 저장
  return await collection.insertOne(post); // 몽고디비에 post를 저장 후 결과 반환
}

async function list(collection, page, search) {
  const perPage = 10;
  const query = { title: new RegExp(search, "i") };
  const cursor = collection
    .find(query, { limit: perPage, skip: (page - 1) * perPage })
    .sort({ createdDt: -1 });
  const totalCount = await collection.count(query);
  const posts = await cursor.toArray();
  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

// 패스워드는 노출 할 필요가 없으므로 결괏값으로 가져오지 않음
const projectionOption = {
  projection: {
    // 프로젝션(투영) 결괏값에서 일부만 가져올 때 사용
    password: 0, // 패스워드 만 빼고 가져옴, 패스워드 만 가져오고 싶을때는 password: 1
    "comments.password": 0,
  },
};

async function getDetailPost(collection, id) {
  return await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $inc: { hits: 1 } }, // 게시글을 읽을 때마다 hits 1 증가, $inc는 increase
    projectionOption
  );
}

module.exports = {
  list,
  writePost,
  getDetailPost,
};
