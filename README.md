🎯 User Analysis Dashboard
Overview 📊
This project showcases a User Analysis Dashboard where users can:

Upload files
Apply filters
Save configurations
Export data in CSV and JSON formats
The application is built using React for the frontend and Node.js with Express for the backend, with MySQL as the database.

📚 Table of Contents
Technologies Used
Frontend Setup
Backend Setup
MySQL Database Setup
Libraries and Dependencies
API Endpoints
Usage
Contributing
💻 Technologies Used
Frontend: React, CSS, React Toastify, CSV Link
Backend: Node.js, Express
Database: MySQL
⚙️ Frontend Setup
Clone the Repository:

bash
Copy code
git clone <repo_name>
cd <repo_name>
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
The app will run on http://localhost:3000.

🔧 Backend Setup
Navigate to backend directory:

bash
Copy code
cd <backend-directory>
Install backend dependencies:

bash
Copy code
npm install
Set up environment variables:

DB_HOST: localhost
DB_USER: <your-database-user>
DB_PASSWORD: <your-database-password>
DB_NAME: <your-database-name>
Start the backend server:

bash
Copy code
node index.js
🛢️ MySQL Database Setup
Create the database:

sql
Copy code
CREATE DATABASE dashboard_db;
Create necessary tables in the database.

📝 Project Walkthrough
The project includes both Frontend and Backend steps, covering all aspects in a sequential manner.

Demo Screenshots
File Upload & Data Parsing:

Dynamic Charting with Filters: We can visualize charts with dynamic attributes using React chart libraries.

Advanced Filtering:

Filters by Date, Region, Product_Type, Discount_Percent, Return_Rate, and more.
Real-time chart updates.
User Preferences & Configurations: Save user preferences and filters in the MySQL database.

⚙️ Backend Setup Overview
Create a MySQL database and set up with Express.
Install necessary libraries like mysql2 for Express.
📊 API Setup & Data Handling
Create APIs for setting and getting filtered data.
Use useEffect and axios to call the APIs in the frontend.
✨ Step-by-Step Flow
File Upload and Parsing

Users can upload CSV/JSON files.
Data is parsed and displayed for analysis.
Dynamic Charting

Visualize data with real-time filters.
Dynamic updates to charts based on selected attributes.
Advanced Filtering

Apply various filters to the data.
Charts and data update in real-time.
User Preferences

Store user configurations in the database.
Retrieve and apply preferences upon future logins.
