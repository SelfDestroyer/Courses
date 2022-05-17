import React from 'react';

import { cleanup, render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import First from '../First';

Enzyme.configure({ adapter: new Adapter() });

describe('Test suite for props:', () => {
  afterEach(cleanup);
  
  const containerApp = shallow(<App />);
  const propsFirst = { ...containerApp.find(First).props() };
  const firstList = Object.keys(propsFirst)[0];

  it('the compnent First should render data from props (case1)', () => {
    const mockProps = {
      [firstList]: ['case1', 'case2']
    };
    const { getAllByText } = render(<First {...mockProps} />);
    expect(getAllByText(mockProps[firstList][0])).toBeTruthy();
  });

  it('the compnent First should render data from props (case2)', () => {
    const mockProps = {
      [firstList]: ['case2', 'case1']
    };
    const { getAllByText } = render(<First {...mockProps} />);
    expect(getAllByText(mockProps[firstList][0])).toBeTruthy();
  });
});
