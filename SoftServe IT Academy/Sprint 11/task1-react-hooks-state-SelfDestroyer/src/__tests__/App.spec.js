import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test suite for item "state-event"', () => {
  
  const etalonData = 'React Marathon';
  const oldConsole = global.console;
  
  afterEach(cleanup);

  it('the component "App" should render "div" element', () => {
    const { container } = render(<App />);
    const element = container.querySelector('div');
    expect(element).not.toBe(null);
  });
  
  it('the component "App" should render certian data', () => {
    const { container } = render(<App />);
    expect(container.textContent.trim()).toBe(etalonData);
  });

  it('after click on "div" the state should be changed', () => {
    const { container } = render(<App />);
    const element = container.querySelector('div');
    fireEvent.click(element);
    expect(element.textContent.trim()).toBe(etalonData.toLowerCase());
  });
  
  it('the component "App" should not have erros in console', () => {
    
    global.console = {
      error: jest.fn()
    }

    render(<App />);
    expect(global.console.error).not.toHaveBeenCalled();
    global.console = oldConsole;
  });
  
  it('the component "App" should be a function but not a class', () => {
    expect(App.prototype.isReactComponent).not.toBeDefined();
  });
});