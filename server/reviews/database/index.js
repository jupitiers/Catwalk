const cassandra = require('cassandra-driver');
// const host = process.env.CASSANDRA_HOST;
const username = process.env.CASSANDRA_USERNAME;
const password = process.env.CASSANDRA_PASSWORD;

const client = new cassandra.Client({
  contactPoints: ['40.87.123.102'],
  localDataCenter: 'datacenter1',
  credentials: { username: username, password: password }
});

module.exports = client;