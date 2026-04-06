// Variables of buttons
const btnNumber = document.querySelectorAll(".number");
const btnOperator = document.querySelectorAll(".operator");
const btnDel = document.querySelector("#del");
const btnAc = document.querySelector("#ac");
const btnEqual = document.querySelector("#equal");
const btnSpecial = document.querySelector("#special");

// Variables of Screen
const resultScreen = document.querySelector("#result");
const expressionScreen = document.querySelector("#expression");

// Operation variables
let currentValue = "";
let previousValue = "";
let operator = null;

function updateExpressionScreen(...valueScreen){
    expressionScreen.textContent = valueScreen.join(" ");
}

function updateResultScreen(valueScreen){
    resultScreen.textContent = valueScreen;
}

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
    // If "=" is present, it means the last operation finished — start a new expression
    if (expressionScreen.textContent.includes("=")) {
        currentValue = ""
        updateExpressionScreen(currentValue);
        updateResultScreen(currentValue);
    }
    
    // Checks if a number is float
    if (currentValue.includes(".") && btnValue == ".") return;

    currentValue += btnValue;
    updateResultScreen(currentValue);
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
    
    updateExpressionScreen(previousValue, operator)
}

function handleEqualClick() {
    // Validate the expression before calculating
    if (previousValue && currentValue) {
        updateExpressionScreen(previousValue, operator, currentValue, "=");

        currentValue = "" + operate(+previousValue, +currentValue, operator);

        updateResultScreen(currentValue);

        previousValue = "";
        operator = null;
    } else {
        alert("Enter the right expression");
    }
}

function handleAllClearClick() {
    currentValue = "";
    previousValue = "";
    operator = null;
    updateExpressionScreen(currentValue);
    updateResultScreen(currentValue);
}

function handleDelClick() {
    currentValue = currentValue.slice(0, -1);
    updateResultScreen(currentValue);
}

function handleSpecialClick(){
    currentValue = String(-Number(currentValue));
    
    updateResultScreen(currentValue);
}

function main() {
    
    // Button events 
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

    btnEqual.addEventListener("click", handleEqualClick);

    btnAc.addEventListener("click", handleAllClearClick);

    btnDel.addEventListener("click", handleDelClick);

    btnSpecial.addEventListener("click", handleSpecialClick);
}

main();

