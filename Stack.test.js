import { Stack } from './Stack'

describe('Stack', () => {
	const createEmptyStack = () => {
		let stack;
		expect(() => {
			stack = new Stack();
		}).not.toThrowError();
		expect(stack.isEmpty()).toEqual(true);
		return stack;
	};

	const pushItemOnEmptyStack = (stack, item) => {
		expect(stack.isEmpty()).toEqual(true);
		stack.push(item);
		expect(stack.peek()).toBe(item);
		expect(stack.isEmpty()).toEqual(false);
	};

	const pushItemOnNonEmptyStack = (stack, item) => {
		expect(stack.isEmpty()).toEqual(false);
		stack.push(item);
		expect(stack.peek()).toBe(item);
		expect(stack.isEmpty()).toEqual(false);
	};

	const popItemOffNonEmptyStack = (stack) => {
		expect(stack.isEmpty()).toEqual(false);
		const top = stack.peek();
		const item = stack.pop();
		expect(top).toBe(item);
	};

	it('should create a new empty instance without errors', () => {
		createEmptyStack();
	});

	it('should push a new item on empty stack', () => {
		const item = 5;
		const stack = createEmptyStack();
		pushItemOnEmptyStack(stack, item);
	});

	it ('should push a new item on non-empty stack', () => {
		const item1 = 1, item2 = 2;
		const stack = createEmptyStack();
		pushItemOnEmptyStack(stack, item1);
		pushItemOnNonEmptyStack(stack, item2);
	});

	it('should pop top item off stack with one item', () => {
		const item = 5;
		const stack = createEmptyStack();
		pushItemOnEmptyStack(stack, item);
		popItemOffNonEmptyStack(stack);
		expect(stack.isEmpty()).toEqual(true);
	});

	it('should pop top item off stack with two items', () => {
		const item1 = 1, item2 = 2;
		const stack = createEmptyStack();
		pushItemOnEmptyStack(stack, item1);
		pushItemOnNonEmptyStack(stack, item2);
		popItemOffNonEmptyStack(stack);
		expect(stack.peek()).toBe(item1);
		expect(stack.isEmpty()).toEqual(false);
	});

	it('should throw an error when peeking at empty stack', () => {
		expect(() => {
			const stack = createEmptyStack();
			stack.peek();
		}).toThrowError();
	});

	it('should throw an error when popping from empty stack', () => {
		expect(() => {
			const stack = createEmptyStack();
			stack.pop();
		}).toThrowError();
	});
});
