import { render, cleanup } from '@testing-library/react';
import App from '../App';

describe('Test suite for item "hook-effect"', () => {
  
  const etalonData = ['', '3', '5', 'React Marathon'];
  const oldLocalStorage = global.localStorage;
  const oldConsole = global.console;
  
  afterEach(cleanup);
  
  it('the component "App" should render "div" element', () => {
    const { container } = render(<App />);
    const element = container.querySelector('div');
    expect(element).not.toBe(null);
  });
  
  describe('test getting data form localStorage', () => {   
    
    afterEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: oldLocalStorage,
        writable: true
      });
    });
    
    etalonData.forEach((etalonStr, idx) => {
      it(`the "input" should have value from localStorage (case${idx + 1})`, () => {
        let localStorageMock;
        
        if (idx > 0) {
          localStorageMock = {
            getItem: jest.fn(key => etalonStr),
          };
          global.localStorage = localStorageMock;
        };
        
        const { container } = render(<App />);
        const input = container.querySelector('input');    
        expect(input.value).toBe(etalonStr);
      });
    });
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
