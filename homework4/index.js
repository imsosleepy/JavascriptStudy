//import "./style.css"

const display = document.querySelector(".display");
const table = document.querySelector("table");

let rightNum = '';
let leftNum = '';
let operatorChecker = false;
let equalChecker = false;
let operator = '';

function reset() {
    rightNum = '';
    leftNum = '';
    operatorChecker = false;
    equalChecker = false;
    display.value = '';
}


function handleClick(event) {
    const innerValue = event.target.innerText;
    if(innerValue !== '' && innerValue.length === 1) {
        if(innerValue === 'C'){
            reset();
        }
        // 숫자가 들어옴
        else if(!isNaN(innerValue)){
            if(equalChecker){
                reset();
            }
            if(!operatorChecker) {
                leftNum = leftNum + innerValue;
                display.value = leftNum;
            } else {
                rightNum = rightNum + innerValue;
                display.value = rightNum;
            }
        }
        // operater가 들어옴 
        else {
            if(innerValue === '='){
                const result = leftNum + operator + rightNum;
                reset();
                display.value = eval(result);
                leftNum = eval(result);
                equalChecker = true;
            } else {
                operatorChecker = true;
                operator = innerValue;
            }
            
        }
    }
}

function init() {
    table.addEventListener("click",handleClick);
}

init();

