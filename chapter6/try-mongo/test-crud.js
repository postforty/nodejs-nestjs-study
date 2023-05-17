const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://postforty:jhm687912JHM@cluster0.k7h9fij.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true }); // useNewUrlParser는 몽고디비 아틀라스를 연결하기 위한 옵션

async function main() {
  try {
    await client.connect();

    console.log("MongoDB 접속 성공");

    const collection = client.db("test").collection("person"); // test 디비와 person 컬렉션 사용. 디비가 없으면 생성함.

    await collection.insertOne({ name: "Andy", age: 30 });
    console.log("문서 추가 완료");

    const documents = await collection.find({ name: "Andy" }).toArray(); // 결과 값이 여러개일 경우 toArray를 통해 배열로 반환
    console.log("찾은 문서:", documents);

    await collection.updateOne({ name: "Andy" }, { $set: { age: 31 } });
    console.log("문서 업데이트");

    const updatedDocuments = await collection.find({ name: "Andy" }).toArray();
    console.log("갱신된 문서:", updatedDocuments);

    // await collection.deleteOne({ name: "Andy" });
    // console.log("문서 삭제");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}
main();
