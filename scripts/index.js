//Declaration of variables
let numButtons = document.querySelectorAll('.num');
let opButtons = document.querySelectorAll('.op');
let display = document.querySelector('.text');
let clrButton = document.querySelector('#clear');
let eqButton = document.querySelector('#equals');
let allButtons = document.querySelectorAll('button');
let a = 0;
let b = 0;
let operator = null;
let operated = false;
let firstNumber = true;
let isDot = false;
let deleteButton = document.querySelector('#delete');

//Assignment of functions

eqButton.addEventListener('click', function() {
    eqClicked();
});


clrButton.addEventListener('click', function() {
    clrClicked();
}
);

for (let button of numButtons) {
    button.addEventListener('click', function() {
        numButtonClicked(button);
    });
}

    
for (let button of opButtons) {
    button.addEventListener('click', function() {
        opButtonClick(button);
    });
}
for (let button of allButtons) {
    button.addEventListener('click', function() {
        clickEffect(button);
    });
}
deleteButton.addEventListener('click', deleteFunction);

document.addEventListener('keydown', function(event) {
    let key = event.key;
    for (let button of allButtons) {
        if (button.textContent === key) {
            button.click();
        }
    }
    if (key === "Enter") {
        eqButton.click();
    }
    else if (key === "Backspace") {
        deleteButton.click();
    }
    else if (key === "Escape") {
        clrButton.click();
    }
});

//Declaration of functions

function eqClicked() {
    b = parseFloat(display.textContent);
    a = operator(a, b);
    display.textContent = a;
    b = 0;
    operated = true;
    firstNumber = true;
    operator=null;
    isDot = false;
}
function clrClicked() {
    display.textContent = "";
    a = 0;
    b = 0;
    operator = null;
    operated = false;
    firstNumber = true;
    isDot = false;
}

function numButtonClicked(button) {
        if (operated) {
            display.textContent = "";
            operated = false;
        }
        display.textContent += button.textContent;
        if (button.textContent === ".") {
            if (isDot) {
                display.textContent = display.textContent.slice(0, -1);
            }
            else {
                isDot = true;
            }
        }
    }
function opButtonClick(button) {
        if (display.textContent === "") {
            alert("Enter a number first");
            return;
        }
        if (operator) {
            b = parseFloat(display.textContent);
            a = operator(a, b);
            display.textContent = a;
            b = 0;
            operated = true;
        }
        if (button.textContent == "+") {
            operator = add;
        }
        else if (button.textContent == "-") {
            operator = subtract;
        }
        else if (button.textContent == "*") {
            operator = multiply;
        }
        else if (button.textContent == "/") {
            operator = divide;
        }
        if (firstNumber) {
            a = parseFloat(display.textContent);
            firstNumber = false;
            operated = true;
        }
        isDot = false;
        // else if (!firstNumber && operator) {
        //     b = parseFloat(display.textContent);
        //     a = operator(a, b);
        //     display.textContent = a;
        //     b = 0;
        //     operated = true;
        // }
    }

function clickEffect(btn) {
        document.querySelector('.op-clicked')?.classList.remove('op-clicked');
        btn.classList.add('op-clicked');
        setTimeout(() => {
            btn.classList.remove('op-clicked');
        }, 500);
    }

function deleteFunction() {
    if (operated) {
        display.textContent = "";
        operated = false;
    } else {
        let text = display.textContent;
        if (text.length > 0) {
            if (text.slice(-1) === ".") {
                isDot = false;
            }
            display.textContent = text.slice(0, -1);
        }
    }
};

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        return a;
    }
    return a / b;
}