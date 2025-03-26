document.addEventListener("DOMContentLoaded", function() {
  // ELEMENT SELECTION
  const title = document.querySelector(".title");
  const header = document.querySelector("header");
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

  // ARRAYS FOR DYNAMIC RETURN MESSAGES
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

  // DEFAULT MOTIVATIONAL TEXT
  const defaultMotivationText = `Success isn't about luck—it's about discipline, resilience, and execution.
Every step forward brings you closer. Don't fear failure—debug it.
First-class isn't a dream; it's a decision. Rise, push forward, and execute!`;

  // Determine which message to show (for returning users)
  let userChoice = localStorage.getItem("userChoice");
  let dynamicMotivationText = "";
  if (userChoice === "yes") {
    dynamicMotivationText = yesReturnMessages[Math.floor(Math.random() * yesReturnMessages.length)];
  } else if (userChoice === "no") {
    dynamicMotivationText = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
  } else {
    dynamicMotivationText = defaultMotivationText;
  }

  // HEADER FADE‑IN EFFECT
  header.style.opacity = "0";
  header.style.transform = "translateY(-20px)";
  setTimeout(() => {
    header.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 500);

  // Set signature to initial invisible state (to fade in later)
  signature.style.opacity = "0";

  // TYPE EFFECT FUNCTION
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

  // Start typing the motivational text (or dynamic return message)
  typeEffect(dynamicMotivationText, typingText, () => {
    // After typing finishes, wait 1 second then display the prompt and fade in the buttons.
    setTimeout(() => {
      promptText.textContent = "Are you ready to execute?";
      // Prepare buttons for a smooth fade‑in:
      yesButton.style.opacity = "0";
      noButton.style.opacity = "0";
      yesButton.style.display = "inline-block";
      noButton.style.display = "inline-block";
      yesButton.style.transition = "opacity 1s";
      noButton.style.transition = "opacity 1s";
      setTimeout(() => {
        yesButton.style.opacity = "1";
        noButton.style.opacity = "1";
      }, 200);
    }, 1000);
  });

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
      // Randomly pick one of the NO messages to display
      let randomNo = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
      promptText.innerHTML = randomNo;
      // Fade in the premium signature
      signature.textContent = "— Amos Nwaka (Sliver Boy)";
      signature.style.transition = "opacity 1.5s ease-out";
      signature.style.opacity = "1";
      // Display the Return button
      returnBtn.style.display = "inline-block";
    }, 500);
  });

  // Enable the Execute button when input is entered
  usernameInput.addEventListener("input", function() {
    executeButton.disabled = !usernameInput.value.trim();
  });

  // Success messages array for execution result
  const successMessages = [
    "🔥 Well done, [username]! You've just unlocked another level of greatness. Keep executing, keep winning!",
    "🚀 Boom! Execution complete. Success is now in motion, [username]. Your journey to the top continues!",
    "💡 Genius move, [username]! Execution isn't magic—it's strategy. Stay sharp and conquer!",
    "✨ [username], you've executed with precision. The world bends to your will. Onward to victory!",
    "⚡ Execution successful, [username]! Your code is your legacy. Build, dominate, and inspire!"
  ];

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
        // Fade in signature if not already visible
        signature.textContent = "— Amos Nwaka (Sliver Boy)";
        signature.style.transition = "opacity 1.5s ease-out";
        signature.style.opacity = "1";
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