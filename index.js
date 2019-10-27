const IOST = require('iost');
const bs58 = require('bs58');
const API_URL = process.env.API_HOST
  ? process.env.API_HOST
  : 'http://localhost:30001';

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ACCOUNT_NAME = process.env.ACCOUNT_NAME;

const contract = new IOST.IOST(
  {
    gasRatio: 1,
    gasLimit: 2000000,
    delay: 0,
    expiration: 90,
    defaultLimit: 'unlimited',
  }
);

const rpc = new IOST.RPC(new IOST.HTTPProvider(API_URL));
contract.setRPC(rpc);

const account = new IOST.Account(ACCOUNT_NAME);
const kp = new IOST.KeyPair(bs58.decode(PRIVATE_KEY));
account.addKeyPair(kp, 'owner');
account.addKeyPair(kp, 'active');

contract.setAccount(account);

// send a call

const createRequest = (input, callback) => {
  let handler;
  switch (input.data.method.toLowerCase()) {
    case 'callabi':
      const data = input.data.args || input.data.result;
      const tx = contract.callABI(input.data.contract, input.data.action, data);
      handler = contract.signAndSend(tx);
      break;
    default:
      callback(400, {
        jobRunID: input.id,
        status: 'errored',
        error: 'Invalid method'
      });
      return;
  }

  const handleResponse = response => {
      if (response.code !== 0) {
        return callback(500, {
            jobRunID: input.id,
            status: "errored",
            error: response.message,
            statusCode: 500
        });
    }

    return callback(200, {
      jobRunID: input.id,
      data: response.message,
      statusCode: 200
    });
  };

  handler
  .on('pending', console.log)
  .on('success', handleResponse)
  .on('failed', handleResponse);

};

// createRequest() wrapper for GCP
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data);
  });
};

// createRequest() wrapper for AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// Used for testing
module.exports.createRequest = createRequest;
