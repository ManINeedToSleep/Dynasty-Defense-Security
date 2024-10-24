// Initialize floors from localStorage or create an empty array if none exist
let floors = JSON.parse(localStorage.getItem('floors')) || [];

// Add Floor Button Click Event
document.getElementById('add-floor-button').addEventListener('click', function() {
    const floorInput = document.getElementById('floor-input');
    const floorName = floorInput.value.trim();

    if (floorName) {
        // Add floor and initialize sensor array
        floors.push({ name: floorName, sensors: { fire: [], heat: [], smoke: [] } });
        floorInput.value = ''; // Clear input field
        updateFloorList();
        localStorage.setItem("floors", JSON.stringify(floors)); // Store updated floors array
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
            localStorage.setItem("floors", JSON.stringify(floors)); // Update localStorage after deletion
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
                localStorage.setItem("floors", JSON.stringify(floors)); // Update localStorage after deletion
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
    const sensorName = sensorInput.value.trim(); // User input for sensor name
    const sensorType = document.getElementById('sensor-type-selector').value; // Selected sensor type

    const floor = floors.find(f => f.name === selectedFloorName);
    
    if (floor && sensorName) {
        floor.sensors[sensorType].push(sensorName); // Correctly add the sensor to the specified type
        sensorInput.value = ''; // Clear input field
        updateSensorList(floor.sensors); // Refresh sensor list
        localStorage.setItem("floors", JSON.stringify(floors)); // Update localStorage after adding a sensor
    } else {
        console.log("Invalid floor or sensor name."); // Log error for debugging
    }
});

// Initialize the floor list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateFloorList();
});
