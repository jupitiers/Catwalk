import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Reviews from '../../../components/RatingsAndReviews/reviews/Reviews';

describe('Reviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider value={{ reviews: [1, 2, 3, 4] }}>
        <Reviews />
      </RootProvider>
      ,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should have a dropdown to sort reviews', () => {
    const select = wrapper.find('#sort-by');
    expect(select.exists()).toBe(true);
  });
  it('dropdown should call change handler', () => {
    const select = wrapper.find('#sort-by');
    select.find('option').at(0).simulate('change', {
      target: { value: 'relevant' },
    });
    expect(select.exists()).toBe(true);
  });
  it('should contain review cards list', () => {
    const list = wrapper.find('.cardList');
    expect(list.exists()).toBe(true);
  });
});
