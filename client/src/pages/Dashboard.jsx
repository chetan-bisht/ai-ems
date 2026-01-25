// client/src/pages/Dashboard.jsx
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import api from '../api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  // Memoize fetchEmployees to prevent unnecessary re-creations and satisfy useEffect dependencies
  const fetchEmployees = useCallback(async () => { 
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setEmployees]); // setEmployees is stable, so this callback is stable

  // Fetch employees when the page loads
  useEffect(() => {
    let ignore = false;
    const loadEmployees = async () => {
      try {
        const res = await api.get('/employees');
        if (!ignore) {
          setEmployees(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadEmployees();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee Deleted");
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee List</h2>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800">{emp.name}</h3>
            <p className="text-blue-600 font-medium">{emp.role}</p>
            <p className="text-gray-600 text-sm">{emp.department} • {emp.experienceLevel} • {emp.age} years old</p>
            <p className="text-gray-500 text-xs mt-1">{emp.email}</p>
            <p className="text-gray-500 text-xs">{emp.phoneNumber}</p>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {emp.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link 
                to={`/edit/${emp._id}`}
                className="text-blue-500 text-sm hover:underline"
              >
                Edit Details
              </Link>
              <button 
                onClick={() => handleDelete(emp._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;