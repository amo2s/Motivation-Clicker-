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

  // Motivational messages for returning users
  const noReturnMessages = [
    "Changed your mind? I knew you would. Let’s go!",
    "Back again? I respect the hustle. Let’s get coding!",
    "You hesitated… but destiny brought you back. Let's do this!"
  ];

  const yesReturnMessages = [
    "Back for another round? Keep pushing, legend!",
    "Greatness is built through consistency. Let’s go!",
    "Welcome back, champion! Another mission awaits!"
  ];

  // Unique execution success messages
  const successMessages = [
    "🔥 Well done, [username]! You've just unlocked another level of greatness.",
    "🚀 Boom! Execution complete. Success is now in motion, [username].",
    "💡 Genius move, [username]! Execution isn't magic—it's strategy.",
    "✨ [username], you've executed with precision. The world bends to your will!",
    "⚡ Execution successful, [username]! Your code is your legacy."
  ];

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

  // Handle user return behavior
  let previousChoice = localStorage.getItem("userChoice");
  
  if (previousChoice === "no") {
    typingText.textContent = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
  } else if (previousChoice === "yes") {
    typingText.textContent = yesReturnMessages[Math.floor(Math.random() * yesReturnMessages.length)];
  } else {
    typingText.textContent = "";
    typeEffect(
      "Success isn't about luck—it's about discipline, resilience, and execution.",
      typingText,
      () => {
        promptText.textContent = "Are you ready to execute?";
        yesButton.style.display = "inline-block";
        noButton.style.display = "inline-block";
      }
    );
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
      promptText.innerHTML = "🚫 Fear is the enemy of progress. Return when you're ready to rise.";
      signature.textContent = "— Amos Nwaka (Sliver Boy)";
      signature.classList.add("show");
      returnBtn.style.display = "inline-block";
    }, 500);
  });

  // Enable execute button only when name is entered
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

    executeButton.innerText = "Executing...";
    setTimeout(() => {
      nameSection.style.display = "none";
      promptText.style.display = "none";
      resultSection.style.display = "block";

      let randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
      finalMessage.innerHTML = randomSuccess.replace("[username]", username);

      signature.textContent = "— Amos Nwaka (Sliver Boy)";
      signature.classList.add("show");
      returnBtn.style.display = "inline-block";
    }, 3000);
  });

  // Return button: reset page
  returnBtn.addEventListener("click", function() {
    location.reload();
  });
});