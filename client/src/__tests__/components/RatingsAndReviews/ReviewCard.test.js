import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import ReviewCard from '../../../components/RatingsAndReviews/reviews/ReviewCard';

describe('ReviewCard Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <ReviewCard review={{
          review_id: 3,
          rating: 4,
          summary: 'I am liking these glasses',
          recommend: false,
          response: "Glad you're enjoying the product!",
          body: "Hit you unexpectedly love blinks and purr purr purr purr yawn so try to jump onto window and fall while scratching at wall found somthing move i bite it tail and eat all the power cords murr i hate humans they are so annoying or kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment. In the middle of the night i crawl onto your chest and purr gently to help you sleep while happily ignoring when being called do i like standing on litter cuz i sits when i have spaces, my cat buddies have no litter",
          date: '2019-06-23T00:00:00.000Z',
          reviewer_name: 'bigbrotherbenjamin',
          helpfulness: 5,
          photos: [],
        }}
        />
      </RootProvider>
      ,
    );
  });
  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should have body longer than 250 chars', () => {
    const body = wrapper.find('.cardBody');
    expect(body.text()).toHaveLength(262);
  });
  it('Should have show more button for body longer than 250 chars', () => {
    const button = wrapper.find('.expandBodyButton');
    expect(button.exists()).toBe(true);
  });
});
