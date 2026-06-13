document.addEventListener("DOMContentLoaded", function () {
  var checked_scroll_y = 0;
  var header = document.getElementById("header");
  var scrolltop = document.getElementById("scrolltop");
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");
  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("theme-icon-sun");
  var moonIcon = document.getElementById("theme-icon-moon");

  function updateThemeIcon() {
    if (!sunIcon || !moonIcon) return;
    var isDark = document.documentElement.classList.contains("dark") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches &&
       !document.documentElement.classList.contains("light"));
    sunIcon.classList.toggle("hidden", !isDark);
    moonIcon.classList.toggle("hidden", isDark);
  }

  function applyTheme(theme) {
    document.documentElement.classList.remove("dark", "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", theme);
    updateThemeIcon();
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var currentIsDark = document.documentElement.classList.contains("dark") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches &&
         !document.documentElement.classList.contains("light"));
      applyTheme(currentIsDark ? "light" : "dark");
    });
  }

  if (navToggle && navContent) {
    navToggle.addEventListener("click", function () {
      navContent.classList.toggle("hidden");
    });
  }

  if (scrolltop) {
    scrolltop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", function () {
    if (header) {
      if (window.scrollY - checked_scroll_y > 30) {
        checked_scroll_y = window.scrollY;
        header.style.transform = "translateY(-100%)";
      } else if (checked_scroll_y - window.scrollY > 30) {
        checked_scroll_y = window.scrollY;
        header.style.transform = "translateY(0)";
      }
    }

    if (scrolltop) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight / 3) {
        scrolltop.classList.remove("hidden");
      } else {
        scrolltop.classList.add("hidden");
      }
    }

    var contentHeader = document.getElementById("content_header");
    if (contentHeader) {
      if (window.scrollY > 200) {
        contentHeader.classList.remove("hidden");
      } else {
        contentHeader.classList.add("hidden");
      }
    }
  });
});
