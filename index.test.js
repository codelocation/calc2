import {
	convertInfix2Array, 
	convertInfix2RPN,
	readNextNumber,
	evaluateRPN,
	evaluateInfix
} from './index';

describe('readNextNumber', () => {
	it('should read number for valid input', () => {
		expect(readNextNumber('0', 0)).toEqual({ number: 0, end: 1 });
		expect(readNextNumber('123', 0)).toEqual({ number: 123, end: 3 });
		expect(readNextNumber('1+2', 0)).toEqual({number: 1, end: 1});
		expect(readNextNumber('1+2', 2)).toEqual({number: 2, end: 3});
		expect(readNextNumber('-1', 0)).toEqual({number: -1, end: 2});
		expect(readNextNumber('-1*2', 0)).toEqual({number: -1, end: 2});
		expect(readNextNumber('-1*2', 3)).toEqual({number: 2, end: 4});
		expect(readNextNumber('-1*-2', 3)).toEqual({number: -2, end: 5});
		expect(readNextNumber('-1-3', 0)).toEqual({number: -1, end: 2});
		expect(readNextNumber('-1-3', 2)).toEqual({number: -3, end: 4});
	});

	it('should throw error for invalid input', () => {
		expect(() => {
			readNextNumber('', 0);
		}).toThrowError();
		expect(() => {
			readNextNumber('-', 0);
		}).toThrowError();
		expect(() => {
			readNextNumber('*', 0);
		}).toThrowError();
		expect(() => {
			readNextNumber('*1', 0);
		}).toThrowError();
		expect(() => {
			readNextNumber('1+', 1);
		}).toThrowError();
		expect(() => {
			readNextNumber('1-', 1);
		}).toThrowError();
		expect(() => {
			readNextNumber('1-*3', 1);
		}).toThrowError();
		expect(() => {
			readNextNumber('1-*3', 2);
		}).toThrowError();
		expect(() => {
			readNextNumber('1---3', 1);
		}).toThrowError();
		expect(() => {
			readNextNumber('1---3', 2);
		}).toThrowError();
	});
});

describe('convertInfix2Array', () => {
	it('should convert string to array for valid input', () => {
		expect(convertInfix2Array('0')).toEqual([0]);
		expect(convertInfix2Array('1')).toEqual([1]);
		expect(convertInfix2Array('-1')).toEqual([-1]);
		expect(convertInfix2Array('-1+2')).toEqual([-1, '+', 2]);
		expect(convertInfix2Array('-1-2')).toEqual([-1, '-', 2]);
		expect(convertInfix2Array('-1--2')).toEqual([-1, '-', -2]);
		expect(convertInfix2Array('-1+2*3/-4')).toEqual([-1, '+', 2, '*', 3, '/', -4]);
	});

	it('should throw error for invalid input', () => {
		expect(() => {
			convertInfix2Array('*1');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('-');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('*');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('1++');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('--1');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('1++-2');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('1-6*-2--');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('1+*2');
		}).toThrowError();
		expect(() => {
			convertInfix2Array('1+');
		}).toThrowError();
	});
});

describe('convertInfix2RPN', () => {
	it('should convert infix to RPN for valid input', () => {
		expect(convertInfix2RPN([])).toEqual([]);
		expect(convertInfix2RPN([1])).toEqual([1]);
		expect(convertInfix2RPN([1, '+', 2])).toEqual([1, 2, '+']);
		expect(convertInfix2RPN([1, '-', -2, '+', 3])).toEqual([1, -2, '-', 3, '+']);
		expect(convertInfix2RPN([0, '-', 2])).toEqual([0, 2, '-']);
		expect(convertInfix2RPN([1, '+', 2, '*', 6, '-', 3, '/', 3])).toEqual([1, 2, 6, '*', '+', 3, 3, '/', '-']);
		expect(convertInfix2RPN(['(', 1, ')'])).toEqual([1]);
		expect(convertInfix2RPN(['(', 1, '+', 2,')', '*', 3])).toEqual([1, 2, '+', 3, '*']);
		expect(convertInfix2RPN(['(', 1, '/', '(', 3, '-', '(', '(', -5, ')', ')', ')', ')'])).toEqual([1, 3, -5, '-', '/']);
	});

	it('should throw error for invalid input', () => {
		expect(() => {
			convertInfix2RPN(['(']);
		}).toThrowError();
		expect(() => {
			convertInfix2RPN([')']);
		}).toThrowError();
		expect(() => {
			convertInfix2RPN([1, '+', 2, '-', 3, '(']);
		}).toThrowError();
		expect(() => {
			convertInfix2RPN([1, '*', ')', 2]);
		}).toThrowError();
	});
});

describe('evaluateRPN', () => {
	it('should evaluate RPN expression for valid input', () => {
		expect(evaluateRPN([])).toEqual(0);
		expect(evaluateRPN([1])).toEqual(1);
		expect(evaluateRPN([1, 3, 2, 5, '*', "-", '+'])).toEqual(-6);
		expect(evaluateRPN([3, 6, 3, 2, '-', '*', 1, '+', '+'])).toEqual(10);
		expect(evaluateRPN([2, 15, 5, '/', '/'])).toEqual(2 / 3);
	});

	it('should throw error for invalid input', () => {
		expect(() => {
			evaluateRPN([1, 3]);
		}).toThrowError();
		expect(() => {
			evaluateRPN(['+']);
		}).toThrowError();
		expect(() => {
			evaluateRPN([1, 2, '+', 3, '+', 4]);
		}).toThrowError();
	});
});

describe('evaluateInfix', () => {
	it('should evaluate infix expression for valid input', () => {
		expect(evaluateInfix('')).toEqual(0);
		expect(evaluateInfix('1')).toEqual(1);
		expect(evaluateInfix('123')).toEqual(123);
		expect(evaluateInfix('-1234')).toEqual(-1234);
		expect(evaluateInfix('3+4   5-2')).toEqual(46);
		expect(evaluateInfix('\t 2-3*9')).toEqual(-25);
		expect(evaluateInfix('-9/-9\n--2+10')).toEqual(13);
	});

	it('should throw error for invalid input', () => {
		expect(() => {
			evaluateInfix('+');
		}).toThrowError();
		expect(() => {
			evaluateInfix('+02');
		}).toThrowError();
		expect(() => {
			evaluateInfix('33-');
		}).toThrowError();
		expect(() => {
			evaluateInfix('3*990---2');
		}).toThrowError();
		expect(() => {
			evaluateInfix('+--/');
		}).toThrowError();
	});
})
