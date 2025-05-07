const displayTop = document.querySelector(".display_upper");
const displayBottom = document.querySelector(".display_lower");
const clearAllButton = document.querySelector("#clear-all-btn");
const clearButton = document.querySelector("#clear-btn");
const percentButton = document.querySelector("#percent-btn");
const numberButtons = document.querySelectorAll(".number_btn");
const operatorButtons = document.querySelectorAll(".operator_btn");
const decimalButton = document.querySelector("#decimal-btn");
const equalsButton = document.querySelector("#equal-btn");

let equation = displayTop.textContent;
let operatorActive = false;
let operator = "";
let firstNumber = "";
let secondNumber = "";
let hasPercent = false;
let previousInput = "";

clearButton.addEventListener("click", () => {
  displayBottom.textContent = "0";
  operatorActive = false;
});

clearAllButton.addEventListener("click", () => {
  displayTop.textContent = "";
  displayBottom.textContent = "0";
  equation = "";
  operatorActive = false;
  operator = "";
  firstNumber = "";
  secondNumber = "";
  isPercent = false;
  previousInput = "";
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (displayBottom.textContent === "0" || 
      displayBottom.textContent === "Can't divide by 0" || 
      previousInput === "operator" ||
      previousInput === "equals") {
      displayBottom.textContent = button.textContent;
    } else {
      displayBottom.textContent += button.textContent;
    }
    previousInput = "number";
  });
});

decimalButton.addEventListener("click", () => {
  if (displayBottom.textContent.indexOf(".") === -1) {
    if (displayBottom.textContent === "0" || displayBottom.textContent === "Can't divide by 0") {
      displayBottom.textContent = "0.";
      } else {
        displayBottom.textContent += ".";
      }
      previousInput = "decimal";
      return;
  }
  });

percentButton.addEventListener("click", () => {
  if (displayBottom.textContent.indexOf("%") === -1) {
    displayBottom.textContent += "%";
    previousInput = "percent";
    return;
  }
})

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operatorActive === true) {
      console.log("operator active");
      if (firstNumber === "") {
        console.log(firstNumber);
      } else if (button.textContent === operator) {
        secondNumber = displayBottom.textContent;
        console.log(firstNumber, secondNumber);
        displayBottom.textContent = operate(operator, firstNumber, secondNumber);
        if (displayBottom.textContent === "Can't divide by 0") {
          displayTop.textContent = "Error"; 
          console.log("added second number", secondNumber);
          operatorActive = false;
          return;
        } else {
          displayTop.textContent = displayBottom.textContent + "  " + button.textContent;
        }
        firstNumber = displayBottom.textContent;
        secondNumber = "";
        isPercent = false;
      }
      operator = button.textContent;
      displayTop.textContent = displayTop.textContent.slice(0, -2) + button.textContent + " ";
    } else {
      if (displayBottom.textContent === "Can't divide by 0") {
        displayBottom.textContent = "0";
        displayTop.textContent = "";
      }
      displayTop.textContent += displayBottom.textContent + " " + button.textContent + " ";
      firstNumber = displayBottom.textContent;
      operatorActive = true;
      operator = button.textContent;
    }
    previousInput = "operator";
  });
});

equalsButton.addEventListener("click", () => {
  firstNumber = displayTop.textContent.slice(0, -2);
  secondNumber = displayBottom.textContent;
  displayBottom.textContent = operate(operator, firstNumber, secondNumber);
  if (displayBottom.textContent === "Can't divide by 0") {
    displayTop.textContent = "Error"; 
    return;
  } else {
    displayTop.textContent = displayBottom.textContent + "  " + operator;
  }
  firstNumber = displayBottom.textContent;
  secondNumber = "";
  previousInput = "equals";
})

const operate = (operator, firstNumber, secondNumber) => {
  let result;
  const roundResult = (num) => Math.round(num * 1e10) / 1e10; // 10 decimal places so no floating point nonsense
  if (firstNumber.includes("%") && secondNumber.includes("%")) {
    firstNumber = firstNumber.replace("%", "");
    firstNumber = firstNumber / 100;
    secondNumber = secondNumber.replace("%", "");
    secondNumber = secondNumber / 100;
    hasPercent = true;
  } else if (secondNumber.includes("%")) {
    secondNumber = secondNumber.replace("%", "");
    secondNumber = secondNumber / 100;
    secondNumber = roundResult(parseFloat(firstNumber) * parseFloat(secondNumber));
  } else if (firstNumber.includes("%")) {
    firstNumber = firstNumber.replace("%", "");
    firstNumber = firstNumber / 100;
  }
  switch (operator) {
    case "+":
      hasPercent ? result = roundResult(parseFloat(firstNumber * 100) + parseFloat(secondNumber * 100)) + "%" : result =  roundResult(parseFloat(firstNumber) + parseFloat(secondNumber));
      return result;
    case "-":
      hasPercent ? result = roundResult(parseFloat(firstNumber * 100) - parseFloat(secondNumber * 100)) + "%" : result = roundResult(parseFloat(firstNumber) - parseFloat(secondNumber));
      return result;
    case "×":
      hasPercent ? result = roundResult(parseFloat(firstNumber * 100) * parseFloat(secondNumber * 100)) : result = roundResult(parseFloat(firstNumber) * parseFloat(secondNumber));
      return result;
    case "÷":
      if (secondNumber === "0") {
        alert("yeah, you're a funny guy");
        return "Can't divide by 0";
      } else {
        hasPercent ? result = roundResult(parseFloat(firstNumber * 100) / parseFloat(secondNumber * 100)) : result = roundResult(parseFloat(firstNumber) / parseFloat(secondNumber));
        return result;
      }
  }
};
