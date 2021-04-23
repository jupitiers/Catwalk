import React from 'react';
import '@testing-library/jest-dom';
import { mount } from '../../../../../enzyme.setup';
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

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Using default reviews data from context (TODO is this the best way?)
  it('has a show more reviews button', () => {
    const button = wrapper.find('.moreReviews');
    expect(button.exists()).toBe(true);
  });
  it('has an add review button', () => {
    const button = wrapper.find('.reviewButton');
    expect(button.exists()).toBe(true);
  });
  it('create review modal opens when add review button clicked', () => {
    const button = wrapper.find('.reviewButton');
    button.simulate('click');
    const modal = wrapper.find('.show');
    expect(modal.exists()).toBe(true);
  });
});
