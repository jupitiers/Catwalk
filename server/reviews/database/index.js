const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['40.87.123.102'],
  localDataCenter: 'datacenter1',
  credentials: { username: 'cassandra', password: 'cassandra' }
});

module.exports = client;