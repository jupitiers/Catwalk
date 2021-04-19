import React, { createContext, useContext, useState } from 'react';

export const QuestionContext = createContext({});

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
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