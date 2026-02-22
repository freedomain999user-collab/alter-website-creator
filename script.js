document.addEventListener("DOMContentLoaded", function() {
    // Linking the IDs from your HTML
    const domainInput = document.getElementById("domain-input");
    const generateBtn = document.getElementById("generate-btn");
    const extensions = document.querySelectorAll(".ext"); // These are your .com, .net buttons

    // 1. This checks for spaces as you type
    domainInput.addEventListener("input", function() {
        let text = domainInput.value;

        // If there is a space in the name
        if (text.includes(" ")) {
            domainInput.style.border = "2px solid red"; // Box turns red
            domainInput.style.color = "red"; // Text turns red
            generateBtn.disabled = true; // Generate button gets disabled
            generateBtn.style.opacity = "0.5";
            generateBtn.style.cursor = "not-allowed";
        } else {
            // If the space is removed, everything goes back to normal
            domainInput.style.border = "";
            domainInput.style.color = "";
            
            if(text.length > 0) {
                generateBtn.disabled = false; // Generate button gets enabled
                generateBtn.style.opacity = "1";
                generateBtn.style.cursor = "pointer";
            }
        }
    });

    // 2. When you click on .com or .net below
    extensions.forEach(function(extElement) {
        extElement.addEventListener("click", function() {
            let ext = this.getAttribute("data-ext"); // Gets the clicked extension (like .com)
            let currentText = domainInput.value;

            // If the input has no spaces and is not empty
            if (!currentText.includes(" ") && currentText !== "") {
                // If a .com or something is already there, it replaces it with the new one
                let baseName = currentText.split(".")[0]; 
                domainInput.value = baseName + ext;
            }
        });
    });
});
