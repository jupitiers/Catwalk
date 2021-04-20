import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import RatingsAndReviews from '../../../components/RatingsAndReviews/RatingsAndReviews';
import { RootProvider } from '../../../state/contexts/RootContext';

describe('RatingsAndReviews Component', () => {
  test('Renders RatingsAndReviews Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <RatingsAndReviews />
      </RootProvider>,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
