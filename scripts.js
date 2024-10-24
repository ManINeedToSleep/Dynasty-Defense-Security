// Master username and password for login
const masterUsername = "ManIWantToSleep";
const masterPassword = "S3cur3#AlarmSy$tem";

// Function to handle login
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    // Retrieve admin data from local storage
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));

    // Use the master credentials if no new user is created
    const validUsername = storedAdmin ? storedAdmin.username : masterUsername;
    const validPassword = storedAdmin ? storedAdmin.password : masterPassword;

    console.log("Valid Username:", validUsername);
    console.log("Valid Password:", validPassword);

    // Check if the entered username and password match the stored credentials
    if (username === validUsername && password === validPassword) {
        // Redirect to the dashboard after successful login
        window.location.href = './dashboard/dashboard.html';
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password.";
    }
}


// Function to handle new user creation
function createUser() {
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const gmail = document.getElementById("gmail").value.trim();

    if (newPassword !== confirmPassword) {
        document.getElementById("create-error").textContent = "Passwords do not match!";
        return;
    }

    if (newPassword.length < 16 || !/[A-Z]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
        document.getElementById("create-error").textContent = 
            "Password must be at least 16 characters long, with one capital letter and one special character.";
        return;
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(gmail)) {
        document.getElementById("create-error").textContent = "Please enter a valid Gmail address.";
        return;
    }

    const newUser = {
        username: newUsername,
        password: newPassword,
        email: gmail
    };

    // Save new admin details to localStorage
    localStorage.setItem("admin", JSON.stringify(newUser));

    alert("New user created successfully!");

    const regex = /admin\//gm;

    const url = `http://127.0.0.1:5500/Dynasty-Defense-Security/admin/`;
    const subst = `index.html`;

    // The substituted value will be contained in the result variable
    window.location.href= url.replace(regex, subst);
    console.log(url.replace(regex, subst))
    alert("New user created successfully!");


    // Redirect back to login page after user creation
    // http://127.0.0.1:5500/Dynasty-Defense-Security/admin/
    
}


// Sensor Control/Configuration Panel Scripts

// Check if the current page is the sensor control panel
window.addEventListener('DOMContentLoaded', function () {
    const isControlPanel = document.title === 'Sensor Control Panel';
    if (isControlPanel) {
        initializeSensorControlPanel();
    }
});

// Initialize the sensor control panel
function initializeSensorControlPanel() {
    populateDropdowns(); // Populate dropdowns with floor and sensor data

    // Attach event listeners for Turn On / Turn Off buttons
    document.querySelector('.turn-on').addEventListener('click', () => toggleSensorState(true));
    document.querySelector('.turn-off').addEventListener('click', () => toggleSensorState(false));
}

// Populate the dropdowns with data from localStorage
function populateDropdowns() {
    const floorSelector = document.getElementById('floor-selector');

    // Retrieve floors from localStorage
    const storedFloors = JSON.parse(localStorage.getItem('floors')) || [];

    // Populate the Floor Dropdown
    floorSelector.innerHTML = '<option>Select Floor</option>';
    storedFloors.forEach((floor, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = floor.name;
        floorSelector.appendChild(option);
    });

    // Update Sensors Dropdown based on selected floor
    floorSelector.addEventListener('change', function () {
        const selectedFloor = storedFloors[floorSelector.value];
        if (selectedFloor) {
            populateSensorDropdown(selectedFloor.sensors);
        }
    });
}

// Helper function to populate the sensor dropdown
function populateSensorDropdown(sensors) {
    const sensorSelector = document.getElementById('sensor-selector');
    sensorSelector.innerHTML = '<option>Select Sensor</option>';

    for (const [sensorType, sensorArray] of Object.entries(sensors)) {
        sensorArray.forEach(sensor => {
            const option = document.createElement('option');
            option.value = `${sensorType}: ${sensor}`; // Correctly format the value
            option.textContent = `${sensorType.charAt(0).toUpperCase() + sensorType.slice(1)}: ${sensor}`;
            sensorSelector.appendChild(option);
        });
    }
}


// Handle Turn On / Turn Off Actions
function toggleSensorState(isTurningOn) {
    const floorSelector = document.getElementById('floor-selector');
    const sensorSelector = document.getElementById('sensor-selector');
    const logChat = document.querySelector('.log-chat p');

    // Retrieve floors from localStorage
    const storedFloors = JSON.parse(localStorage.getItem('floors')) || [];

    const selectedFloorIndex = floorSelector.value;
    const selectedSensorName = sensorSelector.value;

    if (selectedFloorIndex === "Select Floor" || !selectedSensorName) {
        logChat.innerHTML += '<br>Please select both a floor and sensor.';
        return;
    }

    const selectedFloor = storedFloors[selectedFloorIndex];

    // Find the specific sensor
    const [sensorType, sensorName] = selectedSensorName.split(': ');
    const sensorArray = selectedFloor.sensors[sensorType.toLowerCase()];
    const sensorIndex = sensorArray.indexOf(sensorName);

    // Check if the sensor is already on or off
    const isSensorOn = isTurningOn && !sensorArray.includes(sensorName);
    const isSensorOff = !isTurningOn && sensorArray.includes(sensorName);

    if (isTurningOn && isSensorOn) {
        sensorArray.push(sensorName); // Add sensor to the array
        logChat.innerHTML += `<br>${capitalizeFirstLetter(sensorType)} Sensor "${sensorName}" on Floor "${selectedFloor.name}" is now ON.`;
    } else if (isTurningOn && !isSensorOn) {
        logChat.innerHTML += `<br>${capitalizeFirstLetter(sensorType)} Sensor "${sensorName}" on Floor "${selectedFloor.name}" is already ON.`;
    } else if (!isTurningOn && isSensorOff) {
        sensorArray.splice(sensorIndex, 1); // Remove sensor from the array
        logChat.innerHTML += `<br>${capitalizeFirstLetter(sensorType)} Sensor "${sensorName}" on Floor "${selectedFloor.name}" is now OFF.`;
    } else if (!isTurningOn && !isSensorOff) {
        logChat.innerHTML += `<br>${capitalizeFirstLetter(sensorType)} Sensor "${sensorName}" on Floor "${selectedFloor.name}" is already OFF.`;
    }

    // Ensure the "No recent logs available" message is removed
    if (logChat.innerHTML.includes('No recent logs available')) {
        logChat.innerHTML = logChat.innerHTML.replace('No recent logs available', '');
    }

    // Save updated state to localStorage
    localStorage.setItem('floors', JSON.stringify(storedFloors));
}


// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Function to check the status of all sensors
function checkSensorStatus() {
    const storedFloors = JSON.parse(localStorage.getItem('floors')) || [];
    const logChat = document.querySelector('.log-chat p');

    // Clear existing log before displaying status
    logChat.innerHTML = ''; 

    if (storedFloors.length === 0) {
        logChat.innerHTML = 'No floors available.';
        return;
    }

    storedFloors.forEach(floor => {
        for (const [sensorType, sensorArray] of Object.entries(floor.sensors)) {
            const status = sensorArray.length > 0 ? 'ON' : 'OFF';
            logChat.innerHTML += `${capitalizeFirstLetter(sensorType)} Sensors on Floor "${floor.name}" are ${status}.<br>`;
        }
    });
}

// Function to clear logs
function clearLogs() {
    const logChat = document.querySelector('.log-chat p');
    logChat.innerHTML = ''; // Clear the log chat
    logChat.innerHTML = 'No recent logs available.'; // Reset message
}
