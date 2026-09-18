function validateName() {
  var nameInput = document.getElementById("name") || document.querySelector('input[name="name"]');
  var nameError = document.getElementById("nameError") || document.getElementById("name-error");
  if (!nameInput) return true;
  var val = nameInput.value.trim();
  if (val === "") {
    if (nameError) nameError.textContent = "Name cannot be empty";
    return false;
  }
  if (nameError) nameError.textContent = "";
  return true;
}

function validateEmail() {
  var emailInput = document.getElementById("email") || document.querySelector('input[name="email"]');
  var emailError = document.getElementById("emailError") || document.getElementById("email-error");
  if (!emailInput) return true;
  var val = emailInput.value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === "") {
    if (emailError) emailError.textContent = "Email cannot be empty";
    return false;
  }
  if (!emailRegex.test(val)) {
    if (emailError) emailError.textContent = "Invalid email format";
    return false;
  }
  if (emailError) emailError.textContent = "";
  return true;
}

function validatePassword() {
  var passwordInput = document.getElementById("password") || document.querySelector('input[name="password"]');
  var passwordError = document.getElementById("passwordError") || document.getElementById("password-error");
  if (!passwordInput) return true;
  var val = passwordInput.value;
  var hasUpper = /[A-Z]/.test(val);
  var hasNumber = /[0-9]/.test(val);
  if (val === "") {
    if (passwordError) passwordError.textContent = "Password cannot be empty";
    return false;
  }
  if (val.length < 8 || !hasUpper || !hasNumber) {
    if (passwordError) passwordError.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, and include at least one number.";
    return false;
  }
  if (passwordError) passwordError.textContent = "";
  return true;
}

function validateConfirmPassword() {
  var passwordInput = document.getElementById("password") || document.querySelector('input[name="password"]');
  var confirmInput = document.getElementById("confirmPassword") || document.querySelector('input[name="confirmPassword"]') || document.getElementById("confirm-password");
  var confirmError = document.getElementById("confirmPasswordError") || document.getElementById("confirm-password-error") || document.getElementById("confirmError");
  if (!confirmInput) return true;
  var passwordVal = passwordInput ? passwordInput.value : "";
  var confirmVal = confirmInput.value;
  if (confirmVal === "") {
    if (confirmError) confirmError.textContent = "Confirm Password cannot be empty";
    return false;
  }
  if (confirmVal !== passwordVal) {
    if (confirmError) confirmError.textContent = "Passwords do not match";
    return false;
  }
  if (confirmError) confirmError.textContent = "";
  return true;
}

function validateForm(e) {
  var isNameValid = validateName();
  var isEmailValid = validateEmail();
  var isPasswordValid = validatePassword();
  var isConfirmValid = validateConfirmPassword();

  var isValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;

  var successElem = document.getElementById("successMessage") || document.getElementById("result") || document.getElementById("message");

  if (!isValid) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (successElem) {
      successElem.textContent = "";
    }
    return false;
  }

  if (successElem) {
    successElem.textContent = "Form submitted successfully!";
  }

  if (e && e.preventDefault) {
    e.preventDefault();
  }

  return true;
}

function validate(e) {
  return validateForm(e);
}

function init() {
  var form = document.getElementById("form") || document.getElementById("registrationForm") || document.querySelector("form");
  if (form && !form.getAttribute("onsubmit")) {
    form.addEventListener("submit", validateForm);
    form.onsubmit = validateForm;
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
