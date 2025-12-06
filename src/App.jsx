import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import AddEmployee from './components/AddEmployee'
import AllEmployees from './components/AllEmployees'
import axios from 'axios'
import EditEmployee from './components/EditEmployee'

function App() {

  const API_URL = "http://127.0.0.1:8000/"
  const [employee, setEmployee] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [idForEdit, setIdForEdit] = useState(null);

  const fetchEmployees = async () => {
      try {
          const { data } = await axios.get(`${API_URL}employee`);
          console.log("API response: ", data);
          setEmployee(data);
      } catch (error) {
          console.error("API error: ", error);
          setEmployee([]);
          if (error.response) {
              console.log(error.response.data);
          } else {
              console.log("Network error");
          }
      }
  };

  return (
    <div className='w-[1200px] m-auto relative'>
      <Navbar />
      <hr className='my-5 border-gray-300'/>
      <AddEmployee API_URL={API_URL} fetchEmployees={fetchEmployees} />
      <hr className='my-5 border-gray-300'/>
      <AllEmployees API_URL={API_URL} fetchEmployees={fetchEmployees} employee={employee} setIsEditMode={setIsEditMode} setIdForEdit={setIdForEdit}/>
      <div className={`${isEditMode ? 'absolute' : 'hidden'} top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
        <EditEmployee idForEdit={idForEdit} API_URL={API_URL} setIsEditMode={setIsEditMode} fetchEmployees={fetchEmployees}/>
      </div>
    </div>
  )
}

export default App
