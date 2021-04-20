import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import RatingsFactors from '../../../components/RatingsAndReviews/ratings/RatingsFactors';

describe('RatingsFactors Component', () => {
  test('Renders RatingsFactors Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <RatingsFactors />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
