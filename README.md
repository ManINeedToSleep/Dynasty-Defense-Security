# Dynasty Defense Alarm System

This project implements a robust alarm system for enclosed structures, employing an array of geographically distributed sensors to detect fire, smoke, and heat. 

## Key Features

* **Sensor Monitoring and Configuration:** 
    * Administrators can configure the sensitivity and response parameters for fire, smoke, and heat detection.
    * Real-time monitoring of all connected sensors.
    * Occupants can reset or deactivate specific sensors or sensor types.
* **Alarm Triggering and Notification:**
    * Upon detection, sensors trigger audible and/or visual alarms.
    * The system sends instant alarm notifications, including the alarm type and sensor name, via chat to designated users.
* **Secure User Management:**
    * Password-protected access to the Alarm Control Panel (ACP).
    * Enforced password complexity requirements (16 characters, special character, capital letter) during setup.
    * Secure password storage in Local Storage.

## System Architecture

The system comprises:

* **Sensors:** Distributed throughout the enclosed structure to detect fire, smoke, and heat.
* **Alarm Control Panel (ACP):**  Used for system configuration and programming.
* **Graphical User Interface (GUI):** Provides administrators and occupants with system control and monitoring capabilities.

## Project Status

The project is currently under development. Refer to this project board for a detailed breakdown of tasks and progress updates. 

https://trello.com/b/KMyo9dgX/capstone-0-alarm-system
