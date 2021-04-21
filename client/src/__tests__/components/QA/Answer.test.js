import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Answer from '../../../components/QA/Answer';

describe('Answer Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <Answer
          id = {68}
          answer = {"We are selling it here without any markup from the middleman!"}
          date = {"2018-08-18T00:00:00.000Z"}
          author = {"Seller"}
          helpfulness = {4}
          photos = {[]}
          helpfulnessClick = {(helpful) => {true}}
          reportClick = {(reported) => {true}}
        />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('"Helpful" click changes styling', () => {
    const button = wrapper.find('#helpfulButton');
    const originalDiv = wrapper.find('#helpful')
    expect(originalDiv.exists()).toBe(true);
    button.simulate('click');
    const newDiv = wrapper.find('#helpfulClick');
    expect(newDiv.exists()).toBe(true);
  });
  it('"Helpful" cannot change back after click', () => {
    const button = wrapper.find('#helpfulButton');
    const originalDiv = wrapper.find('#helpful')
    expect(originalDiv.exists()).toBe(true);
    button.simulate('click');
    const newDiv = wrapper.find('#helpfulClick');
    expect(newDiv.exists()).toBe(true);
    newDiv.simulate('click');
    expect(newDiv.exists()).toBe(true);
  });it('"Report" click changes to "Reported"', () => {
    const button = wrapper.find('#reportButton');
    const originalDiv = wrapper.find('#report')
    expect(originalDiv.exists()).toBe(true);
    button.simulate('click');
    const newDiv = wrapper.find('#reported');
    expect(newDiv.exists()).toBe(true);
  });
  it('"Reported" cannot change back after click', () => {
    const button = wrapper.find('#reportButton');
    const originalDiv = wrapper.find('#report')
    expect(originalDiv.exists()).toBe(true);
    button.simulate('click');
    const newDiv = wrapper.find('#reported');
    expect(newDiv.exists()).toBe(true);
    newDiv.simulate('click');
    expect(newDiv.exists()).toBe(true);
  });
});
