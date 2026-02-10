# AI Employee Management System

An AI-powered Employee Management System that manages employee records and uses Groq AI (Llama 3.3) to intelligently match employees to project requirements.

## 🚀 Live Demo

**[View Live Application](https://ai-staff-manager.onrender.com/)**

> **Note:** The app is hosted on Render's free tier. If the app hasn't been accessed recently, the first load may take 30-50 seconds as the server wakes up.

## Features

- **Employee Management**: Create, read, update, and delete employee profiles
- **AI-Powered Matching**: Use Groq AI (Llama 3.3) to find the best employees for project requirements
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **RESTful API**: Well-structured backend with Express.js

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js (v5)
- MongoDB with Mongoose
- Groq AI (Llama 3.3)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB database (MongoDB Atlas recommended for cloud deployment)
- Groq API key ([Get one here](https://console.groq.com/))

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
   GROQ_API_KEY=your_groq_api_key
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

- `POST /api/ai/recommend` - Find best employees for project requirements

## 🌐 Deployment

This project is deployed on [Render](https://render.com) using a unified deployment approach where both frontend and backend are served from a single web service.

### Deploy to Render

1. **Set up MongoDB Atlas** (free tier available)
   - Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string

2. **Deploy to Render**
   - Fork/Clone this repository
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Configure the following:
     - **Build Command:** `npm run build`
     - **Start Command:** `npm start`
     - **Environment Variables:**
       - `MONGO_URI`: Your MongoDB Atlas connection string
       - `GROQ_API_KEY`: Your Groq API key
       - `NODE_ENV`: `production`

3. **Deploy!** Render will automatically build and deploy your application.

### Architecture

The deployment uses a monorepo structure where:

- The root `package.json` orchestrates the build process
- Frontend (React/Vite) is built into static files
- Backend (Express) serves both the API and the static frontend files
- All requests to `/api/*` are handled by the Express API
- All other requests serve the React application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Chetan Bisht
