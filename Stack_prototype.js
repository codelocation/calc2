function Stack() {
	if (!new.target) {
		throw new Error('Stack is a constructor');
	}
	this.items = [];
}

Stack.prototype.push = function(item) {
	this.items.push(item);
};

Stack.prototype.pop = function() {
	if (this.items.length === 0) {
		throw new Error('stack is empty');
	}
	return this.items.pop();
};

Stack.prototype.peek = function() {
	if (this.items.length === 0) {
		throw new Error('stack is empty');
	}
	return this.items[this.items.length - 1];
};

Stack.prototype.isEmpty = function() {
	return this.items.length === 0;
};
