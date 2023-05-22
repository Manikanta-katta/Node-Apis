const env = require("./env");
const AWS = require("aws-sdk");

const clientaccess = new AWS.S3({
  accessKeyId: env.ACCESSKEY,
  secretAccessKey: env.SECRETKEY,
  region: env.REGION,
});

const config = {
  clientaccess: clientaccess,
  bucketname: "node-js-practice",
};

module.exports = { config };
