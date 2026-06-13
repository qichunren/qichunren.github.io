document.addEventListener("DOMContentLoaded", function () {
  var checked_scroll_y = 0;
  var header = document.getElementById("header");
  var scrolltop = document.getElementById("scrolltop");
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");

  if (navToggle && navContent) {
    navToggle.addEventListener("click", function () {
      navContent.classList.toggle("hidden");
    });
  }

  if (scrolltop) {
    scrolltop.addEventListener("click", function () {
      window.scrollTo(0, 0);
    });
  }

  window.addEventListener("scroll", function () {
    if (header) {
      if (window.scrollY - checked_scroll_y > 30) {
        checked_scroll_y = window.scrollY;
        header.classList.add("hidden");
      } else if (checked_scroll_y - window.scrollY > 30) {
        checked_scroll_y = window.scrollY;
        header.classList.remove("hidden");
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
