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
importedSwitch.addEventListener('change', function() {
  if (this.checked) {
    importedCountry.style.display = 'block';
  } else {
    importedCountry.style.display = 'none';
  }
});