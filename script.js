document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector(".title");
  const typingText = document.querySelector(".typing");
  const promptText = document.querySelector(".prompt");
  const yesButton = document.getElementById("yes-btn");
  const noButton = document.getElementById("no-btn");
  const nameSection = document.getElementById("name-section");
  const executeButton = document.getElementById("execute-btn");
  const usernameInput = document.getElementById("username");
  const resultSection = document.querySelector(".result");
  const finalMessage = document.querySelector(".final-message");
  const signature = document.querySelector(".signature");
  const returnBtn = document.getElementById("return-btn");

  // Arrays for dynamic return messages
  const yesReturnMessages = [
    "Back for another round? Keep pushing, legend!",
    "Greatness is built through consistency. Let’s go!",
    "Welcome back, champion! Another mission awaits!"
  ];

  const noReturnMessages = [
    "Changed your mind? I knew you would. Let’s go!",
    "Back again? I respect the hustle. Let’s get coding!",
    "You hesitated… but destiny brought you back. Let's do this!"
  ];

  // Unique messages for execution success
  const successMessages = [
    "🔥 Well done, [username]! You've just unlocked another level of greatness. Keep executing, keep winning!",
    "🚀 Boom! Execution complete. Success is now in motion, [username]. Your journey to the top continues!",
    "💡 Genius move, [username]! Execution isn't magic—it's strategy. Stay sharp and conquer!",
    "✨ [username], you've executed with precision. The world bends to your will. Onward to victory!",
    "⚡ Execution successful, [username]! Your code is your legacy. Build, dominate, and inspire!"
  ];

  // Initial motivational text to type out
  const motivationText = `Success isn't about luck—it's about discipline, resilience, and execution.
Every step forward brings you closer. Don't fear failure—debug it.
First-class isn't a dream; it's a decision. Rise, push forward, and execute!`;

  // Use localStorage to decide what message to show if user is returning
  let previousChoice = localStorage.getItem("userChoice");

  // Helper: set a random message immediately if user is returning
  if (previousChoice === "yes") {
    typingText.textContent = yesReturnMessages[Math.floor(Math.random() * yesReturnMessages.length)];
    promptText.textContent = "Ready to execute again?";
    // Show the buttons after a short delay
    setTimeout(() => {
      yesButton.style.display = "inline-block";
      noButton.style.display = "inline-block";
    }, 500);
  } else if (previousChoice === "no") {
    typingText.textContent = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
    promptText.textContent = "Ready to try again?";
    setTimeout(() => {
      yesButton.style.display = "inline-block";
      noButton.style.display = "inline-block";
    }, 500);
  } else {
    // First-time visitor: use the typing effect
    let index = 0;
    function typeEffect(text, element, callback) {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
        setTimeout(() => typeEffect(text, element, callback), 50);
      } else {
        if (callback) callback();
      }
    }
    typeEffect(motivationText, typingText, () => {
      setTimeout(() => {
        promptText.textContent = "Are you ready to execute?";
        yesButton.style.display = "inline-block";
        noButton.style.display = "inline-block";
      }, 1000);
    });
  }

  // YES button action
  yesButton.addEventListener("click", function() {
    localStorage.setItem("userChoice", "yes");
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

  // NO button action
  noButton.addEventListener("click", function() {
    localStorage.setItem("userChoice", "no");
    yesButton.style.display = "none";
    noButton.style.display = "none";
    typingText.style.opacity = "0";
    setTimeout(() => {
      typingText.style.display = "none";
      // Randomly pick a NO message from our array
      let randomNo = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
      promptText.innerHTML = randomNo;
      // Show the premium signature (ensure your CSS defines a fade-in for .show)
      signature.textContent = "— Amos Nwaka (Sliver Boy)";
      signature.classList.add("show");
      // Display the Return button so user can go back
      returnBtn.style.display = "inline-block";
    }, 500);
  });

  // Enable the execute button when input is entered
  usernameInput.addEventListener("input", function() {
    executeButton.disabled = !usernameInput.value.trim();
  });

  // Execute button action
  executeButton.addEventListener("click", function() {
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
        nameSection.style.display = "none";
        promptText.style.display = "none";
        resultSection.style.display = "block";
        // Randomly pick a success message and replace [username]
        let randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
        finalMessage.innerHTML = randomSuccess.replace("[username]", username);
        // Show the premium signature
        signature.textContent = "— Amos Nwaka (Sliver Boy)";
        signature.classList.add("show");
        // Display the Return button
        returnBtn.style.display = "inline-block";
        // Trigger confetti effect (if the library is loaded)
        let confettiSettings = { target: 'confetti-canvas' };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
      }, 3000);
    }, 3000);
  });

  // Return button: reset the page to the initial state
  returnBtn.addEventListener("click", function() {
    location.reload();
  });
});