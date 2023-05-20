async function writePost(collection, post) {
  post.hits = 0;
  post.createdDt = new Date().toISOString(); // 날짜는 ISO 포맷으로 저장
  return await collection.insertOne(post); // 몽고디비에 post를 저장 후 결과 반환
}

module.exports = {
  writePost,
};
