"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Hello calc');
document.addEventListener('keydown', (event) => {
    // Digit input
    if (digits.includes(event.key)) {
        if (inputLine.textContent.includes('.') && event.key === '.') {
            console.warn('Attempt to add a second period');
        }
        else
            appendDigit(event.key);
    }
    else if (calcFunctions.includes(event.key)) {
        performOperation(event.key);
    }
    else if (mathOperations.includes(event.key)) {
        if (pendingOperation) {
            doMath(pendingOperation);
        }
        else {
            if (Number(ansLine.textContent) != 0) {
                doMath(event.key);
            }
            else {
                sendToAns(event.key);
            }
        }
    }
    else {
        console.log(`Ignoring ${event.key}`);
    }
});
// Digits and operations
const digits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
];
const mathOperations = ['+', '-', '*', '/'];
const calcFunctions = ['Enter', 'Escape'];
// Help variables
const inputLine = document.getElementById('input');
const ansLine = document.getElementById('ans');
let pendingOperation = undefined;
function appendDigit(digit) {
    let displayText = inputLine.textContent + digit;
    const incomplete = !displayText.endsWith('.');
    inputLine.textContent = incomplete
        ? String(Number(displayText))
        : String(Number(displayText) + '.');
}
function performOperation(operation) {
    switch (operation) {
        case 'Escape':
            clearAns();
            clearLine();
            break;
        case 'Enter':
            // Enter perform the pending operation
            // Or sends the input to the ans
            if (pendingOperation) {
                doMath(pendingOperation);
            }
            else {
                console.log(`Nothing to do`);
            }
            break;
        default:
            console.log(`Something strange just happen`);
    }
}
function doMath(operation) {
    console.log(`Doing math`);
    const firstNumber = Number(ansLine.textContent);
    const secondNumber = Number(inputLine.textContent);
    clearAns();
    clearLine();
    switch (operation) {
        case '+':
            updateResults(firstNumber + secondNumber);
            break;
        case '-':
            updateResults(firstNumber - secondNumber);
            break;
        case '*':
            updateResults(firstNumber * secondNumber);
            break;
        case '/':
            updateResults(firstNumber / secondNumber);
            break;
        default:
            console.error(`Something strange just happen`);
            break;
    }
}
function updateResults(result) {
    inputLine.textContent = String(result);
}
function clearLine() {
    inputLine.textContent = '';
}
function clearAns() {
    ansLine.textContent = '';
    pendingOperation = undefined;
}
function sendToAns(operation) {
    ansLine.textContent = inputLine.textContent;
    pendingOperation = operation;
    clearLine();
}
//# sourceMappingURL=index.js.map