// Select the theme toggle button
const themeToggleButton = document.querySelector(".theme-toggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Smooth Scroll
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter__button");
const projectCards = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
