import React from 'react';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import RatingsBreakdown from '../../../components/RatingsAndReviews/ratings/RatingsBreakdown';

describe('RatingsBreakdown Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider>
        <RatingsBreakdown />
      </RootProvider>
      ,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should render button to filter ratings', () => {
    const button = wrapper.find('.breakdownItem button');
    expect(button.exists()).toBe(true);
  });
  it('Should render clear filter button when filter buttons clicked', () => {
    const button = wrapper.find('.filterButton');
    button.at(0).simulate('click');
    const clearButton = wrapper.find('.clearButton');
    expect(clearButton.exists()).toBe(true);
  });
  it('Should not render filter info if filter buttons are not clicked', () => {
    const clearButton = wrapper.find('.clearButton');
    expect(clearButton.exists()).toBe(false);
  });
});
