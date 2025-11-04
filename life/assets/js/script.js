// This is an example script, please modify as needed
const rangeInput = document.getElementById("cover-amount");
const rangeOutput = document.getElementById("cover-value");

// Set initial value
rangeOutput.textContent = rangeInput.value;

rangeInput.addEventListener("input", function () {
    rangeOutput.textContent = this.value;
});
