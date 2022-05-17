import React from 'react';
import { cleanup, render } from '@testing-library/react';

import App from '../App';

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
];

describe('Test suite for item `keys`:', () => {
	
	let consoleOut = '';
	const spy = jest.spyOn(console, 'error').mockImplementation(
		out => consoleOut = `${consoleOut}\n${out}`
	);
	const { container } = render(<App />);
	const elementsList = container.querySelectorAll('li');
	spy.mockRestore();
	spy.mockClear();

	afterEach(cleanup);
	
	it('keys should be unique', () => {	
	  expect(consoleOut).not.toContain('two children with the same key');
	});
	
	it('data should be rendered as a list `li`', () => {
	  expect(elementsList.length).not.toBe(0);
	});

	it('data in the list should be given as input, not changed', () => {
	  const appList = Array.from(elementsList).map(el => el.textContent.trim());
	  expect([...appList].sort()).toEqual([...etalonList].sort());
	});
});
