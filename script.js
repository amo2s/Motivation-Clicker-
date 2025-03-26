document.addEventListener("DOMContentLoaded", function () {
    const motivationText = "You are stronger than you think!";
    const motivationElement = document.getElementById("motivation");
    const signatureElement = document.getElementById("signature");
    const buttons = document.getElementById("buttons");

    let index = 0;
    function typeText() {
        if (index < motivationText.length) {
            motivationElement.innerHTML += motivationText.charAt(index);
            index++;
            setTimeout(typeText, 50);
        } else {
            setTimeout(() => {
                buttons.style.opacity = "1";
                buttons.style.transform = "translateY(0)";
                signatureElement.style.animation = "handwriting 2s forwards";
                signatureElement.style.opacity = "1";
            }, 500);
        }
    }
    typeText();

    // Confetti Effect on YES Button Click
    document.getElementById("yes").addEventListener("click", function () {
        launchConfetti();
    });

    function launchConfetti() {
        const canvas = document.getElementById("confetti");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const confettiPieces = [];

        class Confetti {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 10 + 5;
                this.speedY = Math.random() * 3 + 2;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }

            update() {
                this.y += this.speedY;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createConfetti() {
            for (let i = 0; i < 100; i++) {
                confettiPieces.push(new Confetti());
            }
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.forEach((piece) => {
                piece.update();
                piece.draw();
            });
            requestAnimationFrame(animateConfetti);
        }

        createConfetti();
        animateConfetti();
    }
});