const fs = require('fs');
const main_file = './dist/main.js';

eval(fs.readFileSync(main_file, 'utf8'));

describe('Test how output file was built', () => {
	
	it('the file1.ts should be included into build', () => {
		expect(typeof f1 === 'undefined').toBeFalsy();
	})
	
	it('the file2.ts should be included into compilation', () => {
		expect(typeof f2 === 'undefined').toBeFalsy();
	})
	
	it('files from the folder `src` should be included into compilation', () => {
		expect(typeof include1 === 'undefined').toBeFalsy();
	})
	
	it('files from subfolders of the folder `src` should be included into compilation', () => {
		expect(typeof include2 === 'undefined').toBeFalsy();
	})
	
	it('files with the .test.ts at the end of their names should not be included into compilation', () => {
		expect(typeof include1_test === 'undefined').toBeTruthy();
	})
})