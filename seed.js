const database = require('./server/QA/database/database.js');
const {Question, Answer, AnswerImage, QuestionCounter, AnswerCounter, ImageCounter} = require('./server/QA/database/sequelize.js');

var Questions = [];
var Answers = [];
var AnswerImages = [];
var QuestionCount = [];
var AnswerCount = [];
var ImageCount = [];


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
  await Promise.all(QuestionCount.map(questionCounter => {
    return QuestionCounter.create(questionCounter);
  }));
  await Promise.all(AnswerCount.map(answerCounter => {
    return AnswerCounter.create(answerCounter);
  }));
  await Promise.all(ImageCount.map(imageCounter => {
    return ImageCounter.create(imageCounter);
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
