import React from 'react';
import { shallow } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import RatingsFactors from '../../../components/RatingsAndReviews/ratings/RatingsFactors';

describe('RatingsFactors Component', () => {
  it('Renders RatingsFactors Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <RatingsFactors />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
