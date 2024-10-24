// Handle Account Settings Form Submission
document.getElementById('account-settings-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && email && password) {
        const updatedAccount = { username, email, password };
        localStorage.setItem('account', JSON.stringify(updatedAccount)); // Save to localStorage
        alert('Account updated successfully!');
    }
});

// Handle Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    localStorage.setItem('darkMode', darkModeToggle.checked);
});

// Set Initial Dark Mode State
if (JSON.parse(localStorage.getItem('darkMode'))) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Handle Language Change
document.getElementById('language').addEventListener('change', (e) => {
    alert(`Language changed to: ${e.target.value}`);
});

// Logout Button
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.clear(); // Clear user data
    alert('Logged out successfully!');
    window.location.href = '../index.html'; // Redirect to login page
});

// Clear Cache Button
document.getElementById('clear-cache-button').addEventListener('click', () => {
    localStorage.clear();
    alert('Cache cleared!');
});

// Factory Reset Button
document.getElementById('factory-reset-button').addEventListener('click', () => {
    if (confirm('Are you sure you want to factory reset? This action cannot be undone.')) {
        localStorage.clear();
        alert('System reset to factory settings.');
        window.location.href = '../index.html';
    }
});
