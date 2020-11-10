const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (error) => {
  console.log(error);
});

client.flushdb((err) => {
  if (err) console.log(err);
});

module.exports = client;
