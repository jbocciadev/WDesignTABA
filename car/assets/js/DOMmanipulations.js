//  This is the car insurance quotation page of our company's site
// Kevin Orlov 
// Student ID: x24150614 

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
// END of jQuery

// IMPORT DESTINATION SHOW SECTION SWITCH
importedSwitch.addEventListener('change', function () {
    if (this.checked) {
        importedCountry.style.display = 'block';
    } else {
        importedCountry.style.display = 'none';
    }
});

// PENALTY POINT ADDITIONAL SECTION SHOW SWITCH
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

    // TERMS AND CONDITIONS CLOSE OVERLAY -- Source https://www.geeksforgeeks.org/web-templates/design-a-cookies-message-popup-template-using-html-and-css/
    $("#closeOverlay").click(function () {
        $("#tcOverlay").fadeOut(750);
    });
});
// END OF DOM MANIPULATIONS-------------------------------------------------------------