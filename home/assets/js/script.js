/* Student Name: Joanne Brennan Elliott 
 Student Number: X23410001
 script.js file for Home Insurance form submission
 Date: 7th November 2025 
*/


function mySubmit() {      	  

	if (!document.getElementById("gridCheck").checked) {
	 alert("You must agree to the Terms & Conditions before submitting the form.");
	 return;
   }
   else {
		 // Proceed with form submission
		 //alert("Form submitted successfully!");	
	
		let userName = document.getElementById("fname").value.trim();   
		document.getElementById("fname").innerHTML =  userName;      
		let userEmail = document.getElementById("email").value;   
		document.getElementById("email").innerHTML =  userEmail.trim();     

		if (userName === "" || userEmail === "") {
		alert("Please fill in your full name please.");
		return;
		}
	
		if (!userEmail.includes("@") || !userEmail.includes(".")) {
			alert("Please enter a valid email address.");
			return;
		} 

		let phoneNumber = document.getElementById("phoneNumber").value.trim();    // <!--  - Validate phone number  -->
		document.getElementById("phoneNumber").innerHTML =  phoneNumber;   
		phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters	   
		if (phoneNumber === "") {
		alert("Please fill in your phone number with numbers only please.");
		return;
		}
		if (phoneNumber.length < 10) {
		alert("Please enter a valid phone number with at least 10 digits.");
		return;
		}	
							 
		//alert(userName+ ", thank you for your details. We will be in touch shortly.");
		alert("Hi " +userName+ ", Thank you for your details. \nWe will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");  
	//	alert(userName+ ", Thank you for your details.  "<br> " We will be in touch shortly via the email you provided " +userEmail+ " or your phone number you provided " +phoneNumber+ ".");
		hide();
		form.reset(); // Reset the form after submission
	}

}
function hide(){
//document.getElementById("MySubmit").style.display = "none";
}