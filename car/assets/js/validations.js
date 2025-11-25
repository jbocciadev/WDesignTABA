// VALIDATIONS SECTION -------------------------------------------------------------------------
//Reg validation -- WARN No spaces
document.getElementById('inputReg').addEventListener('input', function () {
    const reg = this.value;
    const warning = document.getElementById('regWarning');

    // Logical check for Reg input (REGEX)
    const pattern = /^\d{2,3}-[A-Za-z]{1,2}-\d+$/; // 2 or 3 digits for year, one or two letters for County code, and dashes
    // warning if conditions are and arent met
    if (!pattern.test(reg)) {
        warning.textContent = "Format must be like your Reg Plate: 181-D-123";
        warning.style.display = "inline";
    } else {
        warning.style.display = "none";
    }
});

// PolicyStart dynamic VALIDATION. So users cant backdate policy - Source: https://www.w3schools.com/jsref/jsref_toisostring.asp , https://stackoverflow.com/questions/47066555/remove-time-after-converting-date-toisostring
// Get today date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
// Set it as the minimum date for the date picker
document.getElementById('policyStart').min = today;


// Phone Number Validation Source: https://www.geeksforgeeks.org/javascript/how-to-validate-form-using-regular-expression-in-javascript/
document.getElementById('inputPhone').addEventListener('input', function () {
    const phone = this.value.trim();
    const warning = document.getElementById('phoneWarning');

    // Regex: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
        warning.textContent = "Phone number must be exactly 10 digits.";
        warning.style.display = "inline";
    } else {
        warning.style.display = "none";
    }
});

// VALUE VALIDATION - PREVENT 200,000 plus car value 
const carValueInput = document.getElementById("carValue");

carValueInput.addEventListener("input", function () {
    let value = parseFloat(this.value) || 0;
    if (value > 200000) {
        this.value = 200000;  // automatically clamp, limit
    }
});


// PRE-SUBMIT BUTTON VALIDATION
document.getElementById('quotationForm').addEventListener('submit', function (e) {
    let valid = true;

    // Reg plate check Source - https://www.w3schools.com/jsref/met_element_scrollintoview.asp
    const reg = document.getElementById('inputReg').value.trim();
    const regWarning = document.getElementById('regWarning');
    if (!/^\d{2,3}-[A-Za-z]{1,2}-\d+$/.test(reg)) {
        // Bring up the warning
        regWarning.style.display = "inline";
        // Scroll the form to the warning
        regWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valid = false;
    }
    // Phone check
    const phone = document.getElementById('inputPhone').value.trim();
    const phoneWarning = document.getElementById('phoneWarning');
    if (!/^\d{10}$/.test(phone)) {
        // Bring up the warning
        phoneWarning.style.display = "inline";
        // Scroll the form to the warning
        phoneWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valid = false;
    }


    // Terms & Conditions checkbox
    if (!document.getElementById('gridCheck').checked) {
        valid = false;
        alert("You must agree to the Terms & Conditions.");
    }

    if (!valid) {
        e.preventDefault(); // Stop submission if invalid
    }
});
// END OF VALIDATIONS ------------------------------------------------------
