import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
    dateOfBirth: "", // New attribute
    phoneNumber: "", // New attribute
    gender: "", // New attribute
    bankAccountNumber: "", // New attribute
    pfund: "", // New attribute
    loan: "", // New attribute
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();//to update the category , category holds the current value and setCategory holds the updated value

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);//same thing as category.jsx
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("image", employee.image);
    formData.append("category_id", employee.category_id);
    formData.append("dateOfBirth", employee.dateOfBirth); // New attribute
    formData.append("phoneNumber", employee.phoneNumber); // New attribute
    formData.append("gender", employee.gender); // New attribute
    formData.append("bankAccountNumber", employee.bankAccountNumber); // New attribute
    formData.append("pfund", employee.pfund); // New attribute
    formData.append("loan", employee.loan); // New attribute

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
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
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="dateOfBirth"
              onChange={(e) =>
                setEmployee({ ...employee, dateOfBirth: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              onChange={(e) =>
                setEmployee({ ...employee, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              name="gender"
              className="form-control rounded-0"
              id="gender"
              
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="bankAccountNumber" className="form-label">
              Bank Account Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="bankAccountNumber"
              placeholder="Enter Bank Account Number"
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  bankAccountNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="pfund" className="form-label">
              Pfund
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="pfund"
              placeholder="Enter Pfund"
              onChange={(e) => setEmployee({ ...employee

, pfund: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="loan" className="form-label">
              Loan
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="loan"
              placeholder="Enter Loan"
              onChange={(e) => setEmployee({ ...employee, loan: e.target.value })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;