import React from 'react';
import { shallow, render } from '../../../../enzyme.setup';
import App from '../../components/App';

describe('App Component', () => {
  test('Renders App Component', () => {
    const wrapper = shallow(
      <App />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
