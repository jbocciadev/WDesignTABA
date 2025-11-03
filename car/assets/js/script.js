//Reg Number validation and year autofill
function processReg(inputReg) {     // Take the input from Registration
    inputReg = inputReg.toUpperCase().trim();   //trim() removes spaces aeound the reg. toUpperCase() converts a reg to uppercase letters.

    // Remove non numeric characters in reg (spaces, dashes, letters, etc)
    let standardReg = '';
    for (let i = 0; i < inputReg.length; i++) {
        const ch = inputReg[i];
        if (ch >= '0' && ch <= '9') {
            standardReg += ch;
        }
    }

    // Checks for first two digit
    if (standardReg.length < 2) {
        document.getElementById("carYear").value = "";
        return;
    }

    // Sliced away range 0 to 2 to get first 2 digits for addtion
    let year = 2000 + parseInt(standardReg.slice(0, 2));

    // Fill carYear ID element
    document.getElementById("carYear").value = year;
}

// IMPORT DESTINATION SHOW
importedSwitch.addEventListener('change', function () {
    if (this.checked) {
        importedCountry.style.display = 'block';
    } else {
        importedCountry.style.display = 'none';
    }
});

// PENALTY POINT ADDITIONAL
penaltySwitch.addEventListener('change', function () {
    if (this.checked) {
        penaltyArea.style.display = 'block';
    } else {
        penaltyArea.style.display = 'none';
    }
});

// CALCULATIONS

// VALUE

function calculatePremium() {
    // Get the car value from the input
    const carValue = parseFloat(document.getElementById("carValue").value);
    let percentage;
    let basePremium;

    // Determine the percentage based on car value ranges
    if (carValue <= 10000) {
        percentage = 0.01; // 1%
    } else if (carValue <= 20000) {
        percentage = 0.02; // 2%
    } else if (carValue <= 40000) {
        percentage = 0.03; // 3%
    } else if (carValue <= 60000) {
        percentage = 0.05; // 5%
    } else {
        percentage = 0.07; // 7%
    }
    // Calculate the base premium
    basePremium = carValue * percentage;
}


// AGE 
function calculatePremium(basePremium) {
    const carYear = parseInt(document.getElementById("carYear").value);
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - carYear;
    let multiplier = 1; // default (no increase)

    if (carAge < 5) multiplier = 0.02;
    else if (carAge < 10) multiplier = 0.04;
    else if (carAge <= 20) multiplier = 0.05;
    else multiplier = 0.01; // 20+ years (vintage)

    // Calculate the base premium
    agePremium = basePremium + (multiplier * basePremium);
}