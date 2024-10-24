let guests = JSON.parse(localStorage.getItem('guests')) || [];

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


// Update Guest/User List
function updateGuestList() {
    const guestUserList = document.getElementById('guest-user-list');
    guestUserList.innerHTML = ''; // Clear existing list

    guests.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username} (${user.role})`;

        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editGuest(index));

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteGuest(index));

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        guestUserList.appendChild(listItem);
    });
}

// Handle Add User Form Submission
document.getElementById('guest-user-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form reload

    const username = document.getElementById('guest-username').value.trim();
    const email = document.getElementById('guest-email').value.trim();
    const password = document.getElementById('guest-password').value.trim();
    const role = document.getElementById('user-role').value;

    if (username && email && password) {
        guests.push({ username, email, password, role });
        localStorage.setItem('guests', JSON.stringify(guests)); // Save to localStorage
        updateGuestList(); // Refresh user list
        e.target.reset(); // Clear form inputs
    }
});

// Edit User Function
function editGuest(index) {
    const user = guests[index];
    const newUsername = prompt('Enter new username:', user.username) || user.username;
    const newEmail = prompt('Enter new email:', user.email) || user.email;
    const newPassword = prompt('Enter new password:', user.password) || user.password;

    guests[index] = { ...user, username: newUsername, email: newEmail, password: newPassword };
    localStorage.setItem('guests', JSON.stringify(guests)); // Update localStorage
    updateGuestList(); // Refresh user list
}

// Delete User Function
function deleteGuest(index) {
    guests.splice(index, 1); // Remove user
    localStorage.setItem('guests', JSON.stringify(guests)); // Update localStorage
    updateGuestList(); // Refresh user list
}

// Initialize Admin Data and User List on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadAdminData();
    updateGuestList();
});
