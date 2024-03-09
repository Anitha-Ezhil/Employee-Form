import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [employeeData, setEmployeeData] = useState({
        employee_id: '',
        name: '',
        department: '',
        date_of_joining: '',
        email: ''
    });
    const [currentPage, setCurrentPage] = useState(1); // Track current page (1 for basic info, 2 for email)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentPage === 1) {
            setCurrentPage(2); // Move to next page when basic info is submitted
        } else {
            // Submit data when email is entered
            axios.post('http://localhost:5000/api/employees', employeeData)
                .then((response) => {
                    console.log(response.data);
                    alert('Employee added successfully');
                })
                .catch((error) => {
                    console.error('Error adding employee: ', error);
                    alert('Error adding employee');
                });
        }
    };

    return (
        <div className="form">
            <h2>Employee Details</h2>
            <form onSubmit={handleSubmit}>
                {currentPage === 1 && (
                    <>
                        <label>
                            Employee ID:
                            <input type="text" name="employee_id" value={employeeData.employee_id} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Name:
                            <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Department:
                            <input type="text" name="department" value={employeeData.department} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Date of Joining:
                            <input type="date" name="date_of_joining" value={employeeData.date_of_joining} onChange={handleChange} />
                        </label>
                    </>
                )}
                {currentPage === 2 && (
                    <>
                        <label>
                            Email:
                            <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
                        </label>
                    </>
                )}
                <br />
                <button type="submit">{currentPage === 1 ? "Next" : "Add Employee"}</button>
            </form>
        </div>
    );
}

export default App;