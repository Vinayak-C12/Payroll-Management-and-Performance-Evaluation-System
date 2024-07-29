import express from 'express';
import loadModel from '../Models/rfModel.js';
import Employee from '../Models/Employee.js';

const PredictRoute = express.Router();
const model = loadModel('./model.pkl');

PredictRoute.get('/predict', async (req, res) => {
  try {
    const employees = await Employee.find({});
    const predictions = [];

    for (const employee of employees) {
      const input = [employee.absence, employee.overtime, employee.totalPay];
      const prediction = model.predict(input);
      predictions.push({
        employeeid: employee.employeeid,
        prediction: prediction
      });
    }

    return res.status(200).json({ Status: true, Result: predictions });
  } catch (error) {
    return res.status(500).json({ Status: false, Error: error.message });
  }
});

export default PredictRoute;