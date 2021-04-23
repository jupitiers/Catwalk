import React from 'react';
import { mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Ratings from '../../../components/RatingsAndReviews/ratings/Ratings';

describe('Ratings Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <Ratings />
      </RootProvider>
      ,
    );
  });
  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should have rating container', () => {
    const container = wrapper.find('.ratingsContainer');
    expect(container.exists()).toBe(true);
  });
});
