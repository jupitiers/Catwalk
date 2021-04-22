import React from 'react';
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import QAIndex, {searchFunc} from '../../../components/QA/QAindex';
import { RootProvider } from '../../../state/contexts/RootContext';
import { QuestionsContext, AnswersContext } from '../../../state/contexts/ReviewsContext';
import sampleData from '../../../components/QA/qaSampleData';

describe('QAIndex Component', () => {
  let wrapper;
  var testQuestions = sampleData.results;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <QAIndex/>
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('on default loads a QA list', () => {
    const list = wrapper.find('#QAlist');
    expect(list.exists()).toBe(true);
  });
  it('has a search bar', () => {
    const searchBar = wrapper.find('#searchbar');
    expect(searchBar.exists()).toBe(true);
  });
  it('has a section where the "More Answered Questions" button would go', () => {
    const section = wrapper.find('#moreQuestionsButton');
    expect(section.exists()).toBe(true);
  });
  it('has no "More Answered Questions" button if there are no more than 2 questions', () => {
    const section = wrapper.find('#moreQuestionsButton');
    expect(section.text()).toEqual('');
  });
  it('has an "Add a Question" button', () => {
    const button = wrapper.find('#addQuestion');
    expect(button.exists()).toBe(true);
  });
  it('should open an Add a Question modal when "Add a Question" button clicked', () => {
    const button = wrapper.find('#addQuestion');
    button.simulate('click');
    const modal = wrapper.find('#questionModal');
    expect(modal.exists()).toBe(true);
  });
  it('should have a functional close button in the Add a Question modal', () => {
    const button = wrapper.find('#addQuestion');
    const div = wrapper.find('#questionModalDiv')
    button.simulate('click');
    const closebutton = wrapper.find('.modalclose');
    expect(closebutton.exists()).toBe(true);
    closebutton.simulate('click');
    expect(div.text()).toEqual('');
  });
});