/**
 * Reads the next number in input starting from index start. Returns the end index and the parsed number.
 * @param {*} input 
 * @param {*} start 
 */
const DIGITS = '0123456789';
export const readNextNumber = (input, start) => {
	let end = start;
	if (start >= input.length) {
		throw new Error('unexpected end of expression');
	}
	if (input[start] !== '-' && !DIGITS.includes(input[start])) {
		throw new Error(`unexpected character ${input[start]} at index ${start}`); 
	} 
	if (input[start] === '-') end++;
	while (end < input.length && DIGITS.includes(input[end])) {
		end++;
	}
	const numberStr = input.substring(start, end);
	const number = Number(numberStr);
	if (numberStr.length === 0 || Number.isNaN(number)) {
		throw new Error(`expected a number at index ${start}`);
	}
	return {
		number,
		end
	};
};

export const convertInfix2Array = (infix) => {
	const arr = [];
	let start = 0;
	let result;
	do {
		result = readNextNumber(infix, start);
		arr.push(result.number);
		start = result.end;
		if (result.end < infix.length) {
			arr.push(infix[start]);
			start++;
		}
	} while (result.end < infix.length);
	return arr;
};

// console.log(convertInfix2Array('0')); // [0]
// console.log(convertInfix2Array('123')); // [123]
// console.log(convertInfix2Array('1+2')); // [1,'+',2]
// console.log(convertInfix2Array('-1')); // [-1]
// console.log(convertInfix2Array('-1+2')); // [-1, +, 2]
// console.log(convertInfix2Array('-1+-2+3')); // [-1, +, -2, +, 3]
// console.log(convertInfix2Array('-1-3')); // [-1, -, 3]
// console.log(convertInfix2Array('-1*-2+5-1324/890-4'));
// console.log(convertInfix2Array('1*+2+3'));
// 1-

// const computeInfixExpr = (expr) => {

// };
