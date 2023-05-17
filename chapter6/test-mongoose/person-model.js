var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Person 객체를 스키마로 만드는 예제
const personSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

module.exports = mongoose.model("Person", personSchema);
