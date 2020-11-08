const redis = require('redis');
const client = redis.createClient();

client.on('error', (error) => {
  console.log(error);
});

client.flushdb((err) => {
  if (err) console.log(err);
});

module.exports = client;
