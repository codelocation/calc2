import { evaluateInfix } from "./evaluateInfix.js";

const button = document.querySelector('#evaluate-button');

button.addEventListener('click', () => {
	try {
		const input = document.querySelector('#input-expression');
		const value = evaluateInfix(input.value);
		const result = document.querySelector('#result');
		result.textContent = value;
	} catch (err) {
		const result = document.querySelector('#result');
		result.textContent = err.toString();
	}
});
