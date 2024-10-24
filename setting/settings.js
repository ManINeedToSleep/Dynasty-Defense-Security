// Load Admin Data from localStorage
function loadAdminData() {
    const adminData = JSON.parse(localStorage.getItem('admin')) || {
        username: 'Admin',
        password: '********',
        email: 'admin@gmail.com'
    };

    document.getElementById('admin-username').textContent = adminData.username;
    document.getElementById('admin-email').textContent = adminData.email;
    document.getElementById('admin-password').textContent = adminData.password;
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', loadAdminData);

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

