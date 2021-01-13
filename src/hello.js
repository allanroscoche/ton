const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

exports.handler = async (event) => {
  let params = {
    TableName: 'ton-db',
    Item: {
      id: { S: "test_id" },
      name: { S: "test_name" }
    }
  };
  data = await ddb.putItem(params).promise();
  let response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: '<p>Item added: </p>',
    };
  return response;
}
