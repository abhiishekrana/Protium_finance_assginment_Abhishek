import React, { useState, useEffect } from 'react';
import FileUpload from "./components/FileUpload";
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for the toast
import './App.css'; // Import the new styles
import ProtiumLogo from './components/protiumLogo.JPG';

function App() {
  const [filters, setFilters] = useState({});
  const [charts, setCharts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const saveConfiguration = async (userId, filters, charts) => {
    try {
      const response = await axios.post('http://localhost:3001/save-configuration', {
        userId,
        filters,
        charts,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error('Failed to save configuration');
    }
  };

  const handleSaveConfiguration = () => {
    const userId = 'user123'; // Replace with actual user ID (from authentication)
    saveConfiguration(userId, filters, charts);
  };

  const loadConfiguration = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/load-configuration/${userId}`);
      const { filters, charts } = response.data;
      setFilters(filters);
      setCharts(charts);
      console.log('Configuration loaded successfully.');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No saved configuration found.');
      } else {
        console.error('Error loading configuration:', error);
      }
    }
  };

  useEffect(() => {
    const userId = 'user123'; // Replace with actual user ID (from authentication)
    loadConfiguration(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/submit', {
        filteredData,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data');
    }
  };

  return (
    <div className="App-container">
      <header className="App-header">
      <img class="image" src={ProtiumLogo} alt="Protium Logo" width="200"/>
        <h1>User's Analysis Dashboard</h1>
      </header>

      <section className="upload-section">
        <FileUpload />
        <form onSubmit={handleSubmit} className="submit-form">
          <button type="submit" className="submit-btn">Submit Filtered Data</button>
        </form>
        <button onClick={() => saveConfiguration('user123')} className="save-btn">Save Configuration</button>
      </section>

      <div className="export-section">
        <h2>Export Data</h2>
        <CSVLink class="export_csv"
          data={filteredData}
          filename={"filtered_data.csv"}
          className="export-btn"
        >
         Export as CSV
        </CSVLink>
        <button
          className="export-btn"
          onClick={() => {
            const jsonData = JSON.stringify(filteredData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'filtered_data.json';
            link.click();
          }}
        >
          Export as JSON
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
    </div>
  );
}

export default App;
