const buttons = document.querySelectorAll('.grid-container2 div');
const display = document.querySelector('#display');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (value === 'C') {
            currentInput = '';
            updateDisplay('0');
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            }
        } else if (value === '=') {
            if (currentInput && previousInput && operator) {
                const result = calculate(Number(previousInput), Number(currentInput), operator);
                updateDisplay(result);
                currentInput = result.toString();
                previousInput = '';
                operator = '';
            }
        } else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

function updateDisplay(value) {
    display.value = value;
}

function calculate(num1, num2, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : 'Error';
        case '%': return num1 % num2;
        default: return num2;
    }
}
