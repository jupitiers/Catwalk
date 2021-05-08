const Sequelize = require('sequelize');
const db = require('./database.js');


const Question = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: Sequelize.INTEGER
  },
  body: {
    type: Sequelize.TEXT
  },
  date_written: {
    type: Sequelize.DATE
  },
  asker_name: {
    type: Sequelize.STRING
  },
  asker_email: {
    type: Sequelize.STRING
  },
  reported: {
    type: Sequelize.INTEGER
  },
  helpful: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false})


const Answer = db.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  body: {
    type: Sequelize.TEXT
  },
  date_written: {
    type: Sequelize.DATE
  },
  answerer_name: {
    type: Sequelize.STRING
  },
  answerer_email: {
    type: Sequelize.STRING
  },
  reported: {
    type: Sequelize.INTEGER
  },
  helpful: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false})


Answer.belongsTo(Question);
Question.hasMany(Answer);


const AnswerImage = db.define('answerImage', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  url: {
    type: Sequelize.STRING
  }
}, {timestamps: false})

AnswerImage.belongsTo(Answer);
Answer.hasMany(AnswerImage);

const QuestionCounter = db.define('questionCounter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  count: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false})

const AnswerCounter = db.define('answerCounter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  count: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false})

const ImageCounter = db.define('imageCounter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  count: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false})

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Question,
  Answer,
  AnswerImage,
  QuestionCounter,
  AnswerCounter,
  ImageCounter
}