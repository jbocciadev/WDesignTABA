// VALIDATIONS SECTION -------------------------------------------------------------------------
//Reg validation -- WARN No spaces
document.getElementById('inputReg').addEventListener('input', function () {
    const reg = this.value;
    const warning = document.getElementById('regWarning');

    // Logical check for Reg input
    const pattern = /^\d{2,3}-[A-Za-z]{1,2}-\d+$/; // 2 or 3 digits for year, one or two letters for County code, and dashes
    // warning if conditions are and arent met
    if (!pattern.test(reg)) {
        warning.textContent = "Format must be like your Reg Plate: 181-D-123";
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
// END OF VALIDATIONS ------------------------------------------------------


// DOM MANIPULATION SECTION-----------------------------------------------------------------------
// REG PLATE - Source W3Schools - HTML DOM Element textContent
const input = document.getElementById("inputReg");
const mirror = document.getElementById("regCopy");

input.addEventListener("input", () => {
    regCopy.textContent = input.value; // dynamically update the span container
});

input.addEventListener("input", () => {
    const cleaned = input.value.replace(/[\s]/g, '').toUpperCase(); //added .toUpperCase and removed symbols/spaces except dash, so reg looks good in the plate div
    mirror.textContent = cleaned;
});



// FadeToggle jQuery sections - collapsible section turn into edit sections buttons when 'proceed' button clicked
$(document).ready(function () {

    // Proceed buttons -- Fade buttons in bacause i needed them hidden via CSS when page is initially loaded
    $("#closeCarInfo").click(function () {
        $("#section1").fadeOut(850); // hide the section
        $("#editCarInfo").fadeIn(850); // show the edit buttons
    });

    $("#closeInsPref").click(function () {
        $("#section2").fadeOut(850); // hide the section
        $("#editInsPref").fadeIn(850); // show the edit buttons
    });

    $("#closeDriverInfo").click(function () {
        $("#section3").fadeOut(850); // hide the section
        $("#editDriverDetails").fadeIn(850); // show the edit buttons

    });

    // Edit buttons -- show section and hide the edit button
    $("#editCarInfo").click(function () {
        $("#section1").fadeIn(850);
        $("#editCarInfo").fadeOut(850);

    });

    $("#editInsPref").click(function () {
        $("#section2").fadeIn(850);
        $("#editInsPref").fadeOut(850);

    });

    $("#editDriverDetails").click(function () {
        $("#section3").fadeIn(850);
        $("#editDriverDetails").fadeOut(850);
    });
});
// END jQuery---------------------------

// IMPORT DESTINATION SHOW SECTION
importedSwitch.addEventListener('change', function () {
    if (this.checked) {
        importedCountry.style.display = 'block';
    } else {
        importedCountry.style.display = 'none';
    }
});

// PENALTY POINT ADDITIONAL SECTION SHOW
penaltySwitch.addEventListener('change', function () {
    if (this.checked) {
        penaltyArea.style.display = 'block';
    } else {
        penaltyArea.style.display = 'none';
    }
});

// TERMS AND CONDITIONS OPEN OVERLAY/POP-UP
$(document).ready(function () {

    $("#openTC").click(function () {
        $("#tcOverlay").fadeIn(750); // show the edit buttons
    });

    // TERMS AND CONDITIONS CLOSE OVERLAY -- Source Stackoverflow
    $("#closeOverlay").click(function () {
        $("#tcOverlay").fadeOut(750);
    });
});
// END OF DOM MANIPULATIONS-------------------------------------------------------------

// CALCULATIONS SECTION ---------------------------------------------------------------------------
// Vehicle Information Section

function calculatePremium() {
    // Get the car value from the input. Starting Premium
    let total = 0;
    const carValue = parseFloat(document.getElementById("carValue").value || 0);
    // Determine the percentage based on car value ranges
    let valueMultiplier = 0.075;
    if (carValue <= 10000) {
        valueMultiplier = 0.01;
    } else if (carValue <= 20000) {
        valueMultiplier = 0.015;
    } else if (carValue <= 30000) {
        valueMultiplier = 0.017;
    } else if (carValue <= 40000) {
        valueMultiplier = 0.02;
    } else if (carValue <= 60000) {
        valueMultiplier = 0.025;
    } else if (carValue <= 70000) {
        valueMultiplier = 0.03;
    } else if (carValue <= 80000) {
        valueMultiplier = 0.04;
    } else {
        valueMultiplier = 0.07;
    }

    total = carValue * valueMultiplier; // Calculate the base premium

    // CarAge multiplier
    const carYear = parseInt(document.getElementById("carYear").value || 0); // parse int the manufacture year
    const currentYear = new Date().getFullYear();  // determine current year
    let carAge = Math.max(0, currentYear - carYear);    // subtract the two, make sure doesnt go below zero
    let ageMultiplier = 0; // default (no increase)


    if (carAge < 5) ageMultiplier = 0.02;
    else if (carAge < 10) ageMultiplier = 0.04;
    else if (carAge <= 20) ageMultiplier = 0.05;
    else ageMultiplier = 0.01; // 20+ years (vintage)

    total += total * ageMultiplier;// Calculate the base premium


    // Engine capacity multiplier 
    const capacity = parseInt(document.getElementById("engineSize").value || 0); // parse int the manufacture year
    let engineMultiplier = 0; // default (no increase)


    if (capacity > 4000) engineMultiplier = 0.5;
    else if (capacity > 3000) engineMultiplier = 0.4;
    else if (capacity > 2100) engineMultiplier = 0.2;
    else if (capacity > 1450) engineMultiplier = 0.2;
    else if (capacity > 1250) engineMultiplier = 0.2;
    else if (capacity > 999) engineMultiplier = 0.1;
    else if (capacity > 0) engineMultiplier = 0.05;

    total += total * engineMultiplier;// Calculate the capacity premium


    // Mileage multiplier 
    const mileage = parseInt(document.getElementById("mileage").value || 0); // parse int the mileage
    let mileageMultiplier = 0; // default (no increase)

    if (mileage < 5000) mileageMultiplier = 0.01;
    else if (mileage < 10000) mileageMultiplier = 0.02;
    else if (mileage < 20000) mileageMultiplier = 0.03;
    else if (mileage < 50000) mileageMultiplier = 0.04;
    else mileageMultiplier = 0.05; // +50000km

    total += total * mileageMultiplier;// Calculate the mileage premium


    // Parking multiplier 
    const parking = parseInt(document.getElementById("parking").value || 0); // parse int the value of dropdown item
    let parkingMultiplier = 0; // default (no increase)

    if (parking === 0) parkingMultiplier = -0.1;
    else if (parking === 1) parkingMultiplier = 0;
    else parkingMultiplier = 0.1; // garaged

    total += total * parkingMultiplier; // Calculate the Parking premium


    // Imported checkbox
    const imported = document.getElementById("importedSwitch").checked;
    let importMultiplier;
    if (imported) {
        importMultiplier = 0.05;
    } else {
        importMultiplier = 0;
    }
    total += total * importMultiplier;


    // Insurance Preferences Section----------------------------------------------

    // Age multiplier
    const driverAge = parseInt(document.getElementById("driverAge").value);
    let driverAgeMultiplier = 0; // default (no increase)

    if (driverAge >= 40) driverAgeMultiplier = 0.01;
    else if (driverAge >= 30) driverAgeMultiplier = 0.03;
    else if (driverAge >= 25) driverAgeMultiplier = 0.05;
    else if (driverAge >= 23) driverAgeMultiplier = 0.10;
    else if (driverAge >= 21) driverAgeMultiplier = 0.25;
    else if (driverAge >= 18) driverAgeMultiplier = 0.4;
    else driverAgeMultiplier = 0.5; // young driver Under 18yo

    // Calculate the base premium
    total += total * driverAgeMultiplier



    // Driver Experience Calculations (DRIVER DETAILS SECTION)----------------------------------------------

    const experience = Math.max(0, parseInt(document.getElementById("experience").value || 0)); //parse values and make sure cant be minuses
    let experienceMultiplier = 0; // default (no increase)

    if (experience === 0) experienceMultiplier = -0.04;
    else if (experience === 1) experienceMultiplier = -0.08;
    else if (experience === 2) experienceMultiplier = -0.12;
    else if (experience === 3) experienceMultiplier = -0.16;
    else if (experience === 4) experienceMultiplier = -0.2;
    else experienceMultiplier = -0.4; // 5+

    // Calculate the base premium
    total += total * experienceMultiplier;

    // No Claim Bonus
    const ncb = parseInt(document.getElementById("noClaims").value || 0); // parse int the ncb amount // || 0 to avoid NaN errors
    let ncbMultiplier = 0;
    if (ncb === 0) ncbMultiplier = 0;
    else if (ncb === 1) ncbMultiplier = -0.1;
    else if (ncb === 2) ncbMultiplier = -0.3;
    else if (ncb === 3) ncbMultiplier = -0.4;
    else if (ncb === 4) ncbMultiplier = -0.5;
    else ncbMultiplier = -0.7; // 5+

    // Calculate the base premium
    total += total * ncbMultiplier


    // No Claim Bonus
    const pen = parseInt(document.getElementById("penalty").value || 0);  // || 0 to avoid NaN errors
    let penaltyMultiplier = 0;
    if (pen === 0) penaltyMultiplier = 0;
    else if (pen === 1) penaltyMultiplier = 2.5;
    else if (pen === 2) penaltyMultiplier = 5;
    else if (pen === 3) penaltyMultiplier = 7;
    else if (pen === 4) penaltyMultiplier = 10;
    else penaltyMultiplier = 15;

    // Calculate the base premium
    total += total * penaltyMultiplier


    // THE BELOW ARE AT THE END BECAUSE THEY WERE GETTING AFFECTED BY THE min: Age multiplier. I want these to be set price seperate from the dynamic quotes
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
    // User Required to pick one of them by HTML validation
    const rates = {
        comprehensive: 300,
        fireTheft: 150,
        thirdOnly: 50
    };
    const policy = document.querySelector('input[name="policy"]:checked')?.value;
    if (policy) {
        total += rates[policy];
    }
    let baseline = 300
    total += baseline;


    // For the live pricing simple calculation for monthly payment. No increases compared to annual payment
    let monthlyTotal = total / 12;

    // Display result - took 'total' and gave it ID to call it into my HTML to display premium Euro value
    document.getElementById("premiumOutput").textContent = total.toFixed(2);
    document.getElementById("monthlyPremiumOutput").textContent = monthlyTotal.toFixed(2);

    // RETURN the totals variables for the EmailJS
    return { total, monthlyTotal };
}

// Added event listeners for live changes
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculatePremium);
    el.addEventListener("change", calculatePremium);
});

