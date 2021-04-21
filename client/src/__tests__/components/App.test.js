import React from 'react';
import { shallow, render } from '../../../../enzyme.setup';
import App from '../../components/App';

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <App />,
    );
  });

  it('Renders non-empty component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
