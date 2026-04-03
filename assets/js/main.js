document.addEventListener("DOMContentLoaded", () => {
  // For Navigation Menu Toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("navLinks");
  const menuIcon = menuToggle.querySelector("i");

  //   For Newsletter Subscription
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterInput = document.getElementById("newsletter-input");
  const newsletterStatus = document.getElementById("newsletter-status");
  const newsletterBtn = document.getElementById("newsletter-btn");

  // Function to toggle menu
  function toggleMenu() {
    navLinks.classList.toggle("active");

    // Check if active and swap icon
    if (navLinks.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times"); // Show X icon
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars"); // Show Hamburger icon
    }
  }

  // Click Hamburger/Close button
  menuToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking any link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
      }
    });
  });

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    const emailValue = newsletterInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
      // SUCCESS STATE
      newsletterStatus.textContent = "Successfully Subscribed!";
      newsletterStatus.style.color = "#00e5ff"; // Teal color
      newsletterInput.value = ""; // Clear input
      newsletterBtn.innerHTML = '<i class="fa fa-check"></i>'; // Change arrow to checkmark

      // Reset back after 3 seconds
      setTimeout(() => {
        newsletterStatus.textContent = "Subscribe to get the latest updates";
        newsletterStatus.style.color = "";
        newsletterBtn.innerHTML = '<i class="fa fa-arrow-right"></i>';
      }, 3000);
    } else {
      // ERROR STATE
      newsletterInput.style.borderBottom = "1px solid #ff4b2b"; // Red border
      newsletterStatus.textContent = "Please enter a valid email.";
      newsletterStatus.style.color = "#ff4b2b";

      // Reset error color on typing
      newsletterInput.addEventListener(
        "input",
        () => {
          newsletterInput.style.borderBottom =
            "1px solid rgba(0, 229, 255, 0.5)";
          newsletterStatus.textContent = "Subscribe to get the latest updates";
          newsletterStatus.style.color = "";
        },
        { once: true },
      );
    }
  });

  // --- New Service Popup Logic ---
  const serviceData = {
    web: {
      title: "Web Development",
      icon: "fa-code",
      color: "#2563eb", // Blue
      desc: "We build custom, scalable web applications designed for performance and security.",
      features: [
        "Custom Web Applications",
        "E-commerce Solutions",
        "Enterprise CMS",
        "Progressive Web Apps (PWA)",
        "API Integrations",
      ],
    },
    mobile: {
      title: "Mobile Apps",
      icon: "fa-mobile-screen-button",
      color: "#059669", // Green
      desc: "Expertly crafted native and cross-platform apps that deliver flawless user experiences.",
      features: [
        "iOS & Android Development",
        "Flutter & React Native",
        "App Store Optimization",
        "Wearable Technology Apps",
        "Backend API Sync",
      ],
    },
    design: {
      title: "UI/UX Design",
      icon: "fa-palette",
      color: "#334155", // Dark/Grey
      desc: "Intuitive, user-centric designs that merge aesthetic beauty with functional simplicity.",
      features: [
        "User Research & Personas",
        "Wireframing & Prototyping",
        "Interactive Mockups",
        "Usability Testing",
        "Design Systems",
      ],
    },
    cloud: {
      title: "Cloud Solutions",
      icon: "fa-cloud",
      color: "#d97706", // Orange
      desc: "Secure, highly available, and auto-scaling cloud infrastructure tailored to your operational demands.",
      features: [
        "AWS/Azure Management",
        "DevOps & CI/CD",
        "Serverless Architecture",
        "Cloud Migration Strategy",
        "Disaster Recovery Planning",
      ],
    },
  };

  const modalOverlay = document.getElementById("service-modal");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.getElementById("close-modal");

  // 1. Function to open the modal
  function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    // Inject content with specific styling
    modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px;">
                <div class="icon-box" style="font-size: 3rem; color: ${data.color}; background: transparent; display: inline-block;">
                    <i class="fa ${data.icon}"></i>
                </div>
                <h2 style="color: white; font-size: 2rem; margin: 15px 0 10px;">${data.title}</h2>
                <div style="width: 50px; height: 3px; background: ${data.color}; margin: 0 auto; border-radius: 10px;"></div>
            </div>
            
            <p style="color: #b0b3c1; margin-bottom: 25px; line-height: 1.6;">${data.desc}</p>
            
            <h4 style="color: white; margin-bottom: 15px; font-weight: 700; font-size: 1.1rem;">Key Capabilities:</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.features
                  .map(
                    (feat) => `
                    <li style="color: white; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.95rem;">
                        <i class="fa fa-check-circle" style="color: ${data.color};"></i>
                        ${feat}
                    </li>
                `,
                  )
                  .join("")}
            </ul>
            
            <button class="btn-primary" style="margin-top: 40px; width: 100%; justify-content: center; background-color: ${data.color};">Discuss Your Project</button>
        `;

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent main page scrolling
  }

  // 2. Function to close the modal
  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // --- EVENT LISTENERS ---

  // A. Listen to "Learn More" links
  document.querySelectorAll(".learn-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceKey = e.currentTarget.dataset.service; // Get unique data attribute
      openModal(serviceKey);
    });
  });

  // B. Listen to Close button
  closeModalBtn.addEventListener("click", closeModal);

  // C. Listen to clicking ON the blurred background overlay (to close)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // D. Listen to Escape key (to close)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  //   View All Projects Button Logic
  const viewAllBtn = document.getElementById("view-all-btn");
  const extraProjects = document.getElementById("extra-projects");

  viewAllBtn.addEventListener("click", () => {
    // Toggle the 'show' class
    extraProjects.classList.toggle("show");

    // Change button text based on state
    if (extraProjects.classList.contains("show")) {
      viewAllBtn.textContent = "Show Less Projects";

      // Scroll smoothly to the new projects
      extraProjects.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      viewAllBtn.textContent = "View All Projects";

      // Scroll back up to the top of the portfolio
      document
        .querySelector(".portfolio-section")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      icon: "fa-magic",
      title: "Smooth Transitions",
      desc: "Fluid page transitions and element animations",
    },
    {
      icon: "fa-layer-group",
      title: "Dynamic Layers",
      desc: "Multi-layered depth effects for immersive UX",
    },
    {
      icon: "fa-wind",
      title: "Interactive Motion",
      desc: "Responsive interactions triggered by user input",
    },
  ];

  let currentIndex = 0;

  const iconEl = document.querySelector("#slider-icon i");
  const titleEl = document.getElementById("slider-title");
  const descEl = document.getElementById("slider-desc");
  const dots = document.querySelectorAll(".dot");
  const card = document.getElementById("animation-card");

  function updateSlider(index) {
    // Fade out effect
    card.style.opacity = "0";
    card.style.transform = "translateY(10px)";

    setTimeout(() => {
      // Update Content
      iconEl.className = `fa ${slides[index].icon}`;
      titleEl.textContent = slides[index].title;
      descEl.textContent = slides[index].desc;

      // Update Dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      // Fade in effect
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 300);
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
  });
});

// Arrow Top Button Logic
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  // Select the hero section based on the current page's class
  const heroSection = document.querySelector(
    ".hero-section, .about-hero, .contact-hero",
  );

  if (heroSection && backToTopBtn) {
    const observerOptions = {
      root: null,
      threshold: 0,
      rootMargin: "-100px 0px 0px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the user has scrolled past the hero section, show the button
        if (!entry.isIntersecting) {
          backToTopBtn.classList.add("show");
        } else {
          backToTopBtn.classList.remove("show");
        }
      });
    }, observerOptions);

    observer.observe(heroSection);
  }

  // Scroll to top functionality
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

