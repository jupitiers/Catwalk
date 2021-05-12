const Sequelize = require('sequelize');
// const database = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/qa', {logging:false}, {dialect: 'postgres'});

const database = new Sequelize('qa', 'postgres', 'postgres', {
  host: '20.84.97.78',
  dialect: 'postgres'
})

module.exports = database;