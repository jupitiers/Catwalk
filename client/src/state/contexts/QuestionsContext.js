import React, { createContext, useContext, useState } from 'react';

export const QuestionContext = createContext({});

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        feedbackGiven,
        setFeedbackGiven
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;