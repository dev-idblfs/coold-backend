const mongoose = require("mongoose");
const { dbString } = require('../config/config')

const uri = dbString;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 50, // Maintain up to 10 socket connections
  auto_reconnect: true,

};

const connect = (dbName) => {
  return new Promise((resolve, reject) => {
    let url = uri + dbName || '';
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

const connection = async (dbName = 'onxcy') => {
  let url = uri + dbName + '?retryWrites=true&w=majority' || '';
  console.log(url)
  try {
    await mongoose.connect(url, option);
  } catch (err) {
    console.log(`Database not connected!= ${err} `);
  }
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
  connection
};
