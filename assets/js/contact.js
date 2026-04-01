document
  .getElementById("main-contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get Values
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const popup = document.getElementById("form-popup");
    const popupContent = popup.querySelector(".popup-content");
    const popupIcon = document.getElementById("popup-icon");
    const popupMsg = document.getElementById("popup-message");

    // Validation
    if (name === "" || email === "" || message === "") {
      // ERROR STATE
      showPopup(
        "Please fill in all required fields (*).",
        "fa-circle-xmark",
        "error",
      );
    } else if (!validateEmail(email)) {
      // INVALID EMAIL STATE
      showPopup(
        "Please enter a valid email address.",
        "fa-envelope-circle-check",
        "error",
      );
    } else {
      // SUCCESS STATE
      showPopup(
        "Message sent successfully! We'll be in touch.",
        "fa-circle-check",
        "success",
      );
      this.reset(); // Clear form
    }

    function showPopup(message, icon, type) {
      popupMsg.textContent = message;
      popupIcon.className = `fa ${icon}`;
      popupContent.className = `popup-content ${type}`;

      popup.classList.add("active");

      // Hide after 4 seconds
      setTimeout(() => {
        popup.classList.remove("active");
      }, 4000);
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // 1. Close all other FAQ items (The "Automatically Hide" requirement)
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // 2. Toggle the clicked item
      // If it wasn't active, make it active now
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
