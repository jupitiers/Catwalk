const Sequelize = require('sequelize');
// const database = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/qa', {logging:false}, {dialect: 'postgres'});

const database = new Sequelize('qa', 'daniel', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = database;