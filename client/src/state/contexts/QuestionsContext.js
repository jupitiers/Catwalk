import React, { createContext, useContext, useState } from 'react';

export const QuestionContext = createContext({});

const QuestionProvider = ({ children }) => {
  var sampleQuestions = [{"question_id": 1,
    "question_body": "1",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "1",
    "question_helpfulness": 1,
    "reported": false,
    "answers": {
      1: {
        "id": 1,
        "body": "1",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "1",
        "helpfulness": 1,
        "photos": []
      }
    }
  },
  {"question_id": 2,
    "question_body": "2",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "2",
    "question_helpfulness": 2,
    "reported": false,
    "answers": {
      2: {
        "id": 2,
        "body": "2",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "2",
        "helpfulness": 2,
        "photos": []
      }
    }
  },
  {"question_id": 3,
    "question_body": "3",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "3",
    "question_helpfulness": 3,
    "reported": false,
    "answers": {
      3: {
        "id": 3,
        "body": "3",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "3",
        "helpfulness": 3,
        "photos": []
      }
    }
  }];
  const [questions, setQuestions] = useState(sampleQuestions);
  const [qHelpfulnessMarked, setqHelpfulnessMarked] = useState(false);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        qHelpfulnessMarked,
        setqHelpfulnessMarked
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;