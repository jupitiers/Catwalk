import React from 'react';
import { mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import ReviewImages from '../../../components/RatingsAndReviews/reviews/ReviewImages';

describe('ReviewImages Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <ReviewImages images={[{
          id: 614155,
          url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0JTIwaW4lMjBzdW5nbGFzc2VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        }]}
        />
      </RootProvider>
      ,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should render thumbnail from props', () => {
    const thumbnail = wrapper.find('.imageWrapper');
    expect(thumbnail.exists()).toBe(true);
  });
  it('Should display image overlay when thumbnail clicked', () => {
    const thumbnail = wrapper.find('.imageWrapper');
    thumbnail.simulate('click');
    const overlay = wrapper.find('.show');
    expect(overlay.exists()).toBe(true);
  });
  it('Should not display image overlay if thumbnail not clicked', () => {
    const overlay = wrapper.find('.show');
    expect(overlay.exists()).toBe(false);
  });
});
