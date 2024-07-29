import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        image: "",
        dateOfBirth: "", // New attribute
        phoneNumber: "", // New attribute
        gender: "", // New attribute
        bankAccountNumber: "", // New attribute
        pfund: "", // New attribute
        loan: "", // New attribute
    });

    useEffect(()=> {
        axios.get('http://localhost:8081/get/'+id)
        .then(res => setEmployee(res.data.Result[0]))
        .catch(err => console.log(err));
    }, [id]);

    const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}

    return (
        <div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img src={`http://localhost:8081/images/`+employee.image} alt="" className='empImg'/>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: {employee.salary}</h3>
                    <h3>Date of Birth: {employee.dateOfBirth}</h3> {/* New attribute */}
                    <h3>Phone Number: {employee.phoneNumber}</h3> {/* New attribute */}
                    <h3>Gender: {employee.gender}</h3> {/* New attribute */}
                    <h3>Bank Account Number: {employee.bankAccountNumber}</h3> {/* New attribute */}
                    <h3>Pfund: {employee.pfund}</h3> {/* New attribute */}
                    <h3>Loan: {employee.loan}</h3> {/* New attribute */}
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail