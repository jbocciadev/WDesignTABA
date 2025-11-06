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
// Vehicle Information Section

function calculatePremium() {
    // VALUE
    // Get the car value from the input
    let total = 0;

    const carValue = parseFloat(document.getElementById("carValue").value || 0);
    // Determine the percentage based on car value ranges
    if (carValue <= 10000) {
        valueMultiplier = 0.01; // 1%
    } else if (carValue <= 20000) {
        valueMultiplier = 0.02; // 2%
    } else if (carValue <= 40000) {
        valueMultiplier = 0.03; // 3%
    } else if (carValue <= 60000) {
        valueMultiplier = 0.05; // 5%
    } else {
        valueMultiplier = 0.07; // 7%
    }
    // Calculate the base premium
    total += carValue * valueMultiplier;


    // Age multiplier

    const carYear = parseInt(document.getElementById("carYear").value || 0); // parse int the manufacture year
    const currentYear = new Date().getFullYear();  // determine current year
    const carAge = currentYear - carYear;   // subtract the two
    let ageMultiplier = 0; // default (no increase)

    if (carAge < 5) ageMultiplier = 0.02;
    else if (carAge < 10) ageMultiplier = 0.04;
    else if (carAge <= 20) ageMultiplier = 0.05;
    else ageMultiplier = 0.01; // 20+ years (vintage)

    // Calculate the base premium
    total += total * ageMultiplier;


    // Engine capacity multiplier 

    const capacity = parseInt(document.getElementById("engineSize").value || 0); // parse int the manufacture year
    let engineMultiplier = 0; // default (no increase)

    if (capacity < 999) engineMultiplier = 0.01;
    else if (capacity < 2100) engineMultiplier = 0.03;
    else if (capacity < 3000) engineMultiplier = 0.05;
    else if (capacity < 4000) engineMultiplier = 0.05;
    else engineMultiplier = 0.07; // 4000cc or over

    // Calculate the capacity premium
    total += total * engineMultiplier;


    // Mileage multiplier 

    const mileage = parseInt(document.getElementById("mileage").value || 0); // parse int the mileage
    let mileageMultiplier = 0; // default (no increase)

    if (mileage < 5000) mileageMultiplier = 0.01;
    else if (mileage < 10000) mileageMultiplier = 0.02;
    else if (mileage < 20000) mileageMultiplier = 0.03;
    else if (mileage < 50000) mileageMultiplier = 0.04;
    else mileageMultiplier = 0.05; // +50000km

    // Calculate the mileage premium
    total += total * mileageMultiplier;


    // Parking multiplier 

    const parking = parseInt(document.getElementById("parking").value || ""); // parse int the mileage
    let parkingMultiplier = 0; // default (no increase)

    if (parking === 0) parkingMultiplier = -0.1;
    else if (parking === 1) parkingMultiplier = 0;
    else parkingMultiplier = 0.1; // garaged


    // Calculate the Parking premium
    total += total * parkingMultiplier;


    // Imported checkbox
    const imported = document.getElementById("importedSwitch").checked;
    let importMultiplier;
    if (imported) {
        importMultiplier = 0.05;
    } else {
        importMultiplier = 0;
    }
    total += total * importMultiplier;


    // Insurance Preferences Section


    // Driver Details SECTION
    // Age multiplier

    const driverAge = parseInt(document.getElementById("driverAge").value);
    let driverAgeMultiplier = 0; // default (no increase)

    if (driverAge > 40) driverAgeMultiplier = 0.02;
    else if (driverAge > 30) driverAgeMultiplier = 0.04;
    else if (driverAge > 24) driverAgeMultiplier = 0.05;
    else driverAgeMultiplier = 0.10; // young driver Under 24yo

    // Calculate the base premium
    total += total * driverAgeMultiplier



    // Driver Experience Calculations
    // Had to assign values also
    const experience = parseInt(document.getElementById("experience").value || 0); // parse int the manufacture year
    let experienceMultiplier = 0; // default (no increase)

    if (experience === 0) experienceMultiplier = -0.02;
    else if (experience === 1) experienceMultiplier = -0.05;
    else if (experience === 2) experienceMultiplier = -0.06;
    else if (experience === 3) experienceMultiplier = -0.08;
    else if (experience === 4) experienceMultiplier = -0.09;
    else experienceMultiplier = -0.1; // 5+

    // Calculate the base premium
    total += total * experienceMultiplier;


    // No Claim Bonus

    const ncb = parseInt(document.getElementById("noClaims").value || 0); // parse int the manufacture year  // || 0 to avoid NaN errors
    let ncbMultiplier = 0;
    if (ncb === 0) ncbMultiplier = -0.02;
    else if (ncb === 1) ncbMultiplier = -0.05;
    else if (ncb === 2) ncbMultiplier = -0.06;
    else if (ncb === 3) ncbMultiplier = -0.08;
    else if (ncb === 4) ncbMultiplier = -0.09;
    else ncbMultiplier = -0.2; // 5+

    // Calculate the base premium
    total += total * ncbMultiplier











    // THE BELOW ARE AT THE END BECAUSE THEY WERE GETTING AFFECTED BY THE min: Age multiplier

    // ADD-ONS
    const addon = document.querySelectorAll('input[name="addon"]:checked'); // ? to ensure that all or none can be selected
    const addonOptions = {
        ncb: 200,
        roadside: 100,
        newKey: 80
    };

    addon.forEach(addon => {
        total += addonOptions[addon.value];
    });

    // Policy Type
    // User Required to pick one of them by HTML 
    const rates = {
        comprehensive: 300,
        fireTheft: 150,
        thirdOnly: 50
    };
    const policy = document.querySelector('input[name="policy"]:checked')?.value;
    if (policy) {
        total += rates[policy];
    }


    let monthlyTotal = total / 12;

    // Display result
    document.getElementById("premiumOutput").textContent = total.toFixed(2);
    document.getElementById("monthlyPremiumOutput").textContent = monthlyTotal.toFixed(2);
}

// Added event listeners for live updates
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculatePremium);
    el.addEventListener("change", calculatePremium);
});
