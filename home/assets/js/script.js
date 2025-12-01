/* Student Name: Joanne Brennan Elliott 
 Student Number: X23410001
 script.js file for Home Insurance form submission
 Date: 7th November 2025 --
*/
document.getElementById("homeForm").addEventListener("submit", function(event) {
		event.preventDefault();
	});

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
	
		if (!userEmail.includes("@") || !userEmail.includes(".")) {
			alert("Please enter a valid email address.");
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

		//valiate build year cannot be in the future
		let buildYear = document.getElementById("buildYear").value.trim();
		let currentYear = new Date().getFullYear();
		if (Number(buildYear) > currentYear) {
			alert("Build year cannot be in the future. Please adjust the value.");
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
		
		//number of floors cannot be less than 1
		let numberOfFloors = document.getElementById("numOfFloors").value.trim();
		if (Number(numberOfFloors) < 1) {
			alert("Number of floors must be at least 1. Please adjust the value.");
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

		// Capture details into object for sendEmail function 
		let quoteDetails = {};
		quoteDetails.firstName = userFirstName;
		quoteDetails.email = userEmail;
		quoteDetails.phoneNumber = phoneNumber;
		quoteDetails.startDate = startDate;
		quoteDetails.address = document.getElementById("ecode").value.trim();
		// retrieve house type from form
		let typeSelect = document.getElementById("houseType");
		quoteDetails.houseType = typeSelect.options[typeSelect.selectedIndex].text;
		quoteDetails.rebuildCost = rebuildCost;
		quoteDetails.contentsValue = contentsValue;
		// retrieve security system from the form
		let security = document.getElementById("securitySystems");
		quoteDetails.security = security.options[security.selectedIndex].text;
		quoteDetails.noClaims = noClaims;

		sendEmail(quoteDetails);

		//alert(userName+ ", thank you for your details. We will be in touch shortly.");
		alert("Hi " +userName+ ", Thank you for your details. \nWe will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");  
	//	alert(userName+ ", Thank you for your details.  "<br> " We will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");
		document.getElementById("homeForm").reset(); // Reset the form after submission
	}

}
	//function hide(){
	//	document.getElementById("MySubmit").style.display = "none";
	//	document.getElementById("ThankYouMessage").style.display = "block";
	//}

// Emailjs code implementation

function sendEmail(quoteDetails){
	emailjs.init("X0VrOze2ucHH5azPw");
	// emailJS generic template and service id
	const serviceID = "service_t7m9ufn";
	const templateID = "template_nxmytjl";

	const emailData = {};
	emailData.insurance_type = "home";
	emailData.email = quoteDetails.email;
	emailData.name = quoteDetails.firstName;
	emailData.cover_info = `Cover Start Date: ${quoteDetails.startDate}
		Address/eircode: ${quoteDetails.address}
		House type: ${quoteDetails.houseType}
		Rebuild cost: ${quoteDetails.rebuildCost}
		Contents value insured: ${quoteDetails.contentsValue}
		Security system? ${quoteDetails.security}
		Years of no claims: ${quoteDetails.noClaims}
		Contact telephone number: ${quoteDetails.phoneNumber}`;
	
	// placeholder values for quote
	let monthly_total = 20
	emailData.monthly_total = new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(monthly_total);
    emailData.annual_total = new Intl.NumberFormat("en-IE",{minimumFractionDigits:2, maximumFractionDigits:2}).format(parseFloat(emailData.monthly_total) * 12);
    

	emailjs.send(serviceID, templateID, emailData)
	.then(() => {
                console.log("info", "Your quotation was emailed to " + emailData.email);
            })
            .catch((error) => {
                console.error("Error sending quotation:", error);
                alert("Error sending email");
            });
}