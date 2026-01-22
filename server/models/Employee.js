// server/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Must have a name
  },
  age: {
    type: Number, // Age of the employee
    required: true,
  },
  email: {
    type: String, // Email address
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String, // Contact number
    required: true,
  },
  role: {
    type: String, // Job title
    required: true, 
  },
  department: {
    type: String, // Job department
    required: true, 
  },
  skills: {
    type: [String], // Array of strings
    required: true,
  },
  experienceLevel: {
    type: String, // e.g., Junior, Mid, Senior
    enum: ['Junior', 'Mid', 'Senior'], 
    required: true,
  },
  // We will track availability to see if they can take new projects
  isAvailable: {
    type: Boolean,
    default: true, 
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt'
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;