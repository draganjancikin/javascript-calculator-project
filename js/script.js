// define curent total
let runungTotal = 0;

// define curent buffer, is string not number
let buffer = "0";

// define previus operator
let previousOperator;

// grab the screen
const screen = document.querySelector(".screen");

// what hepends when user click on the buttons
function buttonClick (value) {
  // check if value is number than handle number,  if value is symbol than handle symbol
  if (isNaN(value)) {
    // handle symbol
    handleSymbol(value);
  } else {
    // handle number
    handleNumber(value);
  }
  // displaying buffer
  screen.innerText = buffer;
}

// function that handle symbols
function handleSymbol (symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runungTotal = 0;
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
    case "=":
      handleEquals(symbol);
      break;
    case "←":
      handleBack(symbol);
      break;
  } 

}

function handleBack (symbol) {
  
  if (buffer.length === 1) {
    buffer = "0";
  } else {
   
    if (typeof buffer === "number") {
      let strBuffer = buffer.toString();
      buffer = strBuffer.substring(0, strBuffer.length - 1);  
    } else {
      buffer = buffer.substring(0, buffer.length - 1);
    }
      
  }
    
}

function handleEquals (symbol) {
  if (previousOperator === null) {
    return;
  }
  
  flushOperation(parseInt(buffer));
  previousOperator = null;
  buffer = runungTotal;
  runungTotal = 0;
}



// function that handle math
function handleMath (symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  
  // convert buffer to number
    // version one
    // const intBuffer = parseInt(buffer);
    // version two
    const intBuffer = +buffer;


  if (runungTotal === 0) {
    runungTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = "0";
}

function flushOperation (intBuffer) {
  
  if (previousOperator === "+") {
    runungTotal += intBuffer;
  } else if (previousOperator === "−") {
    runungTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runungTotal *= intBuffer;
  }  else if (previousOperator === "÷") {
    runungTotal /= intBuffer;
  }
  return runungTotal;
}

// function that handle numbers
function handleNumber (numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

// init function, the function called once and set everything
function init () {
  // set the screen with value of buffer
  screen.innerText = buffer;
  // 1. setup event listeners
  //  - select buttons in div with class "calc-buttons"
  document.querySelector(".calc-buttons")
    // add event listener for "click" event
    .addEventListener("click", function (event) {
      // call function buttonClick when event happens
      buttonClick(event.target.innerText);
    });

}

init();

