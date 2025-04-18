// Select DOM elements
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const previewSpan = document.getElementById('preview');
const copyButton = document.getElementById('copy');
const themeToggle = document.getElementById('theme-toggle');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

// Generate password function
function generatePassword() {
  const length = +lengthInput.value;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  let charPool = '';
  if (includeUppercase) charPool += uppercaseChars;
  if (includeLowercase) charPool += lowercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;

  if (charPool === '') {
    alert('Please select at least one character type!');
    return '';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

// Update live preview
function updatePreview() {
  const password = generatePassword();
  previewSpan.textContent = password || 'YourPassword';
}

// Event listener for generate button
generateButton.addEventListener('click', () => {
  const password = generatePassword();
  passwordInput.value = password;
});

// Event listener for live preview
[lengthInput, uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach((el) => {
  el.addEventListener('input', updatePreview);
});

// Event listener for copy button
copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    alert('Password copied to clipboard!');
  });
});

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize preview
updatePreview();
