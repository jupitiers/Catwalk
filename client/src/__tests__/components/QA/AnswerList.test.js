import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import AnswerList from '../../../components/QA/AnswerList';

describe('Answer List Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <AnswerList
          questionId = {37}
          answers = {{
            68: {
              "id": 68,
              "body": "We are selling it here without any markup from the middleman!",
              "date": "2018-08-18T00:00:00.000Z",
              "answerer_name": "Seller",
              "helpfulness": 4,
              "photos": []
            },
            69: {
              "id": 69,
              "body": "We are selling it here without any markup from the middleman!",
              "date": "2018-08-18T00:00:00.000Z",
              "answerer_name": "Seller",
              "helpfulness": 4,
              "photos": []
            },
            70: {
              "id": 70,
              "body": "We are selling it here without any markup from the middleman!",
              "date": "2018-08-18T00:00:00.000Z",
              "answerer_name": "Seller",
              "helpfulness": 4,
              "photos": []
            }
          }}
          />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should contain a list of Answers', () => {
    const entries = wrapper.find('.answer');
    expect(entries.exists()).toBe(true);
  });
  it('"Load more answers" button changes to "Collapse answers" on click', () => {
    const button = wrapper.find('#moreAnswers');
    button.simulate('click');
    const newbutton = wrapper.find('#collapseAnswers');
    expect(newbutton.exists()).toBe(true);
  });
  it('"Collapse answers" button changes to "Load more answers" on click', () => {
    const button = wrapper.find('#moreAnswers');
    button.simulate('click');
    const newbutton = wrapper.find('#collapseAnswers');
    newbutton.simulate('click');
    expect(button.exists()).toBe(true);
  });
});
