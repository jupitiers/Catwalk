import React from 'react';
import ProductProvider from './ProductContext';
import APIProvider from './APIContext';
import ReviewProvider from './ReviewsContext';
import QuestionProvider from './QuestionsContext';
import AnswerProvider from './AnswersContext';

export const RootProvider = ({ children }) => (
  <ProductProvider>
    <AnswerProvider>
      <QuestionProvider>
        <ReviewProvider>
          <APIProvider>
            {children}
          </APIProvider>
        </ReviewProvider>
      </QuestionProvider>
    </AnswerProvider>
  </ProductProvider>
);
