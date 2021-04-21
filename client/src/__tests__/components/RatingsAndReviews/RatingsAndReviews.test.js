import React from 'react';
import '@testing-library/jest-dom';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import RatingsAndReviews from '../../../components/RatingsAndReviews/RatingsAndReviews';
import { RootProvider } from '../../../state/contexts/RootContext';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';

describe('RatingsAndReviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <RatingsAndReviews />
      </RootProvider>,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has an add review button', () => {
    const button = wrapper.find('.firstReviewButton');
    expect(button.exists()).toBe(true);
  });
  it('create review modal opens when add review button clicked', () => {
    const button = wrapper.find('.firstReviewButton');
    button.simulate('click');
    const modal = wrapper.find('.show');
    expect(modal.exists()).toBe(true);
  });
});
