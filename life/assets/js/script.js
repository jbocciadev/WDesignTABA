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
    rangeInput1.value,
    rangeInput2.value,
];

// Add event listeners
rangeInput1.addEventListener("input", function () {
    rangeOutput1.textContent = this.value;
});

rangeInput2.addEventListener("input", function () {
    rangeOutput2.textContent = this.value;
});
