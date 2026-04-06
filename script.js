// Variables of buttons
const btnNumber = document.querySelectorAll(".number");
const btnOperator = document.querySelectorAll(".operator");
const btnDel = document.querySelector("#del");
const btnAc = document.querySelector("#ac");
const btnEqual = document.querySelector("#equal");

// Operation variables
let currentValue = "";
let previousValue = "";
let operator = null;

function operate (num1, num2, operator) {
    if (operator == "+"){
        return num1 + num2;
    } else if (operator == "-"){
        return num1 - num2;
    } else if (operator == "*"){
        return num1 * num2;
    } else if (operator == "/"){
        return num1 / num2;
    }
}

function handleNumberClick(btnValue) {
    
    // Checks if a number is float
    if (currentValue.includes(".") && btnValue == ".") return;

    currentValue += btnValue;
    console.log(currentValue);
}

function handleOperatorClick(btnValue) {
    // Checks if operator is not already defined
    if (operator == null) {
        operator = btnValue;

        // Change to second number of count
        previousValue = currentValue;
        currentValue = "";
    } else if (operator != null) {
        
        // Check if we should perform the calculation or just update the operator
        if (currentValue && previousValue) {
            btnEqual.click();

            operator = btnValue;

            previousValue = currentValue;
            currentValue = "";
        } else {
            operator = btnValue;
        }
    }
}

function handleEqualClick() {
    currentValue = operate(+previousValue, +currentValue, operator).toString();
    previousValue = "";
    operator = null;
}

function main() {
    
    btnNumber.forEach((btn) => {
        btn.addEventListener("click", () => {
            handleNumberClick(btn.textContent);
        });
    });

    btnOperator.forEach((btn) => {
        btn.addEventListener("click", () => {
            handleOperatorClick(btn.textContent);
        });
    });

    btnEqual.addEventListener("click", (btn) => {
        handleEqualClick(btn.textContent);
    });
}

main();

