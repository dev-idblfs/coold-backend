const mongoose = require('mongoose');
const { subcribers_email } = require(ROOT_DIR + '/config/mongoSchema');
const { connect, close } = require(ROOT_DIR + '/config/mongoDB');
const { __db } = require(ROOT_DIR + '/config/constants');

const Subcribers_email = mongoose.model('Subcribers_email', subcribers_email);

const insert = (params) => {
    return new Promise((resolve, reject) => {
        //validatio  workk
        var data = params;

        // Code...Code


        // check mongoose.connections
        let status = connect(__db.COOLD);
        if (status.code == 500) {
            return reject({ code: 500, body: "connection error" });
        }

        Subcribers_email.insertMany(data).then(value => {
            resolve({ status: 200, message: "sccessful" })
        }).catch(error => {
            console.log('not entered', error);
            reject({ status: 500, error: error });
        }).finally(() => {
            close()
        })

    });
}

const fetch = (filter = {}) => {
   return new Promise((resolve, reject) => {

        let status = connect(__db.COOLD);
        if (status.code == 500) {
            return reject({ code: 500, body: "connection error" });
        }

        Subcribers_email.find(filter).then(value => {
            resolve({ status: 200, message: "sccessful", data: value })
        }).catch(error => {
            console.log('new eerro', error);
            reject({ status: 500, error: error });
        }).finally(() => {
            close()
        })
    });

}

const update = (params, where) => {
    return new Promise((resolve, reject) => {
        let newdata = params;




        let status = connect(__db.COOLD);
        if (status.code == 500) {
            console.log('object');
            return reject({ code: 500, body: "connection error" });
        }

        Subcribers_email.updateOne(where, newdata).then(value => {
            resolve({ status: 200, message: "sccessful" })
        }).catch(error => {
            console.log('new eerro', error);
            reject({ status: 500, error: error });
        }).finally(() => {
            close()
        })

    });

}

module.exports = {
    insert: insert,
    fetch: fetch,
    update: update
}