import React from 'react';
import { shallow, render, mount } from '../../../../enzyme.setup';
import RatingsAndReviews from '../../components/RatingsAndReviews/RatingsAndReviews';

describe('RatingsAndReviews Component', () => {
  test('Renders RatingsAndReviews Component', () => {
    const wrapper = shallow(
      <RatingsAndReviews />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
