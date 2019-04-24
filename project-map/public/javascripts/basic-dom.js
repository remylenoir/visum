const loginTab = document.querySelector(".tab.login");
const signupTab = document.querySelector(".tab.signup");
const signupForm = document.querySelector("#signup");
const loginForm = document.querySelector("#login");

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
