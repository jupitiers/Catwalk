import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { CreateReview } from '../../../components/RatingsAndReviews/createReview/CreateReview';
import { RootProvider } from '../../../state/contexts/RootContext';

describe('CreateReview Component', () => {
  it('Renders CreateReview Component', () => {
    const wrapper = shallow(
      <RootProvider>
        <CreateReview />
      </RootProvider>
      ,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
