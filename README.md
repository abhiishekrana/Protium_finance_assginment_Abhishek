I have uploaded this full stack project, both the file fronted and backend... Explaination is below.

## User Analysis Dashboard
🎯
## Overview
This project is a User Analysis Dashboard that allows users to upload files, apply filters, save configurations, and export data in CSV and JSON formats.
The application is built with React for the frontend and Node.js with Express for the backend, using MySQL as the database.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [MySQL Database Setup](#mysql-database-setup)
5. [Libraries and Dependencies](#libraries-and-dependencies)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Contributing](#contributing)

---
## Technologies Used
- **Frontend**: React, CSS, React Toastify, CSV Link
- **Backend**: Node.js, Express
- **Database**: MySQL

---

## Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone repo_name
   cd <repo_name>
   npm install
   npm start
   The app will be running on http://localhost:3000

## Backend Setup
cd <backend-directory>
npm install
DB_HOST=localhost
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
node index.js

## MySQL Database Setup
CREATE DATABASE dashboard_db ;
Create table dashboard_db;


**##Project Go though** :
I have covered all the cases of Frontend and backend in stepwise manner.
![image](https://github.com/user-attachments/assets/3dd780dc-e9e4-422e-a2b0-26acccfe7455)
<br/>
**Demo**
![image](https://github.com/user-attachments/assets/22ba5714-bcac-404d-8020-9073c58b067f)

**Step1** : 
**File Upload and Data parsing**
![image](https://github.com/user-attachments/assets/960a9286-4519-4691-8e49-1fb0a1dc6af5)
![image](https://github.com/user-attachments/assets/eaa52858-b366-4c76-a357-e61cdbf80020)

**Step2** : Dynamic Charting: We can visualize these charts using different attributes by our selection and can use filter, for this i have use react chat library for reactjs.
![image](https://github.com/user-attachments/assets/ab40d3cd-5975-4bc8-860f-7fb18948b3f3)

**Step3** :
**Using Advanced filters like :**
o Implement filters for various columns (Date, Region, Product_Type,
Discount_Percent, Return_Rate, etc.).
o Charts and data should update in real-time when filters are applied.

![image](https://github.com/user-attachments/assets/0e8edc8f-5364-4c36-8f72-986aafeffa63)

**Step4**:
**User Preferences & Configurations:**
For this i have fetch all the preferces or filter of the user and save in the mysql database:
![image](https://github.com/user-attachments/assets/a69473fd-c71d-49fd-bbfa-aa9437f1dcad)

**Step5**: 
**Backend**
Creating a mysql and setup with express install differnt libraries in express like mysql2
![image](https://github.com/user-attachments/assets/62396b82-fdcf-4194-b036-f9f1da847ad8)

**Step6** writing the apis for set and getting the filtered data and calling in the frontend using useEffect and axios
![image](https://github.com/user-attachments/assets/69d6b676-46e3-44fc-8195-1a529fa5c748)

**Step7**
![image](https://github.com/user-attachments/assets/b836ac18-e8ba-4070-b1da-762d24b9da6f)

![image](https://github.com/user-attachments/assets/ea28cf21-dab7-47c7-8a12-4dce8dc6a7bd)

![image](https://github.com/user-attachments/assets/75bca2a7-0f50-4fa4-9c6f-fbd414353654)

**Step8**:
![image](https://github.com/user-attachments/assets/de4f0b17-c995-4d23-b887-98e555531e1b)
![image](https://github.com/user-attachments/assets/3d9c849c-ddba-4952-9e1e-f0038ccf59b6)















