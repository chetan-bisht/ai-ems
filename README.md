# AI Employee Management System

An AI-powered Employee Management System that manages employee records and uses Google Gemini AI to intelligently match employees to project requirements.

## Features

- **Employee Management**: Create, read, update, and delete employee profiles
- **AI-Powered Matching**: Use Gemini AI to find the best employees for project requirements
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **RESTful API**: Well-structured backend with Express.js

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Google Gemini AI API

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chetan-bisht/ai-ems.git
   cd ai-ems
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```

4. **Seed the database (optional)**
   ```bash
   node seed.js
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

6. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

7. **Open the app**
   
   Navigate to `http://localhost:5173` in your browser.

## Project Structure

```
ai-ems/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── api.js          # API configuration
│   │   └── App.jsx         # Main app with routing
│   └── ...
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── seed.js             # Database seeder
│   └── index.js            # Server entry point
└── README.md
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### AI Matching
- `POST /api/ai/match` - Find best employees for project requirements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chetan Bisht
