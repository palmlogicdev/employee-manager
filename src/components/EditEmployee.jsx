import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditEmployee({ idForEdit, API_URL, setIsEditMode, fetchEmployees }) {

    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        email: "",
        salary: 0,
        role: ""
    });
    const [error, setError] = useState({});

    useEffect(() => {

        if (!idForEdit) return;

        const selectEmployee = async () => {
            try {
                const { data } = await axios.get(`${API_URL}employee/${idForEdit}`);
                console.log(data);
                setEmployee(data);
            } catch (error) {
                if (error.response) {
                    console.log("API error: ", error.response.data);
                } else {
                    console.log("Network error");
                }
            }
        }

        selectEmployee();
    }, [idForEdit]);

    if (!idForEdit) {
        return (
            <div>
                <p>No employee selected</p>
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newEmployee = { ...employee, [name]: String(value).trim()}
        setEmployee(newEmployee);
    }

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
                const { data } = await axios.put(`${API_URL}employee/${idForEdit}`, employee);
                console.log(data);
                fetchEmployees();
                setIsEditMode(false);
            } catch (error) {
                if (error.response) {
                    console.log("API error: ", error.response.data);
                } else {
                    console.log("Nerwork error");
                }
            }
        }

    }

    return (
        <div id='edit_employee' className='bg-white p-3 rounded shadow-2xl relative w-[600px]'>
            <button className='absolute top-2 right-2 bg-gray-200 p-2' onClick={() => {setIsEditMode(false)}}>X</button>
            <h1 className='text-3xl my-3'>Edit Employee</h1>
            <hr />
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-box my-3 flex flex-col">
                    <label htmlFor="firstname">Firstname</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        id="firstname"
                        className='border border-gray-300 p-1 rounded'
                        value={employee.firstname} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="input-box my-3 flex flex-col">
                    <label htmlFor="lastname">Lastname</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        id="lastname"
                        className='border border-gray-300 p-1 rounded'
                        value={employee.lastname} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="input-box my-3 flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email"
                        className='border border-gray-300 p-1 rounded'
                        value={employee.email} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="input-box my-3 flex flex-col">
                    <label htmlFor="salary">Salary</label>
                    <input 
                        type="number" 
                        name="salary" 
                        id="salary"
                        className='border border-gray-300 p-1 rounded'
                        value={employee.salary} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="input-box my-3 flex flex-col">
                    <label htmlFor="role">Role</label>
                    <select 
                        name="role" 
                        id="role" 
                        className='border border-gray-300 p-1 rounded'
                        onChange={(e) => handleChange(e)} 
                        value={employee.role}
                    >
                        <option value="">Please Select</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Mid-Level Developer">Mid-Level Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Lead Developer / Tech Lead">Lead Developer / Tech Lead</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Mobile Developer">Mobile Developer</option>
                    </select>
                </div>
                <button type="submit" className='border-none bg-green-600 text-xl rounded text-white p-1 mt-3 cursor-pointer active:bg-green-800'>SUBMIT</button>
            </form>
        </div>
    )
}

export default EditEmployee