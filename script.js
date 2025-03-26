document.addEventListener("DOMContentLoaded", function () {
    const typingText = document.querySelector('.typing');
    const promptText = document.querySelector('.prompt');
    const yesButton = document.getElementById('yes-btn');
    const noButton = document.getElementById('no-btn');
    const nameSection = document.getElementById('name-section');
    const executeButton = document.getElementById('execute-btn');
    const usernameInput = document.getElementById('username');
    const resultSection = document.querySelector('.result');
    const finalMessage = document.querySelector('.final-message');
    const signature = document.querySelector('.signature');
    const cup = document.querySelector('.cup');

    let motivation = `"Success isn't about luck—it’s about discipline, resilience, and execution. 
    Every step forward brings you closer. Don’t fear failure—debug it. 
    First-class isn’t a dream; it’s a decision. Rise, push forward, and EXECUTE!"`;

    let index = 0;

    function typeEffect() {
        if (index < motivation.length) {
            typingText.textContent += motivation[index];
            index++;
            setTimeout(typeEffect, 50);
        } else {
            setTimeout(() => {
                promptText.textContent = "Are you ready to execute? 🚀";
                yesButton.style.display = "inline-block";
                noButton.style.display = "inline-block";
            }, 1000);
        }
    }
    typeEffect();

    // "YES" button logic
    yesButton.addEventListener('click', function () {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        typingText.style.opacity = "0";

        setTimeout(() => {
            typingText.style.display = "none";
            promptText.textContent = "Enter your name to begin execution.";
            nameSection.style.display = "block";
            usernameInput.style.display = "inline-block";
            executeButton.style.display = "inline-block";
        }, 500);
    });

    // "NO" button logic (Fixed)
    noButton.addEventListener('click', function () {
        yesButton.style.display = "none";
        noButton.style.display = "none";
        typingText.style.opacity = "0";

        setTimeout(() => {
            typingText.style.display = "none";
            promptText.innerHTML = `"Not everyone is ready, and that’s okay. But hesitation delays greatness. 
            When you’re ready, I’ll be here."`;
            signature.style.display = "block";
            signature.classList.add("signature-animate");
        }, 500);
    });

    // Execute button logic
    usernameInput.addEventListener("input", function () {
        executeButton.disabled = !usernameInput.value.trim();
    });

    executeButton.addEventListener('click', function () {
        let username = usernameInput.value.trim();
        if (!username) {
            alert("Enter your name to execute!");
            return;
        }

        executeButton.innerText = "Compiling...";
        executeButton.style.background = "#ffcc00";

        setTimeout(() => {
            executeButton.innerText = "Executing...";
            
            setTimeout(() => {
                typingText.style.display = "none";
                promptText.style.display = "none";
                nameSection.style.display = "none";
                resultSection.style.display = "block";
                finalMessage.innerHTML = `Well done, <strong>${username}</strong>! 🎉 You've executed with excellence.<br><br> 
                Stay disciplined, stay focused, and keep moving forward. First-class is **YOURS** for the taking. 
                Success is not magic—it’s execution. 🚀<br><br>
                <strong class="signature-glow">— Amos Nwaka (Sliver Boy) 🚀</strong>`;

                cup.style.display = "block";
                signature.style.display = "block";
                signature.classList.add("signature-animate");

                // Trigger confetti
                startConfetti();

            }, 3000);
        }, 3000);
    });

    // Confetti function
    function startConfetti() {
        const confettiSettings = { target: 'confetti-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    }
});