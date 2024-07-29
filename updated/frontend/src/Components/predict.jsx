import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Predict.css'; // Import CSS file for styling

const Predict = () => {
  const [data, setData] = useState([]);//if new data then update and print with in the Predict page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/predict');
        if (response.data.Status === 'Success') {
          console.log('Data fetched successfully...', response.data);
          const predictionsWithStatus = response.data.Predictions.map((item) => {
            let status;
            if (item.prediction === 0) {
              status = 'NO HIKE : [class : 0]';
            } else if (item.prediction === 1) {
              status = 'HIKE : [class : 1]';
            } else {
              status = 'FIRED : [class : 2]';
            }
            return { ...item, status }; // Add status property to each item
          });
          setData(predictionsWithStatus);
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Predictions</h2>
      <ol className="employee-list">
        {data.map((item, index) => (
          <li key={index} className="employee-item">
            <div className="employee-details">
              <div>
                <div style={{ fontWeight: 'bold' }}>Employee ID:</div>{' '}
                {item.employeeId}
                <span className="spacer">&nbsp;&nbsp;</span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Name:</div>{' '}
                {item.name}
                <span className="spacer">&nbsp;&nbsp;</span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Absence:</div>{' '}
                {item.absence}
                <span className="spacer">&nbsp;&nbsp;</span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Overtime:</div>{' '}
                {item.overtime}
                <span className="spacer">&nbsp;&nbsp;</span>
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Salary:</div>{' '}
                {item.salary}
                <span className="spacer">&nbsp;&nbsp;</span>
              </div>
              <div className="prediction-text">
                <strong className="strong-text">Prediction:</strong> 
                {item.status}
              </div>
            </div>
            <br /><br/>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Predict;