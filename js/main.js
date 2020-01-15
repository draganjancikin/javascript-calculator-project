let shouldClear = false;

const getDisplayValue = () => {
    const screen = document.querySelector('.screen');
    return screen.innerText;
};

const setDisplayValue = (value, replace = false) => {
    if (shouldClear) {
        replace = true;
        shouldClear = false;
    }
    const screen = document.querySelector('.screen');
    let displayValue;
    if (replace) {
        displayValue = value;
    } else {
        displayValue = getDisplayValue() + value;
    }
    if (!displayValue) {
        displayValue = 0;
    }
    screen.innerText = displayValue;
};

const handleClick = (e) => {
    const thing = e.target.innerText;
    switch (thing) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            setDisplayValue(thing, getDisplayValue() === '0');
            break;
        case 'C':
            setDisplayValue('', true);
            break;
        case '←':
            const currentDisplayValue = getDisplayValue();
            setDisplayValue(currentDisplayValue ? currentDisplayValue.substring(0, currentDisplayValue.length - 1) : '', true);
            break;
        case '+':
        case '-':
        case '×':
        case '÷': {
            const displayValue = getDisplayValue();
            if (displayValue) {
                if (/[\+\-×÷]/.test(displayValue)) {
                    alert('Already has function');
                    break;
                }
                setDisplayValue(thing);
            }
            break;
        }
        case '=': {
            const displayValue = getDisplayValue();
            if (!/\d$/.test(displayValue)) {
                alert('Add number');
                break;
            }
            const matches = displayValue.match(/(\d+)([^\d])(\d+)/);
            const firstValue = matches[1];
            const secondValue = matches[3];
            const operation = matches[2];
            let result;
            switch (operation) {
                case '+':
                    result = parseInt(firstValue) + parseInt(secondValue);
                    break;
                case '-':
                    result = parseInt(firstValue) - parseInt(secondValue);
                    break;
                case '×':
                    result = parseInt(firstValue) * parseInt(secondValue);
                    break;
                case '÷':
                    result = parseInt(firstValue) / parseInt(secondValue);
                    break;
            }
            setDisplayValue(result, true);
            shouldClear = true;
            break;
        }
    }
};
