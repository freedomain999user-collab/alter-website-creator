document.addEventListener("DOMContentLoaded", function() {
    const domainInput = document.getElementById("domain-input");
    const generateBtn = document.getElementById("generate-btn");
    const extensions = document.querySelectorAll(".ext");
    
    // Modal Elements
    const modal = document.getElementById("domain-modal");
    const closeModal = document.getElementById("close-modal");

    // 1. Check for spaces while typing
    domainInput.addEventListener("input", function() {
        let text = domainInput.value;

        // If there is a space in the name
        if (text.includes(" ")) {
            domainInput.style.border = "2px solid red";
            domainInput.style.color = "red";
            generateBtn.disabled = true;
            generateBtn.style.opacity = "0.5";
            generateBtn.style.cursor = "not-allowed";
        } else {
            // No space, keep it normal
            domainInput.style.border = "";
            domainInput.style.color = "";
            
            if(text.length > 0) {
                generateBtn.disabled = false;
                generateBtn.style.opacity = "1";
                generateBtn.style.cursor = "pointer";
            }
        }
    });

    // 2. Add extension to input on click
    extensions.forEach(function(extElement) {
        extElement.addEventListener("click", function(event) {
            // Ensure click registers correctly
            let targetBox = event.target.closest('.ext');
            if (!targetBox) return;

            let ext = targetBox.getAttribute("data-ext"); // e.g. .com
            let currentText = domainInput.value.trim(); // Remove extra spaces

            // If input is empty, alert user
            if (currentText === "") {
                alert("Please enter a website name first!");
                return;
            }

            // Remove spaces before adding extension
            if (currentText.includes(" ")) {
                currentText = currentText.replace(/\s+/g, ''); // Remove all spaces
            }

            // Replace existing extension if any, and append the new one
            let baseName = currentText.split(".")[0];
            domainInput.value = baseName + ext;

            // Reset input styles after adding extension
            domainInput.style.border = "";
            domainInput.style.color = "";
            generateBtn.disabled = false;
            generateBtn.style.opacity = "1";
            generateBtn.style.cursor = "pointer";
        });
    });

    // 3. Show Popup Modal when Generate button is clicked
    generateBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Stop page from refreshing
        
        let currentText = domainInput.value.trim();
        if (currentText === "") {
            alert("Please enter a domain name first!");
            return;
        }

        // Display the modal
        modal.style.display = "flex";
    });

    // 4. Close Popup when "X" is clicked
    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // 5. Close Popup when clicking outside the box
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
const proceedBtn = document.getElementById("proceed-btn");
    
proceedBtn.addEventListener("click", function(e) {
    e.preventDefault();
    
    let finalDomain = document.getElementById("domain-input").value.trim();

    var options = {
        "key": "rzp_test_YOUR_DUMMY_KEY", 
        "amount": "19900", 
        "currency": "INR",
        "name": "Alter Website Creator",
        "description": finalDomain + " Domain Purchase",
        "image": "https://dummyimage.com/100x100/000/fff&text=A", 
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            document.getElementById("domain-modal").style.display = "none"; 
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "theme": {
            "color": "#28a745" 
        }
    };

    var rzp1 = new Razorpay(options);
    
    rzp1.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
    });

    rzp1.open();
});
