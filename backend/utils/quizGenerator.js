const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



const quizGenerator =async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/^```json\s*|^```\s*|```\s*$/gm, "").trim();
        return JSON.parse(text);
    } catch (err) {
        console.error("Error parsing quiz with Gemini:", err);
        throw new Error("Failed to parse quiz");
    }
}

module.exports = {
    quizGenerator
}