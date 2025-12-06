//  This is the car insurance quotation page of our company's site
// Kevin Orlov 
// Student ID: x24150614 

// CALCULATIONS SECTION ---------------------------------------------------------------------------
// Vehicle Information Section

function calculatePremium() {
    // Get the car value from the input. Starting Premium
    let total = 0;
    const carValue = parseFloat(document.getElementById("carValue").value || 0);
    // Determine the percentage based on car value ranges
    let valueMultiplier = 0;
    if (carValue <= 10000) {
        valueMultiplier = 0.015;
    } else if (carValue <= 50000) {
        valueMultiplier = 0.0175;
    } else if (carValue <= 120000) {
        valueMultiplier = 0.019;
    } else {
        valueMultiplier = 0.125;
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

    if (parking === 0) parkingMultiplier = -0.2; // garaged
    else if (parking === 1) parkingMultiplier = 0;
    else parkingMultiplier = 0.2;

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

    const experience = Math.max(0, parseInt(document.getElementById("experience").value || 0)); //parse values+make sure cant be minuses
    let experienceMultiplier = 0; // default (no increase)

    if (experience === 0) experienceMultiplier = -0.05;
    else if (experience === 1) experienceMultiplier = -0.1;
    else if (experience === 2) experienceMultiplier = -0.2;
    else if (experience === 3) experienceMultiplier = -0.3;
    else if (experience === 4) experienceMultiplier = -0.4;
    else experienceMultiplier = -0.6; // 5+

    // Calculate the base premium
    total += total * experienceMultiplier;

    // No Claim Bonus
    const ncb = parseInt(document.getElementById("noClaims").value || 0); // parse int the ncb amount || 0 to avoid NaN errors, math.max not need for dropdown
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

    // Calculate the penalty point multiplier
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
    // User Required to pick one of them by HTML validation, const - never change the values
    const rates = {
        comprehensive: 300,
        fireTheft: 250,
        thirdOnly: 50
    };
    const policy = document.querySelector('input[name="policy"]:checked')?.value;
    if (policy) {
        total += rates[policy];
    }
    const baseline = 250 // never change
    total += baseline;


    // For the live pricing simple calculation for monthly payment. No increases compared to annual payment
    let monthlyTotal = total / 12;

    // Display result - took 'total' and gave it ID to call it into my HTML to display premium Euro value
    document.getElementById("premiumOutput").textContent = total.toFixed(2);
    document.getElementById("monthlyPremiumOutput").textContent = monthlyTotal.toFixed(2);

    // RETURN the totals global variables for the EmailJS below
    return { total, monthlyTotal };
}

// Added event listeners for live changes
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculatePremium);
    el.addEventListener("change", calculatePremium);
});


// EMAILJS INTEGRATION -------------------------------------- Source: https://www.youtube.com/watch?v=ziYrGFADE1g&t=438s
emailjs.init("X0VrOze2ucHH5azPw");

document.getElementById("quotationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // return values from running/live total calculation
    const { total, monthlyTotal } = calculatePremium();

    // pulled from the form
    const name = document.getElementById("fullname").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const reg = document.getElementById("inputReg").value;

    // emailJS car template and service id
    const serviceID = "service_t7m9ufn";
    const templateID = "template_79rrvnt";

    // has to match the parameters in the service template
    const quotationForm = {
        name: name,
        input_Email: inputEmail,
        reg: reg,
        annual_total: total.toFixed(2),
        monthly_total: monthlyTotal.toFixed(2)
    };

    // console.table(quotationForm);
    // console.log("Annual total:", total.toFixed(2));
    // console.log("Monthly total:", monthlyTotal.toFixed(2));
    console.log(name, inputEmail, reg);
    console.log(quotationForm);

    // forward details onto the service with conditionals for info
    emailjs.send(serviceID, templateID, quotationForm)
        .then(() => {
            alert("Your quotation was emailed to: " + inputEmail);
            // Hide the submit button after sending the email
            document.getElementById("emailQuote").style.display = 'none';
        })
        .catch((error) => {
            console.error("Error sending quotation:", error);
            alert("Error sending email");
        });
});