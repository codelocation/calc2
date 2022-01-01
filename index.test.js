import { convertInfix2Array, readNextNumber } from './index';

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
			convertInfix2Array('');
		}).toThrowError();
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
	})
});
