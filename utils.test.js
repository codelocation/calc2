import { removeWhitespaces } from "./utils";

describe('removeWhitespaces', () => {
	it('should remove whitespaces from string', () => {
		expect(removeWhitespaces('')).toEqual('');
		expect(removeWhitespaces('   \t\n\t    ')).toEqual('');
		expect(removeWhitespaces('  1 + 2\n=3 \t ')).toEqual('1+2=3');
	});
});