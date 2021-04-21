import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Reviews from '../../../components/RatingsAndReviews/reviews/Reviews';

describe('Reviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider value={{ reviews: [1, 2, 3, 4] }}>
        <Reviews />
      </RootProvider>
      ,
    );
  });

  it('Renders Reviews Component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has a dropdown to sort reviews', () => {
    const select = wrapper.find('#sort-by');
    expect(select.exists()).toBe(true);
  });
});
