const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const uri = "mongodb://127.0.0.1:27017/";
// const client = new MongoClient(uri);
const db_name = 'testsdfds';
const collection = 'yooyo';
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


var Test = Schema({
    name: String,
    age: String
}, {
    collection: collection
});

var TestModal = mongoose.model('schema1', Test);
const insert = () => {
    mongoose.connect(uri, option).then(async (db) => {
        TestModal.insertMany({
            name: "anshu",
            age: 32
        }).then(ok => {
            console.log('ok', ok)
        }).catch(e => {
            console.log('e', e)
        })

    }).catch((err) => {
        console.log('error', error)

    });
}

module.exports = {
    insert: insert,
}