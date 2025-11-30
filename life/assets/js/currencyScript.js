// Script to format money values with currency for the life insurance quotation page 
// Juan A. Boccia 
// Student ID: 23435330


// https://getbootstrap.com/docs/5.3/forms/range/
// initialize variables
const [rangeInput1, rangeInput2] = [
    document.getElementById("cover-amount-1"),
    document.getElementById("cover-amount-2"),
];
const [rangeOutput1, rangeOutput2] = [
    document.getElementById("cover-value-1"),
    document.getElementById("cover-value-2"),
];

// Set initial value
[rangeOutput1.textContent, rangeOutput2.textContent] = [
    formatCurrency(rangeInput1.value),
    formatCurrency(rangeInput2.value)
];

// Add event listeners to format value on range change
rangeInput1.addEventListener("input", function () {
    rangeOutput1.textContent = formatCurrency(this.value);
});
rangeInput2.addEventListener("input", function () {
    rangeOutput2.textContent = formatCurrency(this.value);
});
// Reset value to 5,000 when form is reset
let removeBtn = document.getElementById("remove-adult-btn");
removeBtn.addEventListener("click", function () {
    let secondAmount = document.getElementById("cover-amount-2").getAttribute("value");
    rangeOutput2.textContent = formatCurrency(secondAmount);
});



function formatCurrency(value) {
    // Function that formats currency values into numeric with thousand and cent separator
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    return new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(value)
};