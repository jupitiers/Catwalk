import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import RatingsAndReviews from '../../../components/RatingsAndReviews/RatingsAndReviews';
import { RootProvider } from '../../../state/contexts/RootContext';

describe('RatingsAndReviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <RatingsAndReviews />
      </RootProvider>,
    );
  });

  it('Renders RatingsAndReviews Component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has a first review button', () => {
    const button = <button>Be the first to add a review</button>;
    expect(wrapper.containsMatchingElement(button)).toBe(true);
  });
  it('has text on first review button', () => {
    const button = wrapper.find('#first-review-button');
    expect(button.text()).toEqual('Be the first to add a review');
  });
});
