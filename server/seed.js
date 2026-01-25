// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Employee from './models/Employee.js';

dotenv.config();

const employees = [
  {
    name: 'John Smith',
    age: 32,
    email: 'john.smith@company.com',
    phoneNumber: '555-0101',
    role: 'Senior Frontend Developer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'CSS', 'Next.js', 'GraphQL'],
    experienceLevel: 'Senior',
    isAvailable: true
  },
  {
    name: 'Sarah Johnson',
    age: 28,
    email: 'sarah.johnson@company.com',
    phoneNumber: '555-0102',
    role: 'Backend Developer',
    department: 'Engineering',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    experienceLevel: 'Mid',
    isAvailable: true
  },
  {
    name: 'Michael Chen',
    age: 35,
    email: 'michael.chen@company.com',
    phoneNumber: '555-0103',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'Linux'],
    experienceLevel: 'Senior',
    isAvailable: false
  },
  {
    name: 'Emily Davis',
    age: 26,
    email: 'emily.davis@company.com',
    phoneNumber: '555-0104',
    role: 'UI/UX Designer',
    department: 'Design',
    skills: ['Figma', 'Adobe XD', 'CSS', 'User Research', 'Prototyping'],
    experienceLevel: 'Mid',
    isAvailable: true
  },
  {
    name: 'David Wilson',
    age: 24,
    email: 'david.wilson@company.com',
    phoneNumber: '555-0105',
    role: 'Junior Developer',
    department: 'Engineering',
    skills: ['JavaScript', 'React', 'HTML', 'CSS'],
    experienceLevel: 'Junior',
    isAvailable: true
  },
  {
    name: 'Jessica Martinez',
    age: 30,
    email: 'jessica.martinez@company.com',
    phoneNumber: '555-0106',
    role: 'Data Scientist',
    department: 'Analytics',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas'],
    experienceLevel: 'Mid',
    isAvailable: true
  },
  {
    name: 'Robert Taylor',
    age: 40,
    email: 'robert.taylor@company.com',
    phoneNumber: '555-0107',
    role: 'Engineering Manager',
    department: 'Engineering',
    skills: ['Leadership', 'Agile', 'System Design', 'Java', 'Mentoring'],
    experienceLevel: 'Senior',
    isAvailable: false
  },
  {
    name: 'Amanda Brown',
    age: 27,
    email: 'amanda.brown@company.com',
    phoneNumber: '555-0108',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    skills: ['Selenium', 'Jest', 'Cypress', 'API Testing', 'Test Planning'],
    experienceLevel: 'Mid',
    isAvailable: true
  },
  {
    name: 'James Anderson',
    age: 33,
    email: 'james.anderson@company.com',
    phoneNumber: '555-0109',
    role: 'Full Stack Developer',
    department: 'Engineering',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    experienceLevel: 'Senior',
    isAvailable: true
  },
  {
    name: 'Lisa Thompson',
    age: 25,
    email: 'lisa.thompson@company.com',
    phoneNumber: '555-0110',
    role: 'Mobile Developer',
    department: 'Engineering',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    experienceLevel: 'Junior',
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Employee.deleteMany({});
    console.log('Cleared existing employees');

    await Employee.insertMany(employees);
    console.log(`Added ${employees.length} employees to the database`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
