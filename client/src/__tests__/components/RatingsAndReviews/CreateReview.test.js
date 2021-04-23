import React from 'react';
import { mount } from '../../../../../enzyme.setup';
import { CreateReview } from '../../../components/RatingsAndReviews/createReview/CreateReview';
import { RootProvider } from '../../../state/contexts/RootContext';

describe('CreateReview Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <CreateReview />
      </RootProvider>
      ,
    );
  });
  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should have an images container', () => {
    const images = wrapper.find('.images');
    expect(images.exists()).toBe(true);
  });
});
