document.addEventListener("DOMContentLoaded", function() {
    // Linking the HTML elements using their IDs
    const domainInput = document.getElementById("domainInput");
    const generateBtn = document.getElementById("generateBtn");
    const extSelect = document.getElementById("extSelect");

    // 1. This checks for spaces as you type in the input box
    domainInput.addEventListener("input", function() {
        let text = domainInput.value;

        // If there's a space in the text
        if (text.includes(" ")) {
            domainInput.style.border = "2px solid red"; // Makes the box border red
            domainInput.style.color = "red"; // Makes the text red
            generateBtn.disabled = true; // Disables the Generate button
            generateBtn.style.opacity = "0.5";
            generateBtn.style.cursor = "not-allowed";
        } else {
            // If the space is removed, return everything to normal
            domainInput.style.border = "";
            domainInput.style.color = "";
            
            // Enable the button only if the input isn't empty
            if(text.length > 0) {
                generateBtn.disabled = false; // Enables the Generate button
                generateBtn.style.opacity = "1";
                generateBtn.style.cursor = "pointer";
            }
        }
    });

    // 2. When you select '.com' or another extension from the dropdown
    extSelect.addEventListener("change", function() {
        let ext = extSelect.value;
        let currentText = domainInput.value;

        // Add the extension only if there are no spaces and the input isn't empty
        if (!currentText.includes(" ") && currentText !== "" && ext !== "") {
            // If an extension (like .com) is already there, this replaces it
            let baseName = currentText.split(".")[0];
            domainInput.value = baseName + ext;
        }
    });
});
