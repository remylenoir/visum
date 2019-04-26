document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.querySelector(".tab.login");
  const signupTab = document.querySelector(".tab.signup");
  const signupForm = document.querySelector("#signup");
  const loginForm = document.querySelector("#login");
  const closeModalBtn = document.querySelector(".modal-close");
  const loginSignupModal = document.querySelector(".modal");
  const loginSignupBtn = document.querySelector(".button.login-signup-btn");
  const mapFilterMenuContent = document.querySelector(".side-menu-content");

  //log in form modal and tab toggle
  loginTab.addEventListener("click", e => {
    let target = e.target.parentNode;
    if (target.classList.contains("active") && loginForm.classList.contains("active")) return;
    else {
      target.classList.add("active");
      signupTab.classList.remove("active");
      signupForm.classList.remove("active");
      loginForm.classList.toggle("active");
    }
  });

  signupTab.addEventListener("click", e => {
    let target = e.target.parentNode;
    if (target.classList.contains("active") && signupForm.classList.contains("active")) return;
    else {
      target.classList.add("active");
      loginTab.classList.remove("active");
      loginForm.classList.remove("active");
      signupForm.classList.toggle("active");
    }
  });

  //modal toggle
  closeModalBtn.addEventListener("click", () => {
    loginSignupModal.classList.remove("is-active");
  });

  if (loginSignupBtn) {
    loginSignupBtn.addEventListener("click", () => {
      loginSignupModal.classList.add("is-active");
    });
  }

  //navbar responsive

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
