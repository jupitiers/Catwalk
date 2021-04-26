import React from 'react';
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import { shallow, render, mount } from '../../../../../enzyme.setup';
import { RootProvider } from '../../../state/contexts/RootContext';
import Index from '../../../components/Related/index.jsx';
import { RelatedContext } from '../../../state/contexts/RelatedContext';

describe('Related Items and Outfit Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RootProvider >
        <Index/>
      </RootProvider>,
    );
  });
  it('Renders component without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});