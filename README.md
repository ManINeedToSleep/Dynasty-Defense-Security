Here’s the updated `README.md` with the new features and improvements integrated:

---

# Dynasty Defense Alarm System  

This project implements a **robust alarm system** for enclosed structures, utilizing a network of geographically distributed sensors for **fire, smoke, and heat detection**. It offers advanced configuration and monitoring capabilities to enhance safety and security.

## Key Features  

### **1. Sensor Monitoring and Configuration:**  
- Administrators can **configure sensitivity** and **response parameters** for fire, smoke, and heat sensors.  
- Real-time monitoring of all connected sensors with a detailed control interface.  
- Each **floor has its own array of sensors** for fire, heat, and smoke detection, enabling precise control.  
- Users can **add or delete sensors** for individual floors, with data updates reflecting immediately.  
- Occupants can **reset** or **deactivate specific sensors or sensor types** directly from the control panel.  

### **2. Alarm Triggering and Notification:**  
- Sensors trigger **audible and/or visual alarms** upon detection of fire, smoke, or heat.  
- Instant **notifications via chat** are sent to designated users, including alarm type and sensor location, for quick action.  
- **Mimicked alarms** between floors provide redundancy to enhance detection accuracy.  

### **3. Secure User Management:**  
- **Password-protected access** to the Alarm Control Panel (ACP).  
- **Two levels of user access:**  
  - **Admins:** Full access to manage sensors, alarms, and system settings.  
  - **Guests:** Restricted to basic system monitoring and alarms acknowledgment.  
- **Master username and password initialization**:
  - Default credentials are used initially, which can be changed through the **Create User** feature.  
  - Credentials are securely saved in **Local Storage** for persistence across sessions.  
- **Password complexity enforced** for security:  
  - Minimum 16 characters.  
  - At least one special character.  
  - At least one uppercase letter.  

### **4. Settings Panel:**  
- A **settings page** is provided for easy configuration of system preferences, including:  
  - Updating the admin profile (username, password, and email).  
  - Adjusting sensor thresholds for fire, smoke, and heat.  
- The **user-friendly dashboard layout** divides management areas and ensures smooth navigation.  

---

## System Architecture  

The **Dynasty Defense Alarm System** comprises the following components:  

1. **Sensors:**  
   Distributed across floors to detect **fire, smoke, and heat** in real time.  

2. **Alarm Control Panel (ACP):**  
   The central system used for configuring and managing sensors and alarms.  

3. **Graphical User Interface (GUI):**  
   Provides both **administrators** and **occupants** with a clear interface to monitor, control, and reset the system.  

4. **Settings Panel:**  
   Accessible by admins to adjust system configurations and update profiles.  

---

## Project Status  

The project is currently **under development**, with tasks being actively tracked and managed. For detailed progress, refer to the project board:

🔗 **[Project Board on Trello](https://trello.com/b/KMyo9dgX/capstone-0-alarm-system)**  

---

## Getting Started  

1. **Clone the Repository:**  
   ```bash
   git clone <repository-url>
   cd dynasty-defense-alarm-system
   ```

2. **Run the Application:**  
   - Open the HTML files directly in a browser to explore the GUI.  
   - Use the **ACP** to manage sensors and alarms.

3. **Development Setup:**  
   - Ensure JavaScript is enabled in your browser for real-time sensor control.  
   - Use the **configuration panel** to add and manage sensors and floors.  

---

## Technologies Used  
- **HTML5** and **CSS3**: For the front-end interface.  
- **JavaScript**: For dynamic sensor management, control, and secure user handling.  
- **Local Storage**: For user data and settings persistence.  

---

## Warning!

- Guest Accounts can be added, but not logged in. It is still a dummy placeholder which shows that it is possible to be added if a client would ask for the feature.
- Master Username and Password :
- ManIWantToSleep
- S3cur3#AlarmSy$tem
