// Elements for Registration
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const regPassword = document.getElementById('reg-password');
const registerBtn = document.getElementById('register-btn');
const regError = document.getElementById('reg-error');

// Elements for Login
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

// Navigation and Home Elements
const goToLogin = document.getElementById('go-to-login');
const goToRegister = document.getElementById('go-to-register');
const logoutBtn = document.getElementById('logout-btn');
const userName = document.getElementById('user-name');

// Containers
const registerContainer = document.getElementById('register');
const loginContainer = document.getElementById('login');
const homeContainer = document.getElementById('home');

// Mock Database
const users = {};

// Utility: Show/Hide Sections
function showSection(section) {
  registerContainer.classList.add('hidden');
  loginContainer.classList.add('hidden');
  homeContainer.classList.add('hidden');
  section.classList.remove('hidden');
}

// Registration Logic
registerBtn.addEventListener('click', () => {
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!name) {
    regError.textContent = 'Name is required.';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    regError.textContent = 'Invalid email format.';
    return;
  }

  if (users[email]) {
    regError.textContent = 'Email already exists. Please use a different email.';
    return;
  }

  if (password.length < 6) {
    regError.textContent = 'Password must be at least 6 characters.';
    return;
  }

  // Save user to database
  users[email] = { password, name };
  regError.textContent = '';
  alert('Registration successful! Redirecting to login...');
  showSection(loginContainer);
});

// Login Logic
loginBtn.addEventListener('click', () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!users[email]) {
    loginError.textContent = 'User does not exist.';
    return;
  }

  if (users[email].password !== password) {
    loginError.textContent = 'Incorrect password.';
    return;
  }

  // Successful login
  loginError.textContent = '';
  userName.textContent = users[email].name;
  showSection(homeContainer);
});

// Logout Logic
logoutBtn.addEventListener('click', () => {
  showSection(loginContainer);
});

// Navigation Between Forms
goToLogin.addEventListener('click', () => showSection(loginContainer));
goToRegister.addEventListener('click', () => showSection(registerContainer));
