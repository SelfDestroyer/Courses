import React from 'react';
import { cleanup } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import First from '../First';

Enzyme.configure({ adapter: new Adapter() });

const etalonList = [
  'Animals',
  'Anime',
  'Anti-Malware',
  'Art Design',
  'Books',
  'Business',
  'Calendar',
  'Cloud Storage',
  'File Sharing',
  'Animals',
  'Continuous Integration',
  'Cryptocurrency'
]
  .sort()
  .map(el => el.toLocaleLowerCase());

const containerApp = shallow(<App />);
const propsFirst = { ...containerApp.find(First).props() };

describe("Test suite for item `props`", () => {
  afterEach(cleanup);

  it("the props of component `First` should be defined", () => {
    expect(containerApp.find(First).props()).toBeDefined();
  });

  it("the props of component `First` should have only one property", () => {
    expect(Object.keys(propsFirst)).toHaveLength(1);
  });

  it("the props of component `First` should get certian data", () => {
    expect([...Object.values(propsFirst)[0]].sort()).toEqual(etalonList);
  });
});
