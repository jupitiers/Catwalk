const database = require('./server/QA/database/database.js');
const {Question, Answer, AnswerImage} = require('./server/QA/database/sequelize.js');

var Questions = [];
var Answers = [];
var AnswerImages = [];

const seed = async () => {
  await database.sync({force:true})
  await Promise.all(Questions.map(question => {
    return Question.create(question);
  }));
  await Promise.all(Answers.map(answer => {
    return Answer.create(answer);
  }));
  await Promise.all(AnswerImages.map(answerImage => {
    return AnswerImage.create(answerImage);
  }));
  console.log('Database seeded successfully');
  database.close();
}

seed()
  .catch(error => {
    console.error('Error seeding');
    console.error(error);
    database.close();
  })
