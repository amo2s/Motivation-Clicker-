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

  // Unique messages for execution success
  const successMessages = [
    "🔥 Well done, [username]! You've just unlocked another level of greatness. Keep executing, keep winning!",
    "🚀 Boom! Execution complete. Success is now in motion, [username]. Your journey to the top continues!",
    "💡 Genius move, [username]! Execution isn't magic—it's strategy. Stay sharp and conquer!",
    "✨ [username], you've executed with precision. The world bends to your will. Onward to victory!",
    "⚡ Execution successful, [username]! Your code is your legacy. Build, dominate, and inspire!"
  ];

  // Unique messages for when user clicks NO
  const noMessages = [
    "🤔 Maybe you're not ready... but hesitation only delays greatness. When you're ready, I'll be here.",
    "⏳ A moment's doubt can cost you the crown. Don't let hesitation hold you back.",
    "❌ The path to success is for the brave. Step up or remain in the shadows.",
    "🌑 Inaction breeds regret. Every moment counts. Return when you're ready to rise.",
    "🚫 Fear is the enemy of progress. Face it, overcome it, and let execution define you."
  ];

  // Initial motivational text (typed out)
  const motivationText = `Success isn't about luck—it's about discipline, resilience, and execution.
Every step forward brings you closer. Don't fear failure—debug it.
First-class isn't a dream; it's a decision. Rise, push forward, and execute!`;

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

  // Start the initial typing effect
  typeEffect(motivationText, typingText, () => {
    setTimeout(() => {
      promptText.textContent = "Are you ready to execute?";
      yesButton.style.display = "inline-block";
      noButton.style.display = "inline-block";
    }, 1000);
  });

  // YES button action
  yesButton.addEventListener("click", function() {
    // (Optional: Play a "whoosh" sound effect here)
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
    yesButton.style.display = "none";
    noButton.style.display = "none";
    typingText.style.opacity = "0";
    setTimeout(() => {
      typingText.style.display = "none";
      // Randomly pick a NO message
      let randomNo = noMessages[Math.floor(Math.random() * noMessages.length)];
      promptText.innerHTML = randomNo;
      // Show the premium signature
      signature.textContent = "— Amos Nwaka (Sliver Boy)";
      signature.classList.add("show");
      // Display the Return button
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

  // Return button: reset the page to initial state
  returnBtn.addEventListener("click", function() {
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function () {
    // Smooth fade-in effect for the header
    const header = document.querySelector("header");
    header.style.opacity = "0";
    header.style.transform = "translateY(-20px)";
    setTimeout(() => {
        header.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
    }, 500);

    // Smooth fade-in effect for the signature
    const signature = document.querySelector(".signature");
    if (signature) {
        signature.style.opacity = "0";
        signature.style.transform = "translateY(20px)";
        setTimeout(() => {
            signature.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
            signature.style.opacity = "1";
            signature.style.transform = "translateY(0)";
        }, 1000);
    }

    // Function to show Yes/No options only after the message appears
    function showOptions() {
        const options = document.getElementById("yesNoOptions");
        options.style.display = "block";
        options.style.opacity = "0";
        setTimeout(() => {
            options.style.transition = "opacity 1s ease-in-out";
            options.style.opacity = "1";
        }, 1000); // Delay to make it appear after the message
    }

    // Example function when Execute is clicked
    document.getElementById("executeButton").addEventListener("click", function () {
        const message = document.getElementById("resultMessage");
        message.innerHTML = "Congratulations! 🎉";  // Example success message
        message.style.display = "block";

        setTimeout(showOptions, 1200); // Show Yes/No options after message appears
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const typingText = document.querySelector(".typing");
  const promptText = document.querySelector(".prompt");
  const yesButton = document.getElementById("yes-btn");
  const noButton = document.getElementById("no-btn");

  // Hide buttons initially
  yesButton.style.display = "none";
  noButton.style.display = "none";

  // Different messages based on user return type
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

  // Check if user has returned and what they chose before
  let previousChoice = localStorage.getItem("userChoice");

  // If user is returning, show a dynamic message
  if (previousChoice === "no") {
    typingText.textContent = noReturnMessages[Math.floor(Math.random() * noReturnMessages.length)];
  } else if (previousChoice === "yes") {
    typingText.textContent = yesReturnMessages[Math.floor(Math.random() * yesReturnMessages.length)];
  } else {
    // Default motivational text for first-time users
    typingText.textContent = "Success isn't about luck—it's about discipline, resilience, and execution.";
  }

  // Wait for message to display, then show buttons
  setTimeout(() => {
    promptText.textContent = "Are you ready to execute?";
    setTimeout(() => {
      yesButton.style.display = "inline-block";
      noButton.style.display = "inline-block";
    }, 500);
  }, 1500);

  // Store user's choice in localStorage
  yesButton.addEventListener("click", function () {
    localStorage.setItem("userChoice", "yes");
  });

  noButton.addEventListener("click", function () {
    localStorage.setItem("userChoice", "no");
  });
});