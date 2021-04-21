import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Reviews from '../../../components/RatingsAndReviews/reviews/Reviews';

describe('Reviews Component', () => {
  it('Renders Reviews Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <Reviews />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
