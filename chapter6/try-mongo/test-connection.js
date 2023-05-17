const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://postforty:jhm687912JHM@cluster0.k7h9fij.mongodb.net/?retryWrites=true&w=majority";

// 데이터베이스 정보를 출력하도록 소스 코드 변경
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const adminDB = client.db("test").admin();
  const listDatabases = await adminDB.listDatabases(); // admin, local은 기본적으로 생성되어 있는 데이터베이스
  console.log(listDatabases);
  return "OK";
}
run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
