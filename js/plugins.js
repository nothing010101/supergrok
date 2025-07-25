// plugin.js — Basic behavior plugin for SuperGrok

document.addEventListener("DOMContentLoaded", function () { console.log("[plugin.js] SuperGrok plugins initialized ✅");

// === Menu Toggle (for mobile menu if needed) const menuBtn = document.getElementById("menu-btn"); const mainMenu = document.getElementById("mainmenu");

if (menuBtn && mainMenu) { menuBtn.addEventListener("click", function () { mainMenu.classList.toggle("menu-opened"); }); }

// === Back to top === const backToTop = document.getElementById("back-to-top"); window.addEventListener("scroll", function () { if (window.scrollY > 300) { backToTop.classList.add("visible"); } else { backToTop.classList.remove("visible"); } });

backToTop?.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

// === Animate on scroll: activate elements with class .wow === const animated = document.querySelectorAll(".wow"); const observer = new IntersectionObserver( entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("animated-visible"); } }); }, { threshold: 0.1 } );

animated.forEach(el => observer.observe(el));

// === Jarallax background video fallback const videos = document.querySelectorAll("video.jarallax-img"); videos.forEach(video => { video.play().catch(e => { console.warn("[plugin.js] Video autoplay failed, user interaction required."); }); }); });

