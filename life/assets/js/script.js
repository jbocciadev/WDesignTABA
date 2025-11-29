// Display/remove second Adult form
// get elements
let addAdultBtn = document.getElementById("add-adult-btn");
let secondAdultDiv = document.getElementById("secondAdultDiv");
let removeAdultBtn = document.getElementById("remove-adult-btn");
let secondAdultInputs = secondAdultDiv.querySelectorAll("input") // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll

// Add event listeners
addAdultBtn.addEventListener("click", function(){
    // Display second adult form
    secondAdultDiv.classList.remove("d-none");
    // Enable fields in second adult section
    for (input of secondAdultInputs){
        input.disabled = false;
    }
    // Swap add second adult button for remove second adult button
    addAdultBtn.classList.add("d-none");
    removeAdultBtn.classList.remove("d-none");
});

removeAdultBtn.addEventListener("click", function() {
    // Clear all inputs inside second adult
    // loop through the inputs, disable and define the value depending on the type
    
    triggerToast("info", "Second adult removed");

    for (input of secondAdultInputs){
        input.disabled = true;
        switch(input.type) {
            case "text":
                input.value = "";
                break;
            case "range":
                input.value = input.min;
                // document.getElementById("cover-value-2").textContent = formatCurrency(input.value);
                break;
            case "date":
                input.value = "";
                break;
            case "radio":
                input.checked = false;
                break;
        }
    }
    // Hide second adult form
    secondAdultDiv.classList.add("d-none")
    // Swap add second adult button for remove second adult button
    addAdultBtn.classList.remove("d-none");
    removeAdultBtn.classList.add("d-none");
    // Scroll back up to top of page https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    window.scrollTo({
        top: 0,
    })
});



// *** Handle form submission ***
document.getElementById("lifeForm").addEventListener("submit", function(event){
    // 2 implement validation on the form
    event.preventDefault(); // Stop the form from sending information to its target
    let lifeForm = document.getElementById("lifeForm");
    if (validateForm(lifeForm)) {

        // create firstAdult object with cover amount, cover term, age and smoker attributes
        let firstAdult = {};
        firstAdult.name = lifeForm.querySelector("#fname1").value.trim();
        firstAdult.surname = lifeForm.querySelector("#lname1").value.trim();
        firstAdult.cover = document.getElementById("cover-amount-1").value;
        firstAdult.term = document.getElementById("cover-term").value;
        firstAdult.dob = document.getElementById("dob-1").value;        
        firstAdult.age = new Date().getFullYear() - new Date(document.getElementById("dob-1").value).getFullYear(); // calculate age - only current year - birth year
        firstAdult.smoker = document.getElementById("smoker-yes1").checked ? "Yes" : "No";

        let totalPremium = parseFloat(calculatePremium(firstAdult));

        // Add second adult if second adult form fields are visible
        if (secondAdultDiv.classList.contains("d-none") == false){
            var secondAdult = {};
            secondAdult.name = lifeForm.querySelector("#fname2").value.trim();
            secondAdult.surname = lifeForm.querySelector("#lname2").value.trim();
            secondAdult.cover = document.getElementById("cover-amount-2").value;
            secondAdult.term = firstAdult.term;
            secondAdult.dob = document.getElementById("dob-2").value;        
            secondAdult.age = new Date().getFullYear() - new Date(document.getElementById("dob-2").value).getFullYear(); // calculate age - only current year - birth year
            secondAdult.smoker = document.getElementById("smoker-yes2").checked ? "Yes" : "No";
            totalPremium += parseFloat(calculatePremium(secondAdult));
        }
        // Capture details and send email
        let quoteDetails = {};
        quoteDetails.firstAdult = firstAdult;
        if (secondAdultDiv.classList.contains("d-none") == false) {
            quoteDetails.secondAdult = secondAdult;
        }
        quoteDetails.totalPremium = totalPremium;
        quoteDetails.address = lifeForm.querySelector("#address").value;
        quoteDetails.address2 = lifeForm.querySelector("#address2").value.trim()
        quoteDetails.eircode = lifeForm.querySelector("#eircode").value;
        quoteDetails.city = lifeForm.querySelector("#city").value.trim()
        quoteDetails.county = lifeForm.querySelector("#county").value;
        quoteDetails.phone = lifeForm.querySelector("#phone").value;
        document.getElementById("submit-form-btn").disabled = true;
        sendEmail(quoteDetails); 
    }

    
    
});


// VALIDATE FORM FIELDS----------------------------
function validateForm(lifeForm){
    let reqFields = lifeForm.querySelectorAll(".validate"); // identify inputs with a "validate" class
    for (field of reqFields) {
        if (field.disabled == false){
            let t = field.type;
            switch(t){            
                case "text":
                    if (field.value.trim() == "") {
                        field.focus();
                        triggerToast("warning", `${field.name} is a mandatory field.`);
                        return;
                    }
                    if (field.name == "Eircode") {
                        field.value = field.value.trim().split(" ").join(""); // remove spaces at sides and also in the middle if found
                        if (field.value.length < 7) {
                            field.focus();
                            triggerToast("warning", "Eircode length needs to be 7 characters long.")
                            return;
                        }
                    }
                    break;
                case "email":
                    if (field.value.trim() == "") {
                        field.focus();
                                triggerToast("warning", `${field.name} is a mandatory field.`);
                        return;
                    }
                    if (field.value.search("@") == -1 || field.value.search(".") == -1){ //check for missing "@" and  missing "."
                        field.focus();
                        triggerToast("warning", `${field.value} is not a valid email address.`);
                        return
                    }
                    break;
                case "date":
                    if (field.value == "") {
                        field.focus();
                        triggerToast("warning", `The value given for Date of Birth is not valid`)
                        return;
                    }
                    break;
                case "radio":
                    // get both buttons and make sure that either one is selected
                    let buttons = field.parentNode.parentNode.querySelectorAll("input");
                    if(!buttons[0].checked && !buttons[1].checked) {
                        field.parentNode.parentNode.focus();
                        triggerToast("warning", `Please select "Yes" or "No" in the smoker status.`)
                        return;
                    }
                    break;
                case "tel":
                    if (field.value == ""){
                        field.focus();
                        triggerToast("warning", "The Phone number field is mandatory.")
                        return;
                    } 
                    let phoneArray = field.value.split("");
                    if (phoneArray.length < 10) {
                            field.focus();
                            triggerToast("warning", "The phone number must contain at least 10 digits.");
                            return;
                        }
                    if (phoneArray.length > 12) {
                        field.focus();
                        triggerToast("warning", "That phone number seems too long, please check again.")
                        return;
                    } 
                        // Check individual digits against accepted values array
                    let acceptedValues = "0123456789 -";
                    acceptedValues = acceptedValues.split("");
                    for (i of phoneArray) {
                        if (! acceptedValues.includes(i)){
                            field.focus();
                            triggerToast("warning", `The phone number can only contain digits 0-9, "-" and spaces`)
                            return;
                        }     
                    }                
                    break;
                case "checkbox":
                    if(!field.checked){
                        field.focus();
                        triggerToast("warning", "You must accept the Terms and Conditions before submitting your information.")
                        return
                    }
                    break;
                default:
                    if (field.tagName = "SELECT") {
                        if(field.value == "") {
                            field.focus();
                            triggerToast("warning", "You must select a County to continue.")
                            return;
                        }
                    }
                    break;
            }
        }
    }
    return true;
};

// CALCULATE MONTHLY PREMIUM -----------------------------

