const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const uri = "mongodb+srv://admin_prod:nxcy@123@idblfs-7za2q.gcp.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27017/";
// const client = new MongoClient(uri);
const db_name = 'onxcy_resume';
const collection = 'subcribers_email';
const option = { useNewUrlParser: true, useUnifiedTopology: true }

const insert = (params) => {
    return new Promise((resolve, reject) => {
        var data = params;
        MongoClient.connect(uri, option).then(async (db) => {
            var dbo = db.db(db_name);
            try {
                console.log('collections',collection);
                const result = await dbo.collection(collection).insertOne(data);
                console.log("enterd");
                resolve({ status: 200, body: result.result })
            } catch (err) {
                console.log('not entered');
                reject({ status: 500, error: err });
                db.close();
            }
        }).catch((err) => {
            console.log('connt connect')
            reject({ status: 502, error: err })
        })
    });
}

const fetch = (filter = {}) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, option).then(async (db) => {
            var dbo = db.db(db_name);
            try {
                let result = await dbo.collection(collection).find(filter).toArray()
                console.log("fetched");
                resolve({ status: 200, body: result })
            } catch (err) {
                console.log('not entered');
                reject({ status: 500, error: err });
                db.close();
            }
        }).catch((err) => {
            console.log('connt connect')
            reject({ status: 502, error: err })
        })
    });

}

const update = (params, where) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, option).then(async (db) => {
            var dbo = db.db(db_name);
            try {
                console.log(params);
                var newdata = { $set: params };
                let result = await dbo.collection(collection).updateOne(where, newdata)
                console.log("updated");
                resolve({ status: 200, body: result })
            } catch (err) {
                console.log('not update');
                reject({ status: 500, error: err });
                db.close();
            }
        }).catch((err) => {
            console.log('connt connect')
            reject({ status: 502, error: err })
        })
    });

}

module.exports = {
    insert: insert,
    fetch: fetch,
    update: update
}