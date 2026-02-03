import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true, 
  },
  department: {
    type: String,
    required: true, 
  },
  skills: {
    type: [String],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'], 
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true, 
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
