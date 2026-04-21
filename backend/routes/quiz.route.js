const express = require('express');
const router = express.Router();
const { quizGenerator } = require("../utils/quizGenerator");
const {buildPrompt} = require("../utils/prompts");

router.post("/",async(req,res)=>{
    const { topic, classLevel, subject } = req.body;
    const prompt = buildPrompt({ classLevel, subject, topic });
    const quiz =await quizGenerator(prompt);
    // Here you would normally generate the quiz based on the topic, difficulty, and number of questions.
    // For demonstration, we'll just return a dummy quiz.
    res.json(quiz);
})

module.exports = router;