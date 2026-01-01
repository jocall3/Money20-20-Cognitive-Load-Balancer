
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiInsights = async (systemState: any) => {
  if (!API_KEY) return "API Key not configured for AI Insights.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze this system state and user cognitive metrics. 
        Provide 3 concise operational recommendations. 
        Focus on preventing burnout and optimizing payment rail throughput.
        
        System State:
        ${JSON.stringify(systemState, null, 2)}
      `,
      config: {
        systemInstruction: "You are a world-class systems orchestration engineer specializing in Fintech and Cognitive UI/UX.",
        temperature: 0.7,
      },
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error communicating with the Agentic AI layer.";
  }
};
