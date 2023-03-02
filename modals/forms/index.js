const mongoose = require("mongoose");
const { formSchema } = require("../../config/mongoSchema");
const { connect, close } = require("../../config/mongoDB");
const { getAlreadyExits } = require("../../libraries/utils");
const { __db, STRINGS } = require("../../config/constants");
const { isEmpty } = require("lodash");
const DbSchema = require('./schema.js')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

class Forms {
  static add(payload) {
    return this(payload).save();
  }
  static isExist(query) {
    return this.findOne(query).lean()
  }
  static findOneByCondition(condition, select) {
    return this.findOne(condition, select).lean()
  }
  static findByCondition(condition, select) {
    return this.find(condition).lean()
  }
  static fetch(query, options) {
    return new Promise((resolve, reject) => {
      this.paginate(query, options, (err, items) => {
        if (err) {
          reject(err.message);
        }
        resolve(items);
      });
    });
    // return this.find();
  }
  static fetchExtend(query, options) {
    return new Promise((resolve, reject) => {
      this.aggregatePaginate(query, options, (err, items) => {
        if (err) {
          reject(err.message);
        }
        resolve(items);
      });
    });
    // return this.find();
  }
  static updateOneByCondition(condition, payload) {
    let updateData = {
      $set: payload
    };
    return this.findOneAndUpdate(condition, updateData, { new: true }).lean()
  }
  static updateById(userId, payload) {
    console.log('userId', userId);
    console.log('payload', payload);
    let updateData = {
      $set: payload
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  }
}

DbSchema.loadClass(Forms);
DbSchema.plugin(mongoosePaginate)
DbSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('forms', DbSchema, 'forms');

// const fetch = (params) => {
//   return new Promise((resolve, reject) => {
//     //validatio  workk
//     var data = { ...params };

//     // Code...Code

//     // check mongoose.connections
//     let status = connect(__db.COOLD);
//     if (status.code == 500) {
//       return reject({ code: 500, message: "connection error" });
//     }

//     Form.find(data, (err, response) => {
//       if (err) {
//         let data = { ...err };
//         return reject({
//           code: 403,
//           message: err.errors ? err.message : data,
//         });
//       }
//       return resolve({ data: response });
//     });
//   });
// };

// const insert = (params) => {
//   return new Promise((resolve, reject) => {
//     //validatio  workk
//     var data = { ...params };

//     // Code...Code

//     // check mongoose.connections
//     let status = connect(__db.COOLD);
//     if (status.code == 500) {
//       return reject({ code: 500, message: "connection error" });
//     }

//     Form.create(data, (err, response) => {
//       if (err) {
//         let data = {};
//         if (err.code === 11000) {
//           data = getAlreadyExits(err.keyValue);
//         } else {
//           data = err;
//         }
//         return reject({
//           code: 403,
//           message: err.errors ? err.message : data,
//         });
//       }
//       return resolve({ data: response });
//     });
//   });
// };

// const update = (where, params) => {
//   return new Promise(async (resolve, reject) => {
//     let newdata = params;

//     let status = connect(__db.COOLD);
//     if (status.code == 500) {
//       return reject({ code: 500, body: "connection error" });
//     }

//     const result = await Form.findOneAndUpdate(where, newdata);
//     console.log("reponse", result);

//     return resolve({ code: 200, body: "ok" });
//   });
// };

// module.exports = {
//   insert: insert,
//   fetch: fetch,
//   update: update,
// };
