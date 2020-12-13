import "./styles.css"

const resultInput = document.querySelector(".resultInput");
const displayInput = document.querySelector(".displayInput")
const table = document.querySelector("table");

let rightNum = '';
let leftNum = '';
let operatorChecker = false;
let equalChecker = false;
let operator = '';

function reset() {
    rightNum = '';
    leftNum = '';
    operator = '';
    operatorChecker = false;
    equalChecker = false;
    resultInput.value = '';
}

function calculate() {
    const result = eval(leftNum + operator + rightNum);
    resultInput.value = leftNum = result;
}

function handleClick(event) {
    const target = event.target;
    const innerValue = target.innerText;
    if(innerValue !== '' && innerValue.length === 1) {
        // C를 클릭함
        if(innerValue === 'C'){
            reset();
            displayInput.value = '';
        }
        // 숫자를 클릭함
        else if(!isNaN(innerValue)){
            if(equalChecker){
                reset();
                displayInput.value = '';
            }
            if(!operatorChecker) {
                leftNum = leftNum + innerValue;
                resultInput.value = leftNum;
            } else {
                rightNum = rightNum + innerValue;
                resultInput.value = rightNum;
            }
        }
        // operator를 클릭함
        else {
            if(leftNum ==='') {
                return;
            }
            if(innerValue === '='){
                if(rightNum ==='') {  
                    reset();
                    return;
                }
                displayInput.value = displayInput.value + rightNum + '=';
                calculate();
                equalChecker = true;
            } else {
                // 2 x 2 x 2 이런식도 결과를 내줘야함
                if(rightNum !=='') {
                    const result = eval(leftNum + operator + rightNum);
                    resultInput.value = leftNum = result;
                    operator = innerValue;
                    displayInput.value = displayInput.value + rightNum + operator;
                    rightNum = '';
                }
                operatorChecker = true;
                operator = innerValue;
                if (displayInput.value === '') displayInput.value = displayInput.value + leftNum + operator;
            }
            
        }
    }
}

function init() {
    table.addEventListener("click",handleClick);
}

init();

//https://codesandbox.io/s/day-11-12-solution-mwmoi