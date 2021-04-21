import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import QAList from '../../../components/QA/QAList';

describe('QAList Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <QAList
          questionData = {[{
            "question_id": 37,
            "question_body": "Why is this product cheaper here than other sites?",
            "question_date": "2018-10-18T00:00:00.000Z",
            "asker_name": "williamsmith",
            "question_helpfulness": 4,
            "reported": false,
            "answers": {
              68: {
                "id": 68,
                "body": "We are selling it here without any markup from the middleman!",
                "date": "2018-08-18T00:00:00.000Z",
                "answerer_name": "Seller",
                "helpfulness": 4,
                "photos": []
              }
            }
          }]}
          productData = {{
            "id": 3,
            "name": "Morning Joggers",
            "slogan": "Make yourself a morning person",
            "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
            "category": "Pants",
            "default_price": "40"
          }}/>
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should contain a list of QA Entries', () => {
    const entries = wrapper.find('.QAEntry');
    expect(entries.exists()).toBe(true);
  });
});
