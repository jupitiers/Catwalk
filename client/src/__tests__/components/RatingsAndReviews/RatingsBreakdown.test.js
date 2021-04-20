import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import RatingsBreakdown from '../../../components/RatingsAndReviews/ratings/RatingsBreakdown';

describe('RatingsBreakdown Component', () => {
  test('Renders RatingsBreakdown Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <RatingsBreakdown />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
