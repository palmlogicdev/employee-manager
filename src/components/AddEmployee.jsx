import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AddEmployee({ API_URL, fetchEmployees, roles }) {

    const employeeRef = {
        firstname: "",
        lastname: "",
        email: "",
        salary: "",
        role: "",
        status: "Inactive"
    }

    const [employee, setEmployee] = useState(employeeRef);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        let newChange = { ...employee, [name]: value };

        setEmployee(newChange);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newError = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!employee.firstname?.trim()) {
            newError.firstname = "firstname is required";
        }

        if (!employee.lastname?.trim()) {
            newError.lastname = "Lastname is required";
        }

        if (!employee.email?.trim()) {
            newError.email = "Email is required";
        } else if (!emailRegex.test(employee.email.trim())) {
            newError.email = "Email is invalid";
        }

        if (!employee.salary?.trim()) {
            newError.salary = "Salary is required";
        }

        if (!employee.role?.trim()) {
            newError.role = "Role is required";
        }

        setError(newError);

        if (Object.keys(newError).length == 0) {
            try {
                const { data } = await axios.post(`${API_URL}/employee`, employee, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('API response: ', data);
                setEmployee(employeeRef);
                fetchEmployees();
            } catch (error) {
                console.error("API error: ", error);

                if (error.response) {
                    console.log(error.response.data);
                } else {
                    console.log("Network or CORS error");
                }
            }
        }
    };  

    return (
        <div id='add_employee'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-box flex flex-col my-1">
                    <label htmlFor="firstname">Firstname</label>
                    <input 
                        id="firstname" 
                        type="text" 
                        name="firstname" 
                        className={`border p-1 rounded ${error.firstname ? "border-red-700" : "border-gray-300"}`}
                        value={employee.firstname}
                        onChange={(e) => handleChange(e)} 
                    />
                    {error.firstname && <span className='text-red-500'>{error.firstname}</span>}
                </div>
                <div className="input-box flex flex-col my-1">
                    <label htmlFor="lastname">Lastname</label>
                    <input 
                        id="lastname" 
                        type="text" 
                        name="lastname" 
                        className={`border p-1 rounded ${error.lastname ? "border-red-700" : "border-gray-300"}`}
                        value={employee.lastname}
                        onChange={(e) => handleChange(e)} 
                    />
                    {error.lastname && <span className='text-red-500'>{error.lastname}</span>}
                </div>
                <div className="input-box flex flex-col my-1">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        className={`border p-1 rounded ${error.email ? "border-red-700" : "border-gray-300"}`}
                        value={employee.email}
                        onChange={(e) => handleChange(e)} 
                    />
                    {error.email && <span className='text-red-500'>{error.email}</span>}
                </div>
                <div className="input-box flex flex-col my-1">
                    <label htmlFor="salary">Salary</label>
                    <input 
                        id="salary" 
                        type="number" 
                        name="salary" 
                        className={`border p-1 rounded ${error.salary ? "border-red-700" : "border-gray-300"}`}
                        value={employee.salary}
                        onChange={(e) => handleChange(e)} 
                    />
                    {error.salary && <span className='text-red-500'>{error.salary}</span>}
                </div>
                <div className="input-box flex flex-col my-1">
                    <label htmlFor="role">Role</label>
                    <select 
                        name="role" 
                        id="role" 
                        className={`border p-1 rounded ${error.role ? "border-red-700" : "border-gray-300"}`}
                        onChange={(e) => handleChange(e)} 
                        value={employee.role}
                    >
                        <option value="">Please Select</option>
                        {roles.map((role) => (
                            <option value={role}>{role}</option>
                        ))}
                    </select>
                    {error.role && <span className='text-red-500'>{error.role}</span>}
                </div>
                <button 
                    className='border-none bg-green-600 text-xl rounded text-white p-1 mt-3 cursor-pointer active:bg-green-800'
                    type='submit'
                >Submit</button>
            </form>
        </div>
    )
}

export default AddEmployee