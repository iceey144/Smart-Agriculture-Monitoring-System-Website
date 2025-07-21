document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const output = document.getElementById('output');
  const progress = document.getElementById('progress');
  const progressBar = progress?.querySelector('.progress-bar');
  const resetButton = document.getElementById('resetForm');
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  const errors = document.querySelectorAll('.error');

  // Show/hide password toggle
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.innerHTML = `<i class="fas ${type === 'password' ? 'fa-eye' : 'fa-eye-slash'}" aria-label="${type === 'password' ? 'Show' : 'Hide'} password"></i>`;
  });

  // Form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = passwordInput.value.trim();

    errors.forEach(error => error.classList.add('hidden'));

    let isValid = true;
    if (!username) {
      document.getElementById('usernameError').classList.remove('hidden');
      isValid = false;
    }
    if (!password) {
      document.getElementById('passwordError').classList.remove('hidden');
      isValid = false;
    }

    if (!isValid) {
      output.innerHTML = '<p class="text-red-500" role="alert">Please fill all fields.</p>';
      return;
    }

    if (!/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9]{3,20}$/.test(username)) {
      document.getElementById('usernameError').classList.remove('hidden');
      output.innerHTML = '<p class="text-red-500" role="alert">Please enter a valid username or email.</p>';
      return;
    }
    if (password.length < 6) {
      document.getElementById('passwordError').classList.remove('hidden');
      output.innerHTML = '<p class="text-red-500" role="alert">Password must be at least 6 characters long.</p>';
      return;
    }

    progress.classList.remove('hidden');
    progressBar.style.width = '0%';
    let width = 0;
    const interval = setInterval(() => {
      width += 10;
      progressBar.style.width = `${width}%`;
      if (width >= 100) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      output.innerHTML = `
        <div class="bg-green-100 p-6 rounded-lg shadow-md transform translate-z-10">
          <p class="text-gray-700 flex items-center"><i class="fas fa-check-circle text-green-500 mr-2"></i> <strong>Success:</strong> Logged in as ${username}!</p>
          <p class="text-gray-600 mt-2">Redirecting to dashboard...</p>
        </div>
      `;
      progress.classList.add('hidden');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    }, 1200);
  });

  // Reset form
  resetButton.addEventListener('click', () => {
    loginForm.reset();
    output.innerHTML = '';
    progress.classList.add('hidden');
    errors.forEach(error => error.classList.add('hidden'));
    passwordInput.type = 'password';
    togglePassword.innerHTML = '<i class="fas fa-eye" aria-label="Show password"></i>';
  });

  // Fixed navigation handler
  document.querySelectorAll('nav a.nav-link, footer a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Allow all .html links to work normally
      if (href.endsWith('.html')) {
        return true;
      }
      
      // Handle anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        
        // If on login page, navigate to index.html first
        if (window.location.pathname.includes('login.html')) {
          window.location.href = 'index.html' + href;
        } 
        // Otherwise scroll to section
        else if (document.getElementById(targetId)) {
          document.getElementById(targetId).scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Add decorative elements
  for (let i = 0; i < 3; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    document.body.appendChild(cloud);
  }
  
  const tractor = document.createElement('div');
  tractor.className = 'tractor';
  document.body.appendChild(tractor);
});