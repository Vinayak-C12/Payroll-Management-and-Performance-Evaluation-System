import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPayment = () => {
  const [payment, setPayment] = useState({
    totalPay: "",
    year: "",
    month: "",
    houseAllowance: "",
    loanCut: "",
    seasonalBonus: "",
    absence: "",
    pfundCut: "",
    payid: "",
    employeeid: "",
    overtime: "",
    medicalAllowance: "",
    otherBonus: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      ...payment,
      payid: payment.payid || "100" // Replace "default_value_for_payid" with your desired default value
    };
    axios
    .post("http://localhost:3000/auth/add_payment", paymentData)
    .then((result) => {
      if (result.data.Status) {
        navigate("/dashboard/payment");
      } else {
        console.log(result.data.Error);
        alert(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
};

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Payment</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="totalPay" className="form-label">
              Total Pay
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="totalPay"
              placeholder="Enter Total Pay"
              onChange={(e) =>
                setPayment({ ...payment, totalPay: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="year"
              placeholder="Enter Year"
              onChange={(e) =>
                setPayment({ ...payment, year: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="month" className="form-label">
              Month
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="month"
              placeholder="Enter Month"
              onChange={(e) =>
                setPayment({ ...payment, month: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="houseAllowance" className="form-label">
              House Allowance
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="houseAllowance"
              placeholder="Enter House Allowance"
              onChange={(e) =>
                setPayment({ ...payment, houseAllowance: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="loanCut" className="form-label">
              Loan Cut
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="loanCut"
              placeholder="Enter Loan Cut"
              onChange={(e) =>
                setPayment({ ...payment, loanCut: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="seasonalBonus" className="form-label">
              Seasonal Bonus
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="seasonalBonus"
              placeholder="Enter Seasonal Bonus"
              onChange={(e) =>
                setPayment({ ...payment, seasonalBonus: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="absence" className="form-label">
              Absence
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="absence"
              placeholder="Enter Absence"
              onChange={(e) =>
                setPayment({ ...payment, absence: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="pfundCut" className="form-label">
              Pfund Cut
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="pfundCut"
              placeholder="Enter Pfund Cut"
              onChange={(e) =>
                setPayment({ ...payment, pfundCut: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="payid" className="form-label">
              Pay ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="payid"
              placeholder="Enter Pay ID"
              onChange={(e) =>
                setPayment({ ...payment, payid: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="employeeid" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="employeeid"
              placeholder="Enter Employee ID"
              onChange={(e) =>
                setPayment({ ...payment, employeeid: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="overtime" className="form-label">
              Overtime
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="overtime"
              placeholder="Enter Overtime"
              onChange={(e) =>
                setPayment({ ...payment, overtime: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="medicalAllowance" className="form-label">
              Medical Allowance
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="medicalAllowance"
              placeholder="Enter Medical Allowance"
              onChange={(e) =>
                setPayment({ ...payment, medicalAllowance: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="otherBonus" className="form-label">
              Other Bonus
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="otherBonus"
              placeholder="Enter Other Bonus"
              onChange={(e) =>
                setPayment({ ...payment, otherBonus: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
