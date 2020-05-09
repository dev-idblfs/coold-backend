var AWS = require('aws-sdk');

const BUCKET = 'onxcy'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAJGE6FO6C5YQM5C4A'
const SECRET_KEY = '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'

// Set the region 
AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION
})


// Create S3 service object
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const putObject = (file, filename) => {
    return new Promise((resolve, reject) => {
        s3.putObject({
            Bucket: BUCKET,
            Body: file,
            Key: filename
        }).promise().then(response => {
            console.log(`done! - `, response)
            console.log(
                `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: filename })}`
            )
            resolve({ status: 200, Body: response });
        }).catch(err => {
            console.log('failed:', err)
            reject({ status: 404, Body: err });
        });
    });
};

const upload = (uploadParams) => {
    uploadParams.Bucket = BUCKET;
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
            return { status: 500, body: err }
        } if (data) {
            console.log("Upload Success", data.Location);
            return { status: 200, body: data }
        }
    });
}


module.exports = {
    putObject: putObject,
    upload: upload
}