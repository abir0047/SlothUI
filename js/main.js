document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const navLinks = document.querySelector(".nav-links");
  
  mobileMenuButton.addEventListener("click", function(e) {
    e.preventDefault();
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".nav-links") && 
        !e.target.closest(".mobile-menu-button")) {
      navLinks.classList.remove("active");
    }
  });

  // Close menu when clicking links
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#top") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove("active");

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // FAQ accordion functionality (enhanced)
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const summary = item.querySelector("summary");

    summary.addEventListener("click", function (e) {
      // Close other open items
      if (item.hasAttribute("open")) {
        return;
      }

      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.hasAttribute("open")) {
          otherItem.removeAttribute("open");
        }
      });
    });
  });

  // Procrastinators functionality
  const cards = document.querySelectorAll('.procrastinators-card');
  const firstCard = cards[0];
  let activeCard = null;

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Clear previous active states
      if(activeCard) {
        activeCard.classList.remove('persist-active');
        firstCard.classList.remove('persist-inactive');
      }

      // Only apply changes if it's not the first card
      if(card !== firstCard) {
        card.classList.add('persist-active');
        firstCard.classList.add('persist-inactive');
        activeCard = card;
      } else {
        // Reset to default if hovering first card
        firstCard.classList.remove('persist-inactive');
        cards.forEach(c => c.classList.remove('persist-active'));
        activeCard = null;
      }
    });
  });

});
