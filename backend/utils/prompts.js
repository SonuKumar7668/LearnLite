const buildPrompt = ({ classLevel, subject, topic }) => `
Generate a quiz for a Class ${classLevel} student.

Subject: ${subject}
Topic: ${topic}

Requirements:
- Generate exactly 20 multiple choice questions
- Each question must have 4 options
- Only one correct answer
- Include explanation for each answer
- Difficulty: moderate (school level)

STRICT RULES:
- Return ONLY valid JSON
- Do NOT include markdown, code blocks, or extra text
- Follow this exact structure:

{
  "quiz": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correct": "A",
      "explanation": "string"
    }
  ]
}
`;

const buildDoubtPrompt = (userQuestion) => `
You are an AI tutor designed ONLY to solve academic doubts for school students.

STRICT RULES:
1. Only answer questions related to study topics (Math, Science, Physics, Chemistry, Biology, History, Geography, English, etc.)
2. If the question is NOT related to studies, respond ONLY with:
"I can only help with academic or study-related questions."

3. Do NOT answer:
- Personal questions
- Casual conversation
- Entertainment topics
- Anything outside education

4. Response Style:
- Write in simple, clear language
- Explain step-by-step when needed
- Use short paragraphs
- Make it easy for school students to understand
- Be helpful and teacher-like

5. IMPORTANT:
- Do NOT return JSON
- Do NOT use markdown formatting like \`\`\`
- Return ONLY plain text (normal readable explanation)

Structure your answer like this:

Title: <short topic name>

Explanation:
<clear explanation>

Example:
<simple example>

Summary:
- point 1
- point 2
- point 3

User Question:
"${userQuestion}"
`;

module.exports = {
    buildPrompt,
    buildDoubtPrompt
}