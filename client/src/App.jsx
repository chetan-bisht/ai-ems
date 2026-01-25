import { Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';

import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-6">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/ai-match" element={<h2 className="text-center mt-10">AI Match</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;