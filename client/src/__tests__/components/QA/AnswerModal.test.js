import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import AnswerModal, {checkAuth, submit, addPhoto, trackClick, uploadPhoto} from '../../../components/QA/AnswerModal';
import APIProvider from '../../../state/contexts/APIContext';

describe('Answer Modal Component', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <AnswerModal
          id = {37}
          question = {"Why is this product cheaper here than other sites?"}
          productData = {{
            "id": 3,
            "name": "Morning Joggers",
            "slogan": "Make yourself a morning person",
            "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
            "category": "Pants",
            "default_price": "40"
          }}
          />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should have a title that reads "Submit Your Answer"', () => {
    const title = wrapper.find('#title');
    expect(title.text()).toEqual('Submit Your Answer');
  });
  it('should have a subtitle that reads "[Product Name]: [Question]"', () => {
    const subtitle = wrapper.find('#subtitle');
    expect(subtitle.text()).toEqual('Morning Joggers: Why is this product cheaper here than other sites?');
  });
  it('should give an error message if user does not fill fields properly', () => {
    const button = wrapper.find('#answersubmit');
    button.simulate('click');
    checkAuth
    const error = wrapper.find('.submiterror')
    const answerCheck = wrapper.find('#answerCheck')
    const nicknameCheck = wrapper.find('#nicknameCheck')
    const emailCheck = wrapper.find('#emailCheck')
    expect(error.exists()).toBe(true);
    expect(answerCheck.exists()).toBe(true);
    expect(nicknameCheck.exists()).toBe(true);
    expect(emailCheck.exists()).toBe(true);
  });
});
