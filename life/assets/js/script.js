// Display/remove second Adult form
// get elements
let addAdultBtn = document.getElementById("add-adult-btn");
let secondAdult = document.getElementById("secondAdultForm");
let removeAdultBtn = document.getElementById("remove-adult-btn")

// Add event listeners
addAdultBtn.addEventListener("click", function(){
    // Display second adult form
    secondAdult.classList.remove("d-none");
    // Swap add second adult button for remove second adult button
    addAdultBtn.classList.add("d-none");
    removeAdultBtn.classList.remove("d-none");
});

removeAdultBtn.addEventListener("click", function() {
    // Clear all inputs inside second adult
    secondAdult.reset();
    // Hide second adult form
    secondAdult.classList.add("d-none")
    // Swap add second adult button for remove second adult button
    addAdultBtn.classList.remove("d-none");
    removeAdultBtn.classList.add("d-none");
});