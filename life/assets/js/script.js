// Display/remove second Adult form
// get elements
let addAdultBtn = document.getElementById("add-adult-btn");
let secondAdult = document.getElementById("secondAdultDiv");
let removeAdultBtn = document.getElementById("remove-adult-btn");
let secondAdultInputs = secondAdult.querySelectorAll("input") // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll

// Add event listeners
addAdultBtn.addEventListener("click", function(){
    // Display second adult form
    secondAdult.classList.remove("d-none");
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
    secondAdult.classList.add("d-none")
    // Swap add second adult button for remove second adult button
    addAdultBtn.classList.remove("d-none");
    removeAdultBtn.classList.add("d-none");
    // Scroll back up to top of page https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    window.scrollTo({
        top: 0,
    })
});

// Custom toast function to handle toast according to type and text sent
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
}

// *** Handle form validation ***
// 1 get submit button
document.getElementById("submit-form-btn").addEventListener("click", function(event){
// 2 implement validation on the form
event.preventDefault // Stop the form from sending information to its target
let lifeForm = document.getElementById("lifeForm");
let reqFields = lifeForm.querySelectorAll(".validate"); // identify inputs with a "validate" class
for (field of reqFields) {
    if (field.disabled == false){
        console.log(field.type, "-", field.value, field.name)
        let t = field.type;
        switch(t){            
            case "text":
                if (field.value.trim() == "") {
                    triggerToast("warning", `${field.name} is a mandatory field.`);
                    return;
                }
                if (field.name == "Eircode") {
                    field.value = field.value.trim().split(" ").join(""); // remove spaces at sides and also in the middle if found
                    if (field.value.length < 7) {
                        field.focus;
                        triggerToast("warning", "Eircode length needs to be 7 characters long.")
                        return;
                    }
                }
                break;
            case "email":
                if (field.value.trim() == "") {
                    triggerToast("warning", `${field.name} is a mandatory field.`);
                    return;
                }
                if (field.value.search("@") == -1 || field.value.search(".") == -1){ //check for missing "@" and  missing "."
                    triggerToast("warning", `${field.value} is not a valid email address.`);
                    return
                }
                break;
            case "date":
                if (field.value == "") {
                    triggerToast("warning", `The value given for Date of Birth is not valid`)
                    return;
                }
                break;
            case "radio":
                // get both buttons and make sure that either one is selected
                let buttons = field.parentNode.parentNode.querySelectorAll("input");
                console.log(buttons)
                // document.querySelectorAll(".firstSmoker");
                if(!buttons[0].checked && !buttons[1].checked) {
                    triggerToast("warning", `Please select "Yes" or "No" in the smoker status.`)
                    console.log("both unchecked")
                    return;
                }

                break;
        }
    }
}
})

// TO DO
// 1 implement emailjs
// 2 add form fields to the email to be sent