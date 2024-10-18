Here’s the updated `README.md` file for **Dynasty Defense Alarm System**:

---

# Dynasty Defense Alarm System

This project implements a **robust alarm system** for enclosed structures, utilizing a network of geographically distributed sensors for **fire, smoke, and heat detection**. It offers advanced configuration and monitoring capabilities to enhance safety and security.

## Key Features

### **1. Sensor Monitoring and Configuration:**  
- Administrators can **configure sensitivity** and **response parameters** for fire, smoke, and heat sensors.  
- Real-time monitoring of all connected sensors with a detailed control interface.  
- Occupants can **reset** or **deactivate specific sensors or sensor types** directly from the control panel.  

### **2. Alarm Triggering and Notification:**  
- Sensors trigger **audible** and/or **visual alarms** upon detection of fire, smoke, or heat.  
- Instant **notifications via chat** sent to designated users, including alarm type and sensor details for quick action.  

### **3. Secure User Management:**  
- **Password-protected access** to the Alarm Control Panel (ACP).  
- **Enforced password complexity requirements:**  
  - Minimum 16 characters.  
  - At least one special character.  
  - At least one uppercase letter.  
- Secure password storage in **Local Storage**, ensuring data safety.  

---

## System Architecture

The **Dynasty Defense Alarm System** comprises the following components:  

1. **Sensors:**  
   Distributed across the structure to detect **fire, smoke, and heat** in real-time.  

2. **Alarm Control Panel (ACP):**  
   The central system used for configuring and managing sensors and alarms.  

3. **Graphical User Interface (GUI):**  
   Provides both **administrators** and **occupants** with a clear interface to monitor, control, and reset the system.  

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
   - Configure the **ACP** and manage sensors using the interface.

3. **Development Setup:**
   - Ensure JavaScript is enabled in your browser for real-time sensor control.
   - Use the **configuration panel** to add and manage sensors and floors.

---

## Technologies Used  
- **HTML5** and **CSS3**: For the front-end interface.  
- **JavaScript**: For dynamic sensor management and control.  
- **Local Storage**: For secure user management and settings persistence.  

---

Let me know if you need further modifications!
