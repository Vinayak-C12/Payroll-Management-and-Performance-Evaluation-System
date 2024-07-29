import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/auth/payments")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         console.log(result.data.Result);
  //         setPayments(result.data.Result);
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);


  useEffect(()=> {
    axios.get('http://localhost:3000/auth/payments')
    .then(result => {
        if(result.data.Status) {
           console.log(result.data.Result);
          setPayments(result.data.Result);
        } else {
          console.log(result.data.Result);
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))
}, [])


  const handleDelete = (id) => { console.log(id)
    axios
      .delete("http://localhost:3000/auth/delete_payment/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Payment List</h3>
      </div>
      <Link to="/dashboard/add_payment" className="btn btn-success">
        Add Payment
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Total Pay</th>
              <th>Year</th>
              <th>Month</th>
              <th>House Allowance</th>
              <th>Loan Cut</th>
              <th>Seasonal Bonus</th>
              <th>Absence</th>
              <th>Pfund Cut</th>
              <th>Pay ID</th>
              <th>Employee ID</th>
              <th>Overtime</th>
              <th>Medical Allowance</th>
              <th>Other Bonus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { 
            // console.log(payments)
            payments.map((payment) => (
              <tr key={payment.payid}>
                <td>{payment.totalPay}</td>
                <td>{payment.year}</td>
                <td>{payment.month}</td>
                <td>{payment.houseAllowance}</td>
                <td>{payment.loanCut}</td>
                <td>{payment.seasonalBonus}</td>
                <td>{payment.absence}</td>
                <td>{payment.pfundCut}</td>
                <td>{payment.payid}</td> {/* Update to payId */}
                <td>{payment.employeeid}</td> {/* Update to employeeId */}
                <td>{payment.overtime}</td>
                <td>{payment.medicalAllowance}</td>
                <td>{payment.otherBonus}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(payment.payid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
