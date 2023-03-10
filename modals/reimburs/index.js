const mongoose = require("mongoose");
const { userSchema } = require("../../config/mongoSchema");
const { connect, close } = require("../../config/mongoDB");
const { getAlreadyExits } = require("../../libraries/utils");
const { __db, STRINGS } = require("../../config/constants");
const { isEmpty } = require("lodash");

const Brand = mongoose.model("Brand", userSchema);

const fetch = (params) => {
  return new Promise((resolve, reject) => {
    //validatio  workk
    var data = { ...params };

    // Code...Code

    // check mongoose.connections
    let status = connect(__db.COOLD);
    if (status.code == 500) {
      return reject({ code: 500, message: "connection error" });
    }

    Brand.find(data, (err, response) => {
      if (err) {
        let data = { ...err };
        return reject({
          code: 403,
          message: err.errors ? err.message : data,
        });
      }
      return resolve({ data: response });
    });
  });
};

const insert = (params) => {
  return new Promise((resolve, reject) => {
    //validatio  workk
    var data = { ...params };

    // Code...Code

    // check mongoose.connections
    let status = connect(__db.COOLD);
    if (status.code == 500) {
      return reject({ code: 500, message: "connection error" });
    }

    Brand.create(data, (err, response) => {
      if (err) {
        let data = {};
        if (err.code === 11000) {
          data = getAlreadyExits(err.keyValue);
        } else {
          data = err;
        }
        return reject({
          code: 403,
          message: err.errors ? err.message : data,
        });
      }
      return resolve({ data: response });
    });
  });
};

const update = (where, params) => {
  return new Promise(async (resolve, reject) => {
    let newdata = params;

    let status = connect(__db.COOLD);
    if (status.code == 500) {
      return reject({ code: 500, body: "connection error" });
    }

    const result = await Brand.findOneAndUpdate(where, newdata);
    console.log("reponse", result);

    return resolve({ code: 200, body: "ok" });
  });
};

module.exports = {
  insert: insert,
  fetch: fetch,
  update: update,
};
