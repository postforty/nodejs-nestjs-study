const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://postforty:jhm687912JHM@cluster0.k7h9fij.mongodb.net/?retryWrites=true&w=majority/test";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
