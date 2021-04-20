import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import ReviewImages from '../../../components/RatingsAndReviews/reviews/ReviewImages';

describe('ReviewImages Component', () => {
  test('Renders ReviewImages Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <ReviewImages />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
