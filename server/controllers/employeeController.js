import Employee from '../models/Employee.js';

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, age, email, phoneNumber, role, department, skills, experienceLevel } = req.body;
    const employee = new Employee({
      name,
      age,
      email,
      phoneNumber,
      role,
      department,
      skills,
      experienceLevel,
    });
    const createdEmployee = await employee.save();
    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add employee', error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

export { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };
