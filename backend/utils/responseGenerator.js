const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const responseGenerator =async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });
        console.log("Sending prompt to Gemini:", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/^```json\s*|^```\s*|```\s*$/gm, "").trim();
        console.log("Raw response from Gemini:", text);

        return text;
    } catch (err) {
        console.error("Error parsing response with Gemini:", err);
        throw new Error("Failed to parse response");
    }
}

module.exports = {
    responseGenerator
}