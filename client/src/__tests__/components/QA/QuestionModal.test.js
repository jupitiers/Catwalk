import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import QuestionModal, {checkAuth, submit} from '../../../components/QA/QuestionModal';

describe('Question Modal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <QuestionModal
          productName = {"Morning Joggers"}
          />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should have a title that reads "Ask Your Question"', () => {
    const title = wrapper.find('#title');
    expect(title.text()).toEqual('Ask Your Question');
  });
  it('should have a subtitle that reads "About the [Product Name]"', () => {
    const subtitle = wrapper.find('#subtitle');
    expect(subtitle.text()).toEqual('About the Morning Joggers');
  });
  it('should give an error message if user does not fill fields properly', () => {
    const button = wrapper.find('.questionsubmit');
    button.simulate('click');
    checkAuth
    const error = wrapper.find('.submiterror')
    const questionCheck = wrapper.find('#questionCheck')
    const nicknameCheck = wrapper.find('#nicknameCheck')
    const emailCheck = wrapper.find('#emailCheck')
    expect(error.exists()).toBe(true);
    expect(questionCheck.exists()).toBe(true);
    expect(nicknameCheck.exists()).toBe(true);
    expect(emailCheck.exists()).toBe(true);
  });
});
