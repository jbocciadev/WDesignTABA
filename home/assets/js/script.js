/* Student Name: Joanne Brennan Elliott 
 Student Number: X23410001
*/


function mySubmit() {      

	let form = document.getElementById("myForm");
	
	 let userName = document.getElementById("fname").value.trim();   
	 document.getElementById("fname").innerHTML =  userName;      
	 let userEmail = document.getElementById("email").value;   
	 document.getElementById("email").innerHTML =  userEmail.trim();     

	if (userName === "" || userEmail === "") {
     alert("Please fill in all fields.");
     return;
   }
  
   if (!userEmail.includes("@") || !userEmail.includes(".")) {
     alert("Please enter a valid email address.");
     return;
   } 
	 //alert(userName+ ", thank you for your details. We will be in touch shortly.");
	 alert(userName+ ", thank you for your details. We will be in touch via " +userEmail+ " shortly.");
	hide();
}

function hide(){
//document.getElementById("MySubmit").style.display = "none";
}