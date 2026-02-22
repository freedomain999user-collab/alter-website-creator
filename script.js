document.addEventListener("DOMContentLoaded", function() {
    const domainInput = document.getElementById("domain-input");
    const generateBtn = document.getElementById("generate-btn");
    const extensions = document.querySelectorAll(".ext");

    // 1. टाइप करते वक्त स्पेस चेक करना
    domainInput.addEventListener("input", function() {
        let text = domainInput.value;

        // अगर नाम के बीच में स्पेस है
        if (text.includes(" ")) {
            domainInput.style.border = "2px solid red";
            domainInput.style.color = "red";
            generateBtn.disabled = true;
            generateBtn.style.opacity = "0.5";
            generateBtn.style.cursor = "not-allowed";
        } else {
            // स्पेस नहीं है तो सब नॉर्मल रखो
            domainInput.style.border = "";
            domainInput.style.color = "";
            
            if(text.length > 0) {
                generateBtn.disabled = false;
                generateBtn.style.opacity = "1";
                generateBtn.style.cursor = "pointer";
            }
        }
    });

    // 2. .com, .net पर क्लिक करने पर उसे इनपुट में जोड़ना
    extensions.forEach(function(extElement) {
        extElement.addEventListener("click", function(event) {
            // closest('.ext') पक्का करेगा कि क्लिक सही जगह रजिस्टर हो
            let targetBox = event.target.closest('.ext');
            if (!targetBox) return;

            let ext = targetBox.getAttribute("data-ext"); // जैसे .com
            let currentText = domainInput.value.trim(); // फालतू स्पेस हटा देगा

            // अगर बॉक्स खाली है, तो अलर्ट देगा
            if (currentText === "") {
                alert("Please enter a website name first! (पहले कोई नाम डालो)");
                return;
            }

            // अगर स्पेस है, तो पहले स्पेस हटाओ फिर एक्सटेंशन लगाओ
            if (currentText.includes(" ")) {
                currentText = currentText.replace(/\s+/g, ''); // सारे स्पेस गायब
            }

            // अगर पहले से कोई एक्सटेंशन लगा है (.com), तो उसे हटाकर नया लगाएगा
            let baseName = currentText.split(".")[0];
            domainInput.value = baseName + ext;

            // जुड़ने के बाद बॉक्स को वापस नॉर्मल कर देगा (ताकि रेड न रहे)
            domainInput.style.border = "";
            domainInput.style.color = "";
            generateBtn.disabled = false;
            generateBtn.style.opacity = "1";
            generateBtn.style.cursor = "pointer";
        });
    });
});
