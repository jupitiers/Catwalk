import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import ReviewCard from '../../../components/RatingsAndReviews/reviews/ReviewCard';

describe('ReviewCard Component', () => {
  test('Renders ReviewCard Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <ReviewCard />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
