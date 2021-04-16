import React from 'react';
import ProductProvider from './ProductContext';
import APIProvider from './APIContext';
import ReviewProvider from './ReviewsContext';
import QuestionProvider from './QuestionsContext';

export const RootProvider = ({children}) => {
  return (
    <ProductProvider>
      <QuestionProvider>
        <ReviewProvider>
          <APIProvider>
            {children}
          </APIProvider>
        </ReviewProvider>
      </QuestionProvider>
    </ProductProvider>
  );
};