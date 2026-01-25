// client/src/pages/EditEmployee.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        const emp = res.data;
        setFormData({
          name: emp.name,
          age: emp.age,
          email: emp.email,
          phoneNumber: emp.phoneNumber,
          role: emp.role,
          department: emp.department,
          experienceLevel: emp.experienceLevel,
          skills: emp.skills.join(', ')
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Failed to fetch employee details");
        navigate('/');
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillArray = formData.skills.split(',').map(s => s.trim());
      await api.put(`/employees/${id}`, { ...formData, skills: skillArray });
      
      toast.success("Employee Updated Successfully!");
      navigate('/'); 
    } catch (error) {
      toast.error("Failed to update employee");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            name="name" value={formData.name} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input 
            name="age" type="number" value={formData.age} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            name="email" type="email" value={formData.email} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            name="phoneNumber" value={formData.phoneNumber} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Role</label>
          <input 
            name="role" value={formData.role} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input 
            name="department" value={formData.department} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Level</label>
          <select name="experienceLevel" value={formData.experienceLevel} className="w-full p-2 border rounded" onChange={handleChange}>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input 
            name="skills" value={formData.skills} required 
            className="w-full p-2 border rounded" onChange={handleChange} 
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Employee
          </button>
          <button type="button" onClick={() => navigate('/')} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
