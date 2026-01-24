// server/controllers/aiController.js
import { Groq } from "groq-sdk";
import Employee from "../models/Employee.js";

/**
 * Find best employees for a project
 * @route POST /api/ai/recommend
 */
const getBestMatch = async (req, res) => {
  try {
    // Initialize Groq client here (after dotenv has loaded)
    const apiKey = process.env.GROQ_API_KEY;
    console.log("🔑 API Key loaded:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
    const groq = new Groq({ apiKey });
    
    const { projectRequirements } = req.body;

    // 1. Fetch all available employees from DB
    // Only fetch available employees
    const employees = await Employee.find({ isAvailable: true })
      .select('name role skills experienceLevel department age')
      .lean();// Use lean() for faster read-only queries

    if (employees.length === 0) {
      return res.status(400).json({ message: "No available employees found in database." });
    }

    // 2. Construct the optimized prompt
    // Enhanced prompt with better structure and employee context
    const prompt = `
      You are an expert HR analyst and project manager. Analyze the following project requirements and match them against the available employees.

      Project Requirements: "${projectRequirements}"

      Available Employees:
      ${employees.map(emp => `
        Name: ${emp.name}
        Role: ${emp.role}
        Department: ${emp.department}
        Experience Level: ${emp.experienceLevel}
        Skills: ${emp.skills.join(', ')}
        Age: ${emp.age}
      `).join('\n')}

      Analysis Instructions:
      1. Carefully analyze each employee's skills, experience level, and role against the project requirements
      2. Consider the relevance of each skill to the project needs
      3. Factor in experience level - Senior developers should score higher for complex requirements
      4. Prioritize employees with direct skill matches over tangential ones
      5. Select the Top 3 best candidates based on comprehensive analysis

      Output Requirements:
      - Return ONLY a valid JSON array with exactly 3 candidates (or fewer if less than 3 employees available)
      - Each candidate must have: name, matchPercentage (0-100), reason (1-2 sentences max)
      - Match percentage should reflect skill relevance, experience level, and role alignment
      - Reason should be specific and actionable
      - Do NOT include any markdown formatting, explanations, or additional text

      Example Output Format:
      [
        { "name": "John Doe", "matchPercentage": 95, "reason": "Senior developer with 8 years of React and Node.js experience, directly matching project tech stack requirements." },
        { "name": "Jane Smith", "matchPercentage": 82, "reason": "Mid-level developer with strong JavaScript skills and 3 years of frontend development experience." }
      ]
    `;

    // 3. Call the AI with optimized parameters
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 1024
    });
    
    const resultText = response.choices[0]?.message?.content || "";
    
    // 4. Clean and parse the response
    let text = resultText;
    // Remove any markdown formatting that might be present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // 5. Parse to JSON and validate structure
    const recommendations = JSON.parse(text);
    
    // Validate that we have the expected structure
    if (!Array.isArray(recommendations)) {
      throw new Error("Invalid response format from AI");
    }

    // Ensure match percentages are valid numbers
    const validatedRecommendations = recommendations.map(rec => ({
      ...rec,
      matchPercentage: Math.max(0, Math.min(100, parseInt(rec.matchPercentage) || 0))
    }));

    res.json(validatedRecommendations);

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ 
      message: "AI Analysis Failed", 
      error: error.message,
      details: error.stack 
    });
  }
};

export { getBestMatch };