function calculatePremium(adult){
    // Premium will be calculated in thirds, age, term and smoker (multiplier). 
    // Max premium will be calculated as a percentage of €1000 for cover under €250,000, or total amount if cover is larger.
    let monthlyPremium = 0;
    let premiumMultiplier = 0;
    let maxPremium = 1000;
    let maxPremiumThreshold = 250000; // All covers > €250K will pay full max premium

    // Factor in cover amount
    if (adult.cover < maxPremiumThreshold) {
        maxPremium = maxPremium * (adult.cover/maxPremiumThreshold) // links maxPremium to cover value as percentage of threshold
    }

    // Factor in smoker
    if (adult.smoker){
        premiumMultiplier += 1* (1/3); // if smoker, multiplier is 33% more
    }
    // Factor in Age
    premiumMultiplier += 1* ((1/3) * Math.min(1, (adult.age/50))); // links multiplier to age. If age 50 or more, this part is added cpmpletely, otherwise, a fraction of this 33%

    // Factor in cover term
    premiumMultiplier += 1* (1/3) * (adult.term/40)

    // Calculate total monthly premium
    monthlyPremium = maxPremium * premiumMultiplier;
    
    return monthlyPremium;
};

function sendEmail(quoteDetails) {
    emailjs.init("X0VrOze2ucHH5azPw");
    // emailJS generic template and service id
    const serviceID = "service_t7m9ufn";
    const templateID = "template_nxmytjl";

    const emailData = {};
    emailData.insurance_type = "life";
    emailData.email = document.getElementById("email").value.trim();
    emailData.name = quoteDetails.firstAdult.name;
    emailData.monthly_total = new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(quoteDetails.totalPremium);
    emailData.annual_total = new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(parseFloat(emailData.monthly_total) * 12);
    emailData.cover_info = `Cover term: ${quoteDetails.firstAdult.term} Years
        First Adult: ${quoteDetails.firstAdult.name} ${quoteDetails.firstAdult.surname}
        Cover amount: € ${new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(quoteDetails.firstAdult.cover)}        
        Smoker: ${quoteDetails.firstAdult.smoker}
        Date of Birth: ${quoteDetails.firstAdult.dob}`;

    if (quoteDetails.secondAdult) {
        emailData.cover_info += `
            ---
            Second Adult: ${quoteDetails.secondAdult.name} ${quoteDetails.secondAdult.surname}
            Cover amount: € ${new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(quoteDetails.secondAdult.cover)}        
            Smoker: ${quoteDetails.secondAdult.smoker}
            Date of Birth: ${quoteDetails.secondAdult.dob}`;
    }
    // Add contact details
    emailData.cover_info += `
        ---
        Address: ${quoteDetails.address} ${quoteDetails.address2}
        ${quoteDetails.eircode}, ${quoteDetails.city} ${quoteDetails.county}
        Contact telephone number: ${quoteDetails.phone}`;

    emailjs.send(serviceID, templateID, emailData)
        .then(() => {
                triggerToast("info", "Your quotation was emailed to " + emailData.email);
                // document.getElementById("emailQuote").textContent =
                //     "Quotation has been successfully sent to your email!"; // prevent user from sending same email again, transform button
            })
            .catch((error) => {
                console.error("Error sending quotation:", error);
                alert("Error sending email");
            });

}

// Custom toast function to handle toast according to type and text sent----------------------------
function triggerToast(toastType, toastText) {
    let toastParameters = {
        text: toastText,
        duration: 2500,
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }
    if (toastType == "info"){
            toastParameters.style = {
                background: "linear-gradient(to right, var(--blue), var(--green))",
            };
        } else if (toastType == "warning") {
            toastParameters.style = {
                background: "red"
            };
        } else {
            toastParameters.style = {
                background: "yellow",
                color: "black"
            };
        }
    Toastify(toastParameters).showToast();
};

// 0 Calculate premium
    // 1 capture relevant fields
    // Name, email, 
    // 2 send email
    // 3 clear form
    // 4 hide form, show success message
    // lifeForm.requestSubmit();