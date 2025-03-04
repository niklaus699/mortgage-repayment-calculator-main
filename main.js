let text = "";
const clearAll = document.getElementById('clearAll');
const form = document.getElementById('myForm');
const resultContainer = document.createElement('div');
resultContainer.className = 'result-container-child';
const resultHeader = document.createElement('h3');
resultHeader.textContent = 'Your results';
const resultText = document.createElement('p');
resultText.textContent = 'Your results are shown below based on the information you provided. '
'To adjust the results, edit the form and click"calculate " again.';
const monthlyText = document.createElement('p');
const resultValue = document.createElement('h1');
const totalText = document.createElement('p');
totalText.textContent = 'Total you\'ll repay over the term';
const totalValue = document.createElement('h3');
const line = document.createElement('hr');
const empty = document.getElementById('resultPlaceholder');
resultContainer.append(monthlyText, resultValue, line, totalText, totalValue);
empty.className = "";

let appendedElements = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const amountMain = document.getElementById("amount");
    const termMain = document.getElementById("term");
    const rateMain = document.getElementById("rate");
    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseFloat(document.getElementById("term").value) * 12;
    const rate = parseFloat(document.getElementById("rate").value) / 100 / 12;
    const repayment = document.getElementById('repayment');
    const interest = document.getElementById('interest');
    const checked = document.querySelector("input[name='type']:checked");
    const result = document.getElementById("result");
    const amountDiv = document.getElementById("amount-div");
    const termDiv = document.getElementById("term-div");
    const rateDiv = document.getElementById("rate-div");
    const errorText = document.getElementById("errorText");
    const errorText1 = document.getElementById("errorText1");
    const errorText2 = document.getElementById("errorText2");
    const errorText3 = document.getElementById("errorText3");

    const checkValidity = () => {
        let isValid = true;
        if (isNaN(amount) || amount <= 0) {
            isValid = false;
            errorText.style.visibility = "visible";
            errorText.style.color = "red";
            amountMain.style.border = "1px solid red";
            amountDiv.style.backgroundColor = "red";
            amountDiv.style.color = "white";
            return isValid;
        } else if (isNaN(term) || term <= 0) {
            isValid = false;
            errorText1.style.visibility = "visible";
            errorText1.style.color = "red";
            termMain.style.border = "1px solid red";
            termDiv.style.backgroundColor = "red";
            termDiv.style.color = "white";
            return isValid;
        } else if (isNaN(rate) || rate <= 0) {
            isValid = false;
            errorText2.style.color = "red";
            errorText2.style.visibility = "visible";
            rateMain.style.border = "1px solid red";
            rateDiv.style.backgroundColor = "red";
            rateDiv.style.color = "white";
            return isValid;
        } else if (checked === null) {
            isValid = false;
            errorText3.style.color = "red";
            errorText3.style.visibility = "visible";
            return isValid;
        } else {
            isValid = true;
            errorText.style.visibility = 'hidden';
            errorText1.style.visibility = 'hidden';
            errorText2.style.visibility = 'hidden';
            errorText3.style.visibility = 'hidden';
            return isValid
        }
    }
    console.log(checkValidity());

    if (checkValidity() === true) {
        let monthlyPayment, totalPayment;
        if (checked === repayment) {
            monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
            totalPayment = (monthlyPayment) * (term);
            text = "Your Monthly Repayments";
        } else if (checked === interest) {
            monthlyPayment = amount * rate;
            totalPayment = monthlyPayment * term;
            text = "Your Monthly Interest Only Repayments";
        }

        empty.className = 'empty';
        monthlyText.textContent = `${text}`;
        resultValue.textContent = `£${formatNumber(monthlyPayment)}`;
        totalValue.textContent = `${formatNumber(totalPayment)}`;
        result.append(resultHeader, resultText, resultContainer);

        appendedElements.push(resultHeader, resultText, resultContainer);
    }

});

clearAll.addEventListener('click', function(e) {
    e.preventDefault();
    form.reset();
    empty.classList.remove('empty');
    appendedElements.forEach(element => result.removeChild(element));
    appendedElements = [];
    errorText.style.visibility = "hidden";
    errorText1.style.visibility = "hidden";
    errorText2.style.visibility = "hidden";
    errorText3.style.visibility = "hidden";
});

const formatNumber = (num) => {
    const str = num.toString();
    // Split the string into integer and fractional parts.
    const parts = str.split('.');
    let integerPart = parts[0];
    const fractionalPart = parts.length > 1 ? parts[1] : '';

    // Insert commas into the integer part.
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
}