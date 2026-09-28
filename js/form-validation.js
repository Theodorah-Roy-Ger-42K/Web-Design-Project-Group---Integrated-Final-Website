// js/form-validation.js
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

function showError(input, msg) {
  document.getElementById(input.id + 'Error').textContent = msg;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  document.getElementById(input.id + 'Error').textContent = '';
  input.removeAttribute('aria-invalid');
}

function validate(input) {
  const v = input.value.trim();
  if (input.required && !v) {
    showError(input, 'This field is required.');
    return false;
  }
  if (input.id === 'name' && (v.length < 2 || !/\p{L}/u.test(v))) {
  showError(input, 'Enter your full name (at least 2 characters, with letters).');
  return false;
}
  if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    showError(input, 'Enter a valid email address.');
    return false;
  }
  if (input.id === 'message' && v.length < 10) {
    showError(input, 'Message must be at least 10 characters.');
    return false;
  }
  clearError(input);
  return true;
}

if (form) {
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('blur', () => validate(el));

    el.addEventListener('input', () => {
      // Hide the old success message as soon as the user edits again
      success.hidden = true;
      // Re-check live so a stale error clears while typing
      if (el.getAttribute('aria-invalid') === 'true') validate(el);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [...form.elements].filter(el => el.id).map(validate).every(Boolean);
    if (ok) {
      success.hidden = false;
      success.textContent = 'Thank you! Your enquiry has been sent.';
      form.reset();
    } else {
      success.hidden = true;
      form.querySelector('[aria-invalid="true"]').focus();
    }
  });
}
