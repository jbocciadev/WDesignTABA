/* Student Name: Joanne Brennan Elliott 
 Student Number: X23410001
 script.js file for Home Insurance form submission
 Date: 7th November 2025 --
*/


function mySubmit() {      	  

	if (!document.getElementById("gridCheck").checked) {
	 alert("You must agree to the Terms & Conditions before submitting the form.");
	 return;
   }
   else {
		 // Proceed with form submission
		 //alert("Form submitted successfully!");	
	
		let userFirstName = document.getElementById("fname").value.trim();   
		document.getElementById("fname").innerHTML =  userFirstName;      

		let userLastName = document.getElementById("lname").value.trim();   
		document.getElementById("lname").innerHTML =  userLastName;      
		
		let userEmail = document.getElementById("email").value;   
		document.getElementById("email").innerHTML =  userEmail.trim();     

		if (userFirstName === "" || userLastName === "") {
		alert("Please fill in your full name please.");
		return;
		}
	
		if (!userEmail.includes("@") || !userEmail.includes(".")) {
			alert("Please enter a valid email address.");
			return;
		} 
		
		// <!--  - Validate phone number  -->
		let phoneNumber = document.getElementById("phoneNumber").value.trim();    
		document.getElementById("phoneNumber").innerHTML =  phoneNumber;   
		phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters	   
		if (phoneNumber === "") {
			alert("Please fill in your phone number with numbers only please.");
			phoneNumber.focus();
		return;
		}
		if (phoneNumber.length < 10) {
			alert("Please enter a valid moblie phone number with 10 digits.");
		return;
		}	

		//Start date validation 
		let startDate = document.getElementById("startDate").value;   
		document.getElementById("startDate").innerHTML =  startDate;
		if (startDate === "") {
			alert("Please select a start date for the insurance.");
		return;
		}

		//Start date validation - must be future date 
		if (new Date(startDate) < new Date()) {
			alert("Please select a valid future date for the insurance start date.");
		return;
		}

		//validation for rebuild and contents  
		let rebuildCost = document.getElementById("rebuildCost").value.trim();
		if (document.getElementById("rebuildCost").value === "" || isNaN(document.getElementById("rebuildCost").value)) {
			alert("Please enter a valid rebuild value in numbers only.");
		return;
		}

		let contentsValue = document.getElementById("contentsValue").value.trim();
		if (document.getElementById("contentsValue").value === "" || isNaN(document.getElementById("contentsValue").value)) {
			alert("Please enter a valid contents value in numbers only.");
		return;
		}	

		// contents value should not exceed rebuild value
		if (Number(contentsValue) >= Number(rebuildCost)) {
			alert("Contents value cannot exceed or equal rebuild value. Please adjust the values.");
		return;
		}	
		//add more validations as needed - eg rebuild and contents - certain % etc
		//
		//
		//
		//

		//valiate build year cannot be in the future
		let buildYear = document.getElementById("buildYear").value.trim();
		let currentYear = new Date().getFullYear();
		if (Number(buildYear) > currentYear) {
			alert("Build year cannot be in the future. Please adjust the value.");
		return;
		}	
		
		//number of floors cannot be less than 1
		let numberOfFloors = document.getElementById("numOfFloors").value.trim();
		if (Number(numberOfFloors) < 1) {
			alert("Number of floors must be at least 1. Please adjust the value.");
		return;
		}	

		//number of bedrooms cannot be less than 1
		let numberOfBedrooms = document.getElementById("bedrooms").value.trim();
		if (Number(numberOfBedrooms) < 1) {
			alert("Number of bedrooms must be at least 1. Please adjust the value.");
		return;
		}	
		//number of bathrooms cannot be less than 1
		let numberOfBathrooms = document.getElementById("bathrooms").value.trim();
		if (Number(numberOfBathrooms) < 1) {
			alert("Number of bathrooms must be at least 1. Please adjust the value.");
		return;
		}	

		//no claims cannot be negative
		let noClaims = document.getElementById("noClaimsYears").value.trim();
		if (Number(noClaims) < 0) {
			alert("Number of years no claims cannot be negative. Please adjust the value.");
		return;
		}

		// All validations passed, proceed with submission
		let userName = userFirstName + " " + userLastName;

		//alert(userName+ ", thank you for your details. We will be in touch shortly.");
		alert("Hi " +userName+ ", Thank you for your details. \nWe will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");  
	//	alert(userName+ ", Thank you for your details.  "<br> " We will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");
		hide();
		form.reset(); // Reset the form after submission
	}

}
	//function hide(){
	//	document.getElementById("MySubmit").style.display = "none";
	//	document.getElementById("ThankYouMessage").style.display = "block";
	//}