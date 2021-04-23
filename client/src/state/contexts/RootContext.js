import React from 'react';
import ProductProvider from './ProductContext';
import APIProvider from './APIContext';
import ReviewProvider from './ReviewsContext';
import QuestionProvider from './QuestionsContext';
import AnswerProvider from './AnswersContext';
import RelatedProvider from './RelatedContext';

export const RootProvider = ({ children }) => (
  <ProductProvider>
    <RelatedProvider>
      <AnswerProvider>
        <QuestionProvider>
          <ReviewProvider>
            <APIProvider>
              {children}
            </APIProvider>
          </ReviewProvider>
        </QuestionProvider>
      </AnswerProvider>
    </RelatedProvider>
  </ProductProvider>
);
