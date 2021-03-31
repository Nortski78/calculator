let clear = false;
let operator = null;
let firstOperand = null;
let secondOperand = null;

function add(num1, num2){
    let result = Number.parseFloat(num1 + num2).toFixed(4).replace(/(\.0+|0+)$/, '');

    if(result % 1 == 0){
        return Math.trunc(result);
    }
    else{
        return result;
    }
}

function subtract(num1, num2){
    let result = Number.parseFloat(num1 - num2).toFixed(4).replace(/(\.0+|0+)$/, '');

    if(result % 1 == 0){
        return Math.trunc(result);
    }
    else{
        return result;
    }
}

function multiply(num1, num2){
    let result = Number.parseFloat(num1 * num2).toFixed(4).replace(/(\.0+|0+)$/, '');

    if(result % 1 == 0){
        return Math.trunc(result);
    }
    else{
        return result;
    }
}

function divide(num1, num2){
    let result = Number.parseFloat(num1 / num2).toFixed(4).replace(/(\.0+|0+)$/, '');

    if(result % 1 == 0){
        return Math.trunc(result);
    }
    else{
        return result;
    }
}

function operate(operator, num1, num2){

    switch(operator){
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}

function clearDisplay(){
    mainDisplay.textContent = "";
}

function updateDisplay(digit){

    if(digit === "ArrowUp" || digit === "ArrowDown" || digit === "ArrowRight" || digit === "ArrowLeft" || 
        digit === "Home" || digit === "PageUp" || digit === "PageDown" || digit === "End" || digit === "Insert" || 
        digit === "Unidentified"){ return; }

    if(!isFinite(digit && digit != ".")){
        mainDisplay.textContent = "OOPS";
    }
    else{
        if(clear === true){
            clearDisplay();
            clear = false;
        }

        if(mainDisplay.textContent == 0){
            mainDisplay.textContent = "";
            mainDisplay.textContent = "" + mainDisplay.textContent + digit;
        }
        else{
            mainDisplay.textContent = "" + mainDisplay.textContent + digit;
        }
    }
}

function displayValue(digit){
    updateDisplay(digit);
}

function setOperator(digit){
    
    if(digit != "="){
        operator = digit;
    }
}

function getDisplayValue(){
    return parseFloat(mainDisplay.textContent);
}

function setOperand(operand){

    operand = parseFloat(operand);
    console.log(operand);

    if(firstOperand === null) { firstOperand = operand; }
    else { 
        secondOperand = operand;
        clear = true;
        updateDisplay(operate(operator, firstOperand, secondOperand));
        firstOperand = getDisplayValue();
    }

    console.log("First Operand: " + firstOperand + " Second Operand: " + secondOperand);
}

function processKeyPress(digit){

    switch(digit){
        case "Delete":
            resetDisplay();
            break;
        case "Backspace":
            deleteDigit();
            break;
        case "Enter":
            setOperand(getDisplayValue());
            operate(operator, firstOperand, secondOperand);
            clear = true;
            break;
        case "+":
            setOperand(getDisplayValue());
            setOperator("+");        
            clear = true;
            break;
        case "-":
            setOperand(getDisplayValue());
            setOperator("-");        
            clear = true;
            break;
        case "*":
            setOperand(getDisplayValue());
            setOperator("*");        
            clear = true;
            break;
        case "/":
            setOperand(getDisplayValue());
            setOperator("/");        
            clear = true;
            break;
        default:
            updateDisplay(digit);
    }
}

function resetDisplay(){
    firstOperand = null;
    secondOperand = null;
    operator = null;
    mainDisplay.textContent = 0;
}

function deleteDigit(){
    const currentDisplayValue = getDisplayValue();

    let updatedDisplayValue = currentDisplayValue.toString();

    updatedDisplayValue = updatedDisplayValue.split("");

    if(updatedDisplayValue.length === 1){
        updatedDisplayValue[0] = 0;
        clear = true;
        updateDisplay(updatedDisplayValue[0]);
    }
    else{
        updatedDisplayValue.pop();
        updatedDisplayValue = updatedDisplayValue.join("");
        clear = true;
        updateDisplay(updatedDisplayValue);
    }
}

const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const mainDisplay = document.querySelector('#display-main');
const topDisplay = document.querySelector('#display-top');
const btnEquals = document.querySelector('#btn-equals');
const btnClear = document.querySelector('#btn-clear');
const btnDot = document.querySelector('#btn-dot');
const btnDelete = document.querySelector('#btn-delete');

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener('click', (event) => {
        displayValue(event.target.textContent);
    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (event) => {
        setOperand(getDisplayValue());
        setOperator(event.target.textContent);        
        clear = true;
    })
})

btnEquals.addEventListener('click', (event) => {
    setOperand(getDisplayValue());
    operate(operator, firstOperand, secondOperand);
    clear = true;
})

btnClear.addEventListener('click', (event) => resetDisplay());

btnDot.addEventListener('click', (event) => {
    if(getDisplayValue() == 0){
        return;
    }
    else{
        displayValue(event.target.textContent);
    }
})

btnDelete.addEventListener('click', (event) => {
    deleteDigit();
})

window.addEventListener('keydown', (event) => {
    const digit = document.querySelector(`button[data-key="${event.code}"]`);
    if(digit === null){ return }
    else {
        processKeyPress(event.key);
    }
})

window.addEventListener('keydown', (event) => {
    const digit = document.querySelector(`button[data-key2="${event.code}"]`);
    if(digit === null){ return }
    else {
        processKeyPress(event.key);
    }
})
