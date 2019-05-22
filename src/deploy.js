
var s3 = require('s3');
var AWS = require('aws-sdk');

AWS.util.update(AWS.S3.prototype, {
  addExpect100Continue: function addExpect100Continue(req) {
      console.log('Depreciating this workaround, because introduced a bug');
      console.log('Check: https://github.com/andrewrk/node-s3-client/issues/74');
  }
});

const awsS3Client = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: "AKIAJGLULUDNDNHPA6BA",
  secretAccessKey: "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",
  region: "ap-northeast-2"
});

var client = s3.createClient({
  maxAsyncS3: 100000,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 200971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Client: awsS3Client
});

var params = {
  localDir: `${__dirname}\\..\\dist`,
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.
  s3Params: {
    Bucket: "topmunja-website",
    Prefix: "",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};

let remover = client.deleteDir({
  Bucket: "topmunja-website",
  Prefix: ""
})

remover.on('end', function() {
  console.log("done deleting");
  var uploader = client.uploadDir(params);
  uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
});