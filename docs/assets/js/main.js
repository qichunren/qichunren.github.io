document.addEventListener("DOMContentLoaded",function(){  
  var checked_scroll_y = 0;
  var header = document.getElementById("header");
  var scrolltop = document.getElementById("scrolltop");

  scrolltop.addEventListener("click", function() {
    window.scrollTo(0, 0);
  });

  window.addEventListener("scroll", function(e) {
    console.log("scrollHeight", document.documentElement.scrollHeight);
    if(window.scrollY - checked_scroll_y > 30) {
      console.log("Detect scroll down", window.scrollY);
      checked_scroll_y = window.scrollY;      
      header.classList.add("hidden");
    } else if(checked_scroll_y - window.scrollY > 30) {
      console.log("Detect scroll up", window.scrollY);
      checked_scroll_y = window.scrollY;
      header.classList.remove("hidden");      
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight/3) {
      scrolltop.classList.remove("hidden");
    } else {
      scrolltop.classList.add("hidden");
    }
    if(window.scrollY > 200) {
      document.getElementById("content_header").classList.remove("hidden")
    } else {
      document.getElementById("content_header").classList.add("hidden");
    }
    
  });
});