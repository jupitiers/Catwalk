import React from 'react';
import { mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Reviews from '../../../components/RatingsAndReviews/reviews/Reviews';

describe('Reviews Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider value={{ reviews: [1, 2, 3, 4] }}>
        <Reviews onChange={jest.fn()} />
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
  it('should contain review cards list', () => {
    const list = wrapper.find('.cardList');
    expect(list.exists()).toBe(true);
  });
  it('should contain review card in card list', () => {
    const card = wrapper.find('.review');
    expect(card.exists()).toBe(true);
  });
});
