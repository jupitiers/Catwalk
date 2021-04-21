import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Ratings from '../../../components/RatingsAndReviews/ratings/Ratings';

describe('Ratings Component', () => {
  it('Renders Ratings Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <Ratings />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
