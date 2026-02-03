import { Groq } from "groq-sdk";
import Employee from "../models/Employee.js";

const getBestMatch = async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("🔑 API Key loaded:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
    const groq = new Groq({ apiKey });
    
    const { projectRequirements } = req.body;

    const employees = await Employee.find({ isAvailable: true })
      .select('name role skills experienceLevel department age')
      .lean();

    if (employees.length === 0) {
      return res.status(400).json({ message: "No available employees found in database." });
    }

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
    
    let text = resultText;
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const recommendations = JSON.parse(text);
    
    if (!Array.isArray(recommendations)) {
      throw new Error("Invalid response format from AI");
    }

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
