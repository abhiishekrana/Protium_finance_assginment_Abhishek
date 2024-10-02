import React, { useState, useEffect } from 'react';
import './FileUpload.css'
import Papa from 'papaparse';
import { useTable } from 'react-table';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const chartColors = ['#8884d8', '#82ca9d', '#ffc658'];

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // To store the filtered data
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('BarChart');
  const [charts, setCharts] = useState([]);

  // Filter states for each filterable column
  const [dateFilter, setDateFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [productTypeFilter, setProductTypeFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');
  const [returnRateFilter, setReturnRateFilter] = useState('');

  // Handle file upload and CSV parsing
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data;
        setData(parsedData);
        setFilteredData(parsedData);

        // Generate columns based on the CSV header
        const headers = result.meta.fields.map((field) => ({
          Header: field,
          accessor: field
        }));
        setColumns(headers);
        setXAxis(result.meta.fields[0]);
        setYAxis(result.meta.fields[1]);
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      }
    });
  };

  // Filter the data based on user input
  const filterData = () => {
    let newData = [...data];

    if (dateFilter) {
      newData = newData.filter(row => row.Date.includes(dateFilter));
    }
    if (regionFilter) {
      newData = newData.filter(row => row.Region.includes(regionFilter));
    }
    if (productTypeFilter) {
      newData = newData.filter(row => row.Product_Type.includes(productTypeFilter));
    }
    if (discountFilter) {
      newData = newData.filter(row => parseFloat(row.Discount_Percent) >= parseFloat(discountFilter));
    }
    if (returnRateFilter) {
      newData = newData.filter(row => parseFloat(row.Return_Rate) <= parseFloat(returnRateFilter));
    }

    setFilteredData(newData);
  };

  // Automatically apply filters when they are changed
  useEffect(() => {
    filterData();
  }, [dateFilter, regionFilter, productTypeFilter, discountFilter, returnRateFilter]);

  const handleAddChart = () => {
    if (xAxis && yAxis) {
      setCharts([...charts, { xAxis, yAxis, chartType }]);
    }
  };

  // Render the table with the filtered data
  const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data
    });

    return (
      <table {...getTableProps()} style={{ border: '1px solid black', marginTop: '20px' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '5px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '5px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Render the charts based on user selection
  const renderChart = ({ xAxis, yAxis, chartType }, index) => {
    const chartData = filteredData.map(row => ({
      x: row[xAxis],
      y: parseFloat(row[yAxis]) || 0
    }));

    switch (chartType) {
      case 'LineChart':
        return (
          <LineChart width={500} height={300} data={chartData} key={index}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'PieChart':
        return (
          <PieChart width={500} height={300} key={index}>
            <Pie
              data={chartData}
              dataKey="y"
              nameKey="x"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={chartColors[idx % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'BarChart':
      default:
        return (
          <BarChart width={500} height={300} data={chartData} key={index}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        );
    }
  };

  return (
    <div>
      <h2>Upload and Parse CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      {data.length > 0 && (
        <>
        <h2> Data Visualization</h2>
          <div style={{ marginTop: '20px' }}>
            <label>
              Date Filter:
              <input type="text" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} placeholder="YYYY-MM-DD" />
            </label>
            <label>
              Region Filter:
              <input type="text" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} placeholder="Region" />
            </label>
            <label>
              Product Type Filter:
              <input type="text" value={productTypeFilter} onChange={(e) => setProductTypeFilter(e.target.value)} placeholder="Product Type" />
            </label>
            <label>
              Discount Percent Filter (min):
              <input type="number" value={discountFilter} onChange={(e) => setDiscountFilter(e.target.value)} placeholder="Discount %" />
            </label>
            <label>
              Return Rate Filter (max):
              <input type="number" value={returnRateFilter} onChange={(e) => setReturnRateFilter(e.target.value)} placeholder="Return Rate" />
            </label>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>
              Select X Axis:
              <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
                {columns.map((col) => (
                  <option key={col.accessor} value={col.accessor}>
                    {col.Header}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select Y Axis:
              <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
                {columns.map((col) => (
                  <option key={col.accessor} value={col.accessor}>
                    {col.Header}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select Chart Type:
              <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                <option value="BarChart">Bar Chart</option>
                <option value="LineChart">Line Chart</option>
                </select>
            </label>
            
            <button onClick={handleAddChart}>Add Chart</button>
          </div>

          {/* Render Charts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
            {charts.map((chartConfig, index) => (
              <div key={index} style={{ margin: '20px' }}>
                {renderChart(chartConfig, index)}
              </div>
            ))}
          </div>

          {/* Render Table */}
          <Table columns={columns} data={filteredData} />
        </>
      )}
    </div>
  );
};

export default FileUpload;