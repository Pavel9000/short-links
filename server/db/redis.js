const { createClient } = require('redis');

const state = {
  db: null
};

exports.connect = async function () {

  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  
  state.db = client

}

exports.get = function () {
    return state.db;
  }