const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/";

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const connect = (dbName) => {
  return new Promise((resolve, reject) => {
    let url = uri + dbName;
    mongoose
      .connect(url, option)
      .then((_value) => {
        resolve({ code: 200, messgage: "Connection stablished" });
      })
      .catch((err) => {
        console.log("error", err);
        reject({ code: 500, body: "Connection not stablished" });
      });
  });
};

const close = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .close()
      .then((_value) => {
        resolve({ code: 200, messgage: "Connection closed" });
      })
      .catch((err) => {
        console.log("error", err);
        reject({ code: 500, body: "Connection not closed" });
      });
  });
};

module.exports = {
  connect: connect,
  close: close,
};
