import React from 'react';
import { shallow, render, mount } from '../../../../enzyme.setup';
import { CreateReview } from '../../components/RatingsAndReviews/createReview/CreateReview';

describe('CreateReview Component', () => {
  test('Renders CreateReview Component', () => {
    const wrapper = shallow(
      <CreateReview />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
