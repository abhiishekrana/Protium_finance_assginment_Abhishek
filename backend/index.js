const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3001' // Allow React frontend to access the backend
  }));
app.use(express.json()); // Add JSON body parser middleware

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',  
  user: 'root',       
  password: 'Abhi@123', 
  database: 'dashboard_db' 
});

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL successfully!');
    connection.release(); // Release the connection
  }
});

// Test endpoint
app.get('/test-connection', async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT 1');
    res.status(200).send('MySQL Connection is Successful');
  } catch (error) {
    console.error('Error with MySQL query:', error);
    res.status(500).send('Failed to connect to MySQL');
  }
});

app.post('/submit', (req, res) => {
    const filteredData = req.body.filteredData;
  
    // Process the filtered data (this could be saving to a database, etc.)
    console.log('Filtered Data:', filteredData);
  
    // Send a success message back to the frontend
    res.json({ message: 'Filtered data submitted successfully!' });
  });
  

// Endpoint to save user configurations
app.post('/save-configuration', async (req, res) => {
  const { userId, filters, charts } = req.body;

  const query = `
    INSERT INTO user_configurations (user_id, filters, charts)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE filters = ?, charts = ?;
  `;

  try {
    await pool.promise().execute(query, [
      userId, 
      JSON.stringify(filters), 
      JSON.stringify(charts),
      JSON.stringify(filters), 
      JSON.stringify(charts)
    ]);
    res.json({ message: 'Configuration saved successfully.' });
  } catch (error) {
    console.error('Error saving configuration:', error);
    res.status(500).json({ error: 'Error saving configuration.' });
  }
});

// Endpoint to load user configurations
app.get('/load-configuration/:userId', async (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT filters, charts FROM user_configurations WHERE user_id = ?';

  try {
    const [rows] = await pool.promise().execute(query, [userId]);
    if (rows.length > 0) {
      const config = rows[0];
      res.json({
        filters: JSON.parse(config.filters), 
        charts: JSON.parse(config.charts)
      });
    } else {
      res.status(404).json({ message: 'No configuration found for the user.' });
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
    res.status(500).json({ error: 'Error loading configuration.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