// // EMAILJS INTEGRATION -------------------------------------- Source: https://www.youtube.com/watch?v=ziYrGFADE1g&t=438s
// emailjs.init("X0VrOze2ucHH5azPw");

// document.getElementById("quotationForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent page reload

//     // return values from running/live total calculation
//     const { total, monthlyTotal } = calculatePremium();

//     // pulled from the form
//     const name = document.getElementById("fullname").value;
//     const inputEmail = document.getElementById("inputEmail").value;
//     const reg = document.getElementById("inputReg").value;

//     // emailJS car template and service id
//     const serviceID = "service_t7m9ufn";
//     const templateID = "template_79rrvnt";
    
//     //has to match the parameters in the service template
//     const quotationForm = {
//         name: name,
//         input_Email: inputEmail,
//         reg: reg,
//         annual_total: total.toFixed(2),
//         monthly_total: monthlyTotal.toFixed(2)
//     };

//     // console.table(quotationForm);
//     // console.log("Annual total:", total.toFixed(2));
//     // console.log("Monthly total:", monthlyTotal.toFixed(2));

//     // forward details onto the service with conditionals for info
//     emailjs.send(serviceID, templateID, quotationForm)
//         .then(() => {
//             alert("Your quotation was emailed to: " + inputEmail);
//             document.getElementById("emailQuote").textContent =
//                 "Quotation has been successfully sent to your email!"; // prevent user from sending same email again, transform button
//         })
//         .catch((error) => {
//             console.error("Error sending quotation:", error);
//             alert("Error sending email");
//         });
// });