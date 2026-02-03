import { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phoneNumber: '',
    role: '',
    department: '',
    experienceLevel: 'Mid',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillArray = formData.skills.split(',').map(s => s.trim());

      await api.post('/employees', { ...formData, skills: skillArray });
      
      toast.success("Employee Added Successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to add employee");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="name" placeholder="Full Name" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        <input 
          name="age" type="number" placeholder="Age" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        <input 
          name="email" type="email" placeholder="Email Address" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        <input 
          name="phoneNumber" placeholder="Phone Number" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        <input 
          name="role" placeholder="Job Role (e.g. Frontend Dev)" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        <input 
          name="department" placeholder="Department (e.g. Engineering)" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />
        
        <select name="experienceLevel" className="w-full p-2 border rounded" onChange={handleChange}>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>

        <input 
          name="skills" placeholder="Skills (comma separated: React, Node, SQL)" required 
          className="w-full p-2 border rounded" onChange={handleChange} 
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
