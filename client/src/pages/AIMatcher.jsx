// client/src/pages/AIMatcher.jsx
import { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const AIMatcher = () => {
  const [requirements, setRequirements] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!requirements) return toast.error("Please enter project details");

    setLoading(true);
    setMatches([]); // Clear previous results

    try {
      // Send the text to our Backend AI Route
      const res = await api.post('/ai/recommend', { projectRequirements: requirements });
      setMatches(res.data);
      toast.success("AI Analysis Complete!");
    } catch (error) {
      console.error(error);
      toast.error("AI Service failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          ✨ AI Project Matcher
        </h2>
        <p className="text-gray-600 mb-4">
          Describe your project needs (skills, difficulty, etc.) and AI will find the best team.
        </p>

        {/* Input Area */}
        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none h-32"
          placeholder="Example: I need a senior developer who knows React and has experience with financial apps..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-lg text-white font-bold text-lg transition
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90'}
          `}
        >
          {loading ? "AI is thinking... 🤖" : "Find Best Matches 🔍"}
        </button>
      </div>

      {/* Results Section */}
      {matches.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-700">Top Recommendations</h3>
          
          {matches.map((emp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500 flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold">{emp.name}</h4>
                <p className="text-gray-600 mt-1">{emp.reason}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-600">{emp.matchPercentage}%</span>
                <div className="text-xs text-gray-500 uppercase">Match Score</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIMatcher;