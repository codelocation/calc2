import { Stack } from "./Stack.js";
import { removeWhitespaces } from "./utils.js";

const DIGITS = '0123456789';
const OPERATORS = {
	'+': {
		priority: 1,
		apply: (a, b) => a + b,
	},
	'-': {
		priority: 1,
		apply: (a, b) => a - b,
	},
	'*': {
		priority: 2,
		apply: (a, b) => a * b,
	},
	'/': {
		priority: 2,
		apply: (a, b) => a / b,
	},
};

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
	infix = removeWhitespaces(infix);
	if (infix.length === 0) {
		return [];
	}
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

// Dijkstra's shunting-yard algorithm
export const convertInfix2RPN = (infix) => {
	const rpn = [];
	const stack = new Stack();

	for (const token of infix) {
		if (typeof token === 'number') {
			rpn.push(token);
		} else if (token in OPERATORS) {
			while (!stack.isEmpty()) {
				const top = stack.peek();
				if (!(top in OPERATORS) || OPERATORS[top].priority < OPERATORS[token].priority) {
					break;
				}
				rpn.push(top);
				stack.pop();
			}
			stack.push(token);
		} else if (token === '(') {
			stack.push(token);
		} else if (token === ')') {
			while (!stack.isEmpty()) {
				let top = stack.peek();
				if (top === '(') {
					break;
				}
				rpn.push(top);
				stack.pop();
			}
			if (stack.isEmpty()) {
				throw new Error('opening parenthesis expected');
			}
			stack.pop();
		}
	}

	while (!stack.isEmpty()) {
		const top = stack.pop();
		if (top === '(') {
			throw new Error('closing parenthesis expected');
		}
		rpn.push(top);
	}

	return rpn;
};

export const evaluateRPN = (rpn) => {
	if (rpn.length === 0) {
		return 0;
	}
	const stack = new Stack();
	for (const token of rpn) {
		if (!(token in OPERATORS)) {
			stack.push(token);
		} else {
			const rightOp = stack.pop();
			const leftOp = stack.pop();
			const result = OPERATORS[token].apply(leftOp, rightOp);
			stack.push(result);
		}
	}
	const result = stack.pop();
	if (!stack.isEmpty()) {
		throw new Error('failed to compute RPN expression');
	}
	return result;
};

export const evaluateInfix = (infix) => {
	return evaluateRPN(
		convertInfix2RPN(
			convertInfix2Array(infix)
		)
	);
};
