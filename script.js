document.addEventListener("DOMContentLoaded", function () {
    const typingText = document.querySelector('.typing');
    const yesButton = document.getElementById('yes-btn');
    const noButton = document.getElementById('no-btn');
    const nameSection = document.querySelector('.glass-input-container');
    const executeButton = document.getElementById('execute-btn');
    const usernameInput = document.getElementById('username');
    const resultSection = document.querySelector('.result');
    const finalMessage = document.querySelector('.final-message');
    const signature = document.querySelector('.signature');

    const motivation = `"Success isn't luck—it’s discipline, resilience, and execution. 
    Every step forward brings you closer. Debug failures, push through challenges, and EXECUTE!"`;

    let index = 0;

    function typeEffect() {
        if (index < motivation.length) {
            typingText.textContent += motivation[index];
            index++;
            setTimeout(typeEffect, 50);
        } else {
            setTimeout(() => {
                yesButton.style.display = "inline-block";
                noButton.style.display = "inline-block";
            }, 500);
        }
    }
    typeEffect();

    yesButton.addEventListener('click', function () {
        fadeOut(typingText, () => {
            nameSection.style.display = "block";
        });
    });

    noButton.addEventListener('click', function () {
        fadeOut(typingText, () => {
            finalMessage.innerHTML = `"Not everyone is ready, and that’s okay. But hesitation delays greatness."`;
            fadeIn(signature);
        });
    });

    executeButton.addEventListener('click', function () {
        let username = usernameInput.value.trim();
        if (!username) {
            alert("Enter your name to execute!");
            return;
        }

        executeButton.textContent = "Executing...";
        setTimeout(() => {
            fadeOut(nameSection, () => {
                finalMessage.innerHTML = `Well done, <strong>${username}</strong>! 🎉 You've executed with excellence.<br>Success isn’t magic—it’s execution. 🚀<br><strong>— Amos Nwaka (Sliver Boy) 🚀</strong>`;
                fadeIn(signature);
                startConfetti();
            });
        }, 2000);
    });

    function fadeOut(element, callback) {
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.display = "none";
            if (callback) callback();
        }, 500);
    }

    function fadeIn(element) {
        element.style.display = "block";
        setTimeout(() => {
            element.style.opacity = "1";
        }, 50);
    }

    function startConfetti() {
        const confettiSettings = { target: 'confetti-canvas' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    }
});