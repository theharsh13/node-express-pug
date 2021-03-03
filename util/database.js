const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoClient
    .connect("mongodb://localhost:27017", { useUnifiedTopology: true })
    .then((client) => {
      console.log("========== MongoDB Connected! =========");
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Found!";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
