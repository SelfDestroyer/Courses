import React from 'react';
import { cleanup } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

const etalonData = 'React Marathon';

describe('Test suite for item `state-event`', () => {
  afterEach(cleanup);

  it('state of component `App` should has certian data', () => {
    const wrap = shallow(<App />);
    expect(wrap.state('appData')).toEqual(etalonData);
  });

  it('the component `App` should render `div` element', () => {
    const wrap = shallow(<App />);
    expect(wrap.getElement().type).toEqual('div');
  });

  it('the component `App` should render data from state', () => {
    const wrap = shallow(<App />);
    const newEtalon = 'New etalon';
    wrap.setState({ appData: newEtalon });
    expect(wrap.text().trim()).toEqual(newEtalon);
  });

  it('after click on `div` the state should be changed', () => {
    const wrap = shallow(<App />);
    const newEtalon = 'New Etalon';
    wrap.setState({ appData: newEtalon });
    wrap.simulate('click');
    expect(wrap.state().appData).toEqual(newEtalon.toLocaleLowerCase());
  });

  it('the component `App` should be a class but not a function', () => {
    expect(App.prototype.isReactComponent).toBeDefined();
  });
});
