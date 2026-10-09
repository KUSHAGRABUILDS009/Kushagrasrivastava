/* =========================================
   KUSHAGRA BUILDS
   Portfolio Interactions
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  // -----------------------------------------
  // 1. INTRO LOADER
  // -----------------------------------------

  const loader = document.getElementById("loader");

  function hideLoader() {
    if (loader) {
      loader.classList.add("hidden");
    }
  }

  // Keep the intro short so visitors reach the site quickly.
  window.setTimeout(hideLoader, 1000);

  // Also hide it when the page finishes loading.
  window.addEventListener("load", function () {
    window.setTimeout(hideLoader, 250);
  });


  // -----------------------------------------
  // 2. MOBILE NAVIGATION
  // -----------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  function closeMenu() {
    if (!menuToggle || !nav) return;

    menuToggle.classList.remove("active");
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close the menu after choosing a section.
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu if the user presses Escape.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close the mobile menu if the viewport becomes wider.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // -----------------------------------------
  // 3. PROJECT CASE STUDIES
  // -----------------------------------------

  const detailButtons = document.querySelectorAll(".details-toggle");

  detailButtons.forEach(function (button) {
    const details = button.nextElementSibling;

    if (!details || !details.classList.contains("project-details")) {
      return;
    }

    button.setAttribute("aria-expanded", "false");
    details.classList.remove("open");

    button.addEventListener("click", function () {
      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      // Toggle the selected case study.
      button.setAttribute("aria-expanded", String(!isExpanded));
      details.classList.toggle("open", !isExpanded);

      // Update the button label.
      const label = button.childNodes[0];

      if (label && label.nodeType === Node.TEXT_NODE) {
        label.textContent = isExpanded
          ? "Read case study "
          : "Close case study ";
      }
    });
  });


  // -----------------------------------------
  // 4. BACK-TO-TOP BUTTON
  // -----------------------------------------

  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 450) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // -----------------------------------------
  // 5. AUTOMATIC FOOTER YEAR
  // -----------------------------------------

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // -----------------------------------------
  // 6. ACTIVE NAVIGATION HIGHLIGHT
  // -----------------------------------------

  const sections = document.querySelectorAll("main section[id]");
  const desktopQuery = window.matchMedia("(min-width: 761px)");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navLinks.forEach(function (link) {
            const href = link.getAttribute("href");

            if (href === "#" + sectionId) {
              link.classList.add("active-link");
            } else {
              link.classList.remove("active-link");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  // -----------------------------------------
  // 7. OPTIONAL PROFILE PHOTO
  // -----------------------------------------
  // Add this to index.html when a portrait is ready:
  //
  // <img src="assets/kushagra.jpg"
  //      alt="Kushagra Srivastava">
  //
  // Keep the image inside the website folder.
  // No photo is required for the current design.


  // -----------------------------------------
  // 8. OPTIONAL DESKTOP CARD TILT
  // -----------------------------------------
  // Deliberately disabled on touch devices to keep
  // mobile scrolling smooth and predictable.

  if (desktopQuery.matches &&
      window.matchMedia("(hover: hover)").matches) {

    const cards = document.querySelectorAll(
      ".project-card, .info-card, .background-card"
    );

    cards.forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--pointer-x", x + "px");
        card.style.setProperty("--pointer-y", y + "px");
      });
    });
  }


  // -----------------------------------------
  // 9. REDUCE ANIMATION FOR ACCESSIBILITY
  // -----------------------------------------

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches && loader) {
    hideLoader();
  }

});