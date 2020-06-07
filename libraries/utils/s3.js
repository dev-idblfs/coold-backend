var AWS = require('aws-sdk');

const BUCKET = 'onxcy/resumes'
const REGION = 'us-east-2'
const ACCESS_KEY = 'AKIAIDOEAAONJ3IVHWLQ'
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
            resolve({ status: 200, body: response });
        }).catch(err => {
            reject({ status: 404, body: err });
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