funcInSrc = require('../out/file1');
funcInLib = require('../out/lib/file2');

describe('Test how babel transpiled files', () => {
	
	it('Files in root of the folder `src` should not be compiled by Babel', () => {
		expect(funcInSrc).not.toHaveProperty('prototype');
	})
	
	it('Files in the folder `src/lib` should be compiled into es5', () => {
		expect(funcInLib).toHaveProperty('prototype');
	})
})
