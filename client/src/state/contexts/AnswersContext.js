import React, { createContext, useContext, useState } from 'react';

export const AnswerContext = createContext({});

const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);
  const [aHelpfulnessMarked, setaHelpfulnessMarked] = useState(false);

  return (
    <AnswerContext.Provider
      value={{
        answers,
        setAnswers,
        aHelpfulnessMarked,
        setaHelpfulnessMarked
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerProvider;