const mongoose = require('mongoose');
const { resumes } = require(ROOT_DIR + '/config/mongoSchema');
const { connect, close } = require(ROOT_DIR + '/config/mongoDB');
const { __db } = require(ROOT_DIR + '/config/constants');

const Resumes = mongoose.model('Resumes', resumes);


const insert = (params) => {
    return new Promise((resolve, reject) => {
        //validatio  workk
        var data = params;

        // Code...Code

        // check mongoose.connections
        let status = connect(__db.ONXCY);
        if (status.code == 500) {
            return reject({ code: 500, body: "connection error" });
        }

        Resumes.insertMany(data).then(value => {
            resolve({ status: 200, message: "sccessful", body: value })
        }).catch(error => {
            console.log('not entered', error);
            reject({ status: 500, error: error });
        }).finally(() => {
            close()
        });

    });
}

const fetch = (filter = {}) => {
    return new Promise((resolve, reject) => {

        let status = connect(__db.ONXCY);
        if (status.code == 500) {
            return reject({ code: 500, body: "connection error" });
        }

        Resumes.find(filter).then(value => {
            resolve({ status: 200, message: "sccessful", body: value })
        }).catch(error => {
            console.log('new error', error);
            reject({ status: 500, error: error });
        }).finally(() => {
            close()
        })
    });

}

const update = (where, params) => {
    return new Promise((resolve, reject) => {
        let newdata = params;




        let status = connect(__db.ONXCY);

        if (status.code == 500) {
            console.log('object');
            return reject({ code: 500, body: "connection error" });
        }

        Resumes.updateOne(where, newdata, { timestamps: true }).then(value => {
            if (value.n > 0) {
                resolve({ status: 200, message: "sccessful" })
            } else {
                reject({ status: 202, message: 'Somthing went Wrong' })
            }
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