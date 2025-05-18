document.addEventListener("DOMContentLoaded", function () {

  // Procrastinators Card Preview Hover Logic (scoped to avoid redeclaration)
  (function() {
    const cards = document.querySelectorAll('.procrastinators-card');
    const images = document.querySelectorAll('.procrastinators-preview img');

    function showImage(index) {
      images.forEach((img, i) => {
        if (parseInt(img.dataset.index) === index) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    }

    // Show first image by default
    showImage(0);

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const idx = parseInt(card.dataset.index);
        showImage(idx);
      });
    });
  })();

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

// Counters functionality
function runCounters() {
  const counters = document.querySelectorAll('.count-up');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isPercent = counter.textContent.includes('%');
    const isPlus = counter.textContent.includes('+');
    const isMillion = counter.textContent.includes('M');
    let suffix = '';
    if (isPercent) suffix = '%';
    if (isPlus) suffix = '+';
    if (isMillion) suffix = 'M';

    let current = 0;
    let increment = target / 100;
    if (isMillion) increment = target / 100;

    function updateCounter() {
      current += increment;
      if (current < target) {
        let display = current;
        if (isMillion) display = current.toFixed(2);
        else display = Math.floor(current);
        counter.textContent = display + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }
    updateCounter();
  });
}

// Use Intersection Observer to trigger when .stats section is visible
const statsSection = document.querySelector('.stats');
let countersStarted = false;

if (statsSection) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        runCounters();
        countersStarted = true;
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.3 }); // Adjust threshold as needed

  observer.observe(statsSection);
}

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

  //Show animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.scroll-animator').forEach(el => observer.observe(el));

  //Testimonials Load More
  const allCards = document.querySelectorAll('.testimonial-card');
  const loadMoreButton = document.querySelector('.testimonial-mobile-load-button');
  
  function showInitialTestimonials() {
    for (let i = 0; i < allCards.length; i++) {
      if (i < 4) {
        allCards[i].style.display = "block";
      } else {
        allCards[i].style.display = "none";
      }
    }
  }

  function showAllTestimonials() {
    for (let i = 4; i < allCards.length; i++) {
      allCards[i].style.display = "block";
    }
    loadMoreButton.style.display = "none";
  }

  function isMobile() {
    return window.innerWidth <= 480;
  }

  if (isMobile()) {
    showInitialTestimonials();

    loadMoreButton.addEventListener('click', function (e) {
      e.preventDefault();
      showAllTestimonials();
    });
  } else {
    loadMoreButton.style.display = "none";
    allCards.forEach(card => card.style.display = "block");
  }

  window.addEventListener("resize", function () {
    if (isMobile()) {
      showInitialTestimonials();
      loadMoreButton.style.display = "block";
    } else {
      loadMoreButton.style.display = "none";
      allCards.forEach(card => card.style.display = "block");
    }
  });

});
