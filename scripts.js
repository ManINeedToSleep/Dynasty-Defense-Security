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

// Sensor Control/Configuration Panel Scripts

// Initialize floors and their corresponding sensor arrays
let floors = [];

// Add Floor Button Click Event
document.getElementById('add-floor-button').addEventListener('click', function() {
    const floorInput = document.getElementById('floor-input');
    const floorName = floorInput.value.trim();

    if (floorName) {
        // Add floor and initialize sensor array
        floors.push({ name: floorName, sensors: { fire: [], heat: [], smoke: [] } });
        floorInput.value = ''; // Clear input field
        updateFloorList();
    }
});

// Update Floor List
function updateFloorList() {
    const floorList = document.getElementById('floor-list');
    floorList.innerHTML = ''; // Clear existing list

    floors.forEach((floor, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = floor.name;
        
        // Floor Selection to Manage Sensors
        listItem.addEventListener('click', () => {
            document.getElementById('selected-floor').textContent = floor.name;
            updateSensorList(floor.sensors);
        });

        // Delete Floor Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Floor';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering floor selection
            floors.splice(index, 1); // Remove floor
            updateFloorList(); // Refresh list
            document.getElementById('sensor-list').innerHTML = ''; // Clear sensor list
            document.getElementById('selected-floor').textContent = 'Select a Floor'; // Reset selected floor
        });

        listItem.appendChild(deleteButton);
        floorList.appendChild(listItem);
    });
}

// Update Sensor List
function updateSensorList(sensors) {
    const sensorList = document.getElementById('sensor-list');
    sensorList.innerHTML = ''; // Clear existing sensor list

    for (const [sensorType, sensorArray] of Object.entries(sensors)) {
        sensorArray.forEach(sensor => {
            const listItem = document.createElement('li');
            listItem.textContent = `${sensorType.charAt(0).toUpperCase() + sensorType.slice(1)}: ${sensor}`;
            
            // Delete Sensor Button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Sensor';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering floor selection
                const sensorIndex = sensorArray.indexOf(sensor);
                sensorArray.splice(sensorIndex, 1); // Remove sensor
                updateSensorList(sensors); // Refresh sensor list
            });

            listItem.appendChild(deleteButton);
            sensorList.appendChild(listItem);
        });
    }
}

// Add Sensor Button Click Event
document.getElementById('add-sensor-button').addEventListener('click', function() {
    const selectedFloorName = document.getElementById('selected-floor').textContent;
    const sensorInput = document.getElementById('sensor-input');
    const sensorName = sensorInput.value.trim();
    const sensorType = document.getElementById('sensor-type-selector').value;

    const floor = floors.find(f => f.name === selectedFloorName);
    
    if (floor && sensorName) {
        floor.sensors[sensorType].push(sensorName); // Add sensor to the corresponding type
        sensorInput.value = ''; // Clear input field
        updateSensorList(floor.sensors); // Refresh sensor list
    }
});
