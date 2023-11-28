const AWS = require("aws-sdk");
const awsConfig = require("./config");
AWS.config.update(awsConfig);
export const docClient = new AWS.DynamoDB.DocumentClient();