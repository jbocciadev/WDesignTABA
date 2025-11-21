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