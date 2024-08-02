let btn = document.querySelectorAll('.col');
let p = document.querySelector('.p');
let p2 = document.querySelector('.p2');

function addImplicitMultiplication(str) {
    str = str
        .replace(/(\d)√(\d+)/g, '$1*Math.sqrt($2)')
        .replace(/√(\d+)/g, 'Math.sqrt($1)')
        .replace(/(\d)∛(\d+)/g, '$1*Math.cbrt($2)')
        .replace(/∛(\d+)/g, 'Math.sbrt($1)')
        .replace(/(\d)(\()/g, '$1*$2')
        .replace(/(\))(\d)/g, '$1*$2')
        .replace(/(\))(\()/g, '$1*$2')
        .replace(/(\d)\!/g, `
            function factorial(n) {
                    if (n === 0) {
                        return 1;
                    }
                    return n * factorial(n - 1);
                }
                factorial($1)
                    `);
    return str;
}

function evaluateExpression(expression) {
    let updatedExpression = expression.replace(/\^/g, '**');
    try {
        return eval(updatedExpression);
    } catch (e) {
        console.error('Error evaluating expression:', e);
        return '';
    }
}

function callback(event) {
    let element_value = event.target.value;
    let str_values = '';

    switch (true) {
        case !isNaN(element_value) || ['+', '-', '*', '/', '%', '**', '***', '(', ')', '.', '√', '∛', '!'].includes(element_value):
            if (element_value === '**') {
                p.innerHTML += '^2';
            } else if (element_value === '***') {
                p.innerHTML += '^3';
            } else if (element_value === '√') {
                p.innerHTML += '√';
            } else if (element_value === '∛') {
                p.innerHTML += '∛';
            } else if (element_value === '!') {
                p.innerHTML += '!';
            } else {
                p.innerHTML += element_value;
            }

            str_values = addImplicitMultiplication(p.innerHTML);
            p2.innerHTML = evaluateExpression(str_values);
            break;

        case element_value === 'clear':
            p.innerHTML = '';
            p2.innerHTML = '';
            break;

        case event.target.classList.contains('backSpace'):
            p.innerHTML = p.innerHTML.slice(0, -1);
            str_values = addImplicitMultiplication(p.innerHTML);
            p2.innerHTML = evaluateExpression(str_values);
            break;

        case element_value === '=':
            p.innerHTML = p2.innerHTML;
            p2.innerHTML = '';
            break;
    }
}

for (let sign of btn) {
    sign.addEventListener('click', callback);
}
