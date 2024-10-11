// Master username and password for login
const masterUsername = "ManIWantToSleep";
const masterPassword = "S3cur3#AlarmSy$tem";

// Function to handle login
function login() {
    const username = document.getElementById("username").value.trim(); // Trim spaces
    const password = document.getElementById("password").value.trim(); // Trim spaces

    // Log the values to the console for debugging purposes (optional)
    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    // Retrieve new user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("newUser"));

    // If no new user is created, default to master credentials
    const validUsername = storedUser ? storedUser.username : masterUsername;
    const validPassword = storedUser ? storedUser.password : masterPassword;

    // Log the valid credentials for debugging purposes
    // console.log("Valid Username:", validUsername);
    // console.log("Valid Password:", validPassword);

    // Check if the entered username and password match the stored credentials
    if (username === validUsername && password === validPassword) {
        // Redirect to the dashboard after successful login
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password.";
    }
}


// Function to handle new user creation
function createUser() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const gmail = document.getElementById("gmail").value;

    // Password validation
    if (newPassword !== confirmPassword) {
        document.getElementById("create-error").textContent = "Passwords do not match!";
        return;
    }
    if (newPassword.length < 16 || !/[A-Z]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
        document.getElementById("create-error").textContent = "Password must be at least 16 characters long and contain at least one capital letter and one special character.";
        return;
    }

    // Gmail validation
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(gmail)) {
        document.getElementById("create-error").textContent = "Please enter a valid Gmail address.";
        return;
    }

    // Save the new user details to local storage
    const newUser = {
        username: newUsername,
        password: newPassword,
        email: gmail
    };

    localStorage.setItem("newUser", JSON.stringify(newUser));
    alert("New user created successfully!");

    // Redirect back to login page after user creation
    window.location.href = 'index.html';
}
