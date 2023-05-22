require('dotenv').config();
const AWS = require("aws-sdk");

console.log(process.env.SECRET_KEY)
const clientaccess = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});

const config = {
  clientaccess: clientaccess,
  bucketname: "node-js-practice",
};

module.exports = { config };
