import React from 'react';
import '@testing-library/jest-dom';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import Index from '../../../components/QA/index';
import { RootProvider } from '../../../state/contexts/RootContext';
import { QuestionsContext, AnswersContext } from '../../../state/contexts/ReviewsContext';

describe('RatingsAndReviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <Index />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Using default reviews data from context (TODO is this the best way?)
  it('has a "More Answered Questions" button', () => {
    const button = wrapper.find('#moreQuestions');
    expect(button.exists()).toBe(true);
  });
  it('has an "Add a Question" button', () => {
    const button = wrapper.find('#addQuestion');
    expect(button.exists()).toBe(true);
  });
  it('Add Question modal opens when "Add a Question" button clicked', () => {
    const button = wrapper.find('#addQuestion');
    button.simulate('click');
    const modal = wrapper.find('#questionModal');
    expect(modal.exists()).toBe(true);
  });
});