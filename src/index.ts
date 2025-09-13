console.log('Hello calc');

// Digits and operations
const digits: string[] = [
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
const mathOperations: string[] = ['+', '-', '*', '/'];
const calcFunctions: string[] = ['Enter', 'Escape', 'Backspace'];

// Help variables
const inputLine = document.getElementById('input')!;
const ansLine = document.getElementById('ans')!;
const pendingOperationDisplay = document.getElementById('pending')!;
let pendingOperation: string | undefined = undefined;

document.addEventListener('keydown', (event) => {
    keyDown(event.key);
});

function keyDown(kDown: string) {
    // Digit input
    if (digits.includes(kDown)) {
        if (inputLine.textContent.includes('.') && kDown === '.') {
            console.warn('Attempt to add a second period');
        } else appendDigit(kDown);
    } else if (calcFunctions.includes(kDown)) {
        performOperation(kDown);
    } else if (mathOperations.includes(kDown)) {
        if (pendingOperation) {
            doMath(pendingOperation);
        } else {
            if (Number(ansLine.textContent) != 0) {
                doMath(kDown);
            } else {
                sendToAns(kDown);
            }
        }
    } else if (kDown === 'Alt') {
        invertInput();
    } else {
        console.log(`Ignoring ${kDown}`);
    }
}

function appendDigit(digit: string) {
    let displayText = inputLine.textContent + digit;
    const incomplete = !displayText.endsWith('.');
    inputLine.textContent = incomplete
        ? String(Number(displayText))
        : String(Number(displayText) + '.');
}
function removeLastDigit() {
    let newInput = inputLine.textContent.slice(0, -1);
    if (newInput === '-') {
        newInput = '0';
    }
    console.log(newInput);
    inputLine.textContent = String(Number(newInput));
}

function performOperation(operation: string) {
    console.log(`Performing operation: ${operation}`);

    switch (operation) {
        case 'Escape':
            clearAns();
            clearLine();
            break;
        case 'Enter':
            if (pendingOperation) {
                doMath(pendingOperation);
            } else {
                console.log(`Nothing to do`);
            }
            break;
        case 'Backspace':
            removeLastDigit();
            break;
        default:
            console.log(`Something strange just happen`);
    }
}

function doMath(operation: string) {
    console.log(`Doing math`);
    const firstNumber = Number(ansLine.textContent);
    const secondNumber = Number(inputLine.textContent);

    switch (operation) {
        case '+':
            const sum = firstNumber + secondNumber;
            const sumText = `${firstNumber} + ${secondNumber} = ${sum}`;
            console.log(sumText);
            updateResults(sum);
            updatePending(sumText, false);
            break;
        case '-':
            const notSum = firstNumber - secondNumber;
            const notSumText = `${firstNumber} - ${secondNumber} = ${notSum}`;
            console.log(notSumText);
            updateResults(notSum);
            updatePending(notSumText, false);
            break;
        case '*':
            const times = firstNumber * secondNumber;
            const timesText = `${firstNumber} × ${secondNumber} = ${times}`;
            console.log(timesText);
            updateResults(times);
            updatePending(timesText, false);
            break;
        case '/':
            if (secondNumber === 0) {
                console.warn(`Attempt to divide by zero`);
            } else {
                const notTimes = firstNumber / secondNumber;
                const notTimesText = `${firstNumber} ÷ ${secondNumber} = ${notTimes}`;
                console.log(notTimesText);
                updateResults(notTimes);
                updatePending(notTimesText, false);
            }
            break;
        default:
            clearAns();
            clearLine();
            console.error(`Something strange just happen`);
            break;
    }
}

function updateResults(result: Number) {
    clearAns();
    clearLine();
    inputLine.textContent = String(result);
}

function clearLine() {
    inputLine.textContent = '0';
}
function clearAns() {
    ansLine.textContent = '';
    updatePending(undefined);
}
function sendToAns(operation: string) {
    ansLine.textContent = inputLine.textContent;
    updatePending(operation);
    clearLine();
}

function updatePending(operation: string | undefined, hard = true) {
    if (hard) {
        pendingOperation = operation;
    }
    if (operation === undefined) {
        pendingOperationDisplay.textContent = '';
    } else {
        switch (operation) {
            case '+':
                pendingOperationDisplay.textContent = '+';
                break;
            case '-':
                pendingOperationDisplay.textContent = '-';
                break;
            case '*':
                pendingOperationDisplay.textContent = '×';
                break;
            case '/':
                pendingOperationDisplay.textContent = '÷';
                break;
            default:
                pendingOperationDisplay.textContent = operation;
                break;
        }
    }
}

const clearBtn = document.getElementById('clear')!;
const invertBtn = document.getElementById('invert')!;
// const clearBtn = document.getElementById('clear')!;
const divideBtn = document.getElementById('divide')!;
const timesBtn = document.getElementById('times')!;
const minusBtn = document.getElementById('minus')!;
const plusBtn = document.getElementById('plus')!;
const equalBtn = document.getElementById('equals')!;
const backspaceBtn = document.getElementById('backspace')!;
const periodBtn = document.getElementById('period')!;
const zeroBtn = document.getElementById('zero')!;
const oneBtn = document.getElementById('one')!;
const twoBtn = document.getElementById('two')!;
const threeBtn = document.getElementById('three')!;
const fourBtn = document.getElementById('four')!;
const fiveBtn = document.getElementById('five')!;
const sixBtn = document.getElementById('six')!;
const sevenBtn = document.getElementById('seven')!;
const eightBtn = document.getElementById('eight')!;
const nightBtn = document.getElementById('nine')!;

clearBtn.addEventListener('click', () => {
    console.log(`clicked`);

    keyDown('Escape');
});
invertBtn.addEventListener('click', () => {
    keyDown('Alt');
});
// clear.addEventListener('click', () => {
//     keyDown('Escape');
// });
divideBtn.addEventListener('click', () => {
    keyDown('/');
});
timesBtn.addEventListener('click', () => {
    keyDown('*');
});
minusBtn.addEventListener('click', () => {
    keyDown('-');
});
plusBtn.addEventListener('click', () => {
    keyDown('+');
});
equalBtn.addEventListener('click', () => {
    keyDown('Enter');
});
periodBtn.addEventListener('click', () => {
    keyDown('.');
});
backspaceBtn.addEventListener('click', () => {
    keyDown('Backspace');
});
zeroBtn.addEventListener('click', () => {
    keyDown('0');
});
oneBtn.addEventListener('click', () => {
    keyDown('1');
});
twoBtn.addEventListener('click', () => {
    keyDown('2');
});
threeBtn.addEventListener('click', () => {
    keyDown('3');
});
fourBtn.addEventListener('click', () => {
    keyDown('4');
});
fiveBtn.addEventListener('click', () => {
    keyDown('5');
});
sixBtn.addEventListener('click', () => {
    keyDown('6');
});
sevenBtn.addEventListener('click', () => {
    keyDown('7');
});
eightBtn.addEventListener('click', () => {
    keyDown('8');
});
nightBtn.addEventListener('click', () => {
    keyDown('9');
});

function invertInput() {
    inputLine.textContent = String(Number(inputLine.textContent) * -1);
}
