import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import RatingSummary from '../../../components/RatingsAndReviews/ratings/RatingSummary';

describe('RatingSummary Component', () => {
  test('Renders RatingSummary Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <RatingSummary />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
