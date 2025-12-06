import axios from "axios";
import React, { useEffect, useState } from "react";

function AllEmployees({ API_URL, fetchEmployees, employee, setIdForEdit, setIsEditMode }) {

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("คุณต้องการลบพนักงานคนนี้หรือไม่?");

        if (confirmDelete) {
            try {
                const { data } = await axios.delete(`${API_URL}employee/${id}`); 
                
                console.log("API response: ", data);
                fetchEmployees();
            } catch (error) {
                console.error("API error: ", error);
                if (error.response) {
                    console.log("API error: ", error.response.data);
                } else {
                    console.log("Network error");
                }
            }
        }
    }

    return (
        <div id="all_employee" className="p-4">
            <div className="overflow-x-auto rounded shadow-lg bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-linear-to-r from-blue-500 to-indigo-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">Firstname</th>
                            <th className="px-6 py-3 text-left">Lastname</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Salary</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">EDIT</th>
                            <th className="px-6 py-3 text-left">DELETE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(employee) && employee.length > 0 ?
                        employee.map((data) => (
                            <tr
                                key={data.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition-all"
                                >
                                <td className="px-6 py-3">{data.id}</td>
                                <td className="px-6 py-3">{data.firstname}</td>
                                <td className="px-6 py-3">{data.lastname}</td>
                                <td className="px-6 py-3">{data.email}</td>
                                <td className="px-6 py-3">{data.salary}</td>
                                <td className="px-6 py-3">{data.role}</td>
                                <td><button className="bg-yellow-500 text-white p-2 rounded cursor-pointer hover:bg-yellow-600" onClick={() => { setIsEditMode(true); setIdForEdit(data.id)}}>EDIT</button></td>
                                <td><button className="bg-red-700 text-white p-2 rounded cursor-pointer hover:bg-red-800" onClick={() => handleDelete(data.id)}>DELETE</button></td>
                            </tr>
                        )) : 
                            <tr>
                                <td className="text-center px-6 py-3 text-xl" colSpan="8">NO EMPLOYEES</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllEmployees;
