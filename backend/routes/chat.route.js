const express = require('express');
const router = express.Router();
const {buildDoubtPrompt} = require("../utils/prompts");
const {responseGenerator} = require("../utils/responseGenerator");

router.post("/",async (req,res)=>{
    const {message} = req.body;
    const prompt = buildDoubtPrompt(message);
    const response = await responseGenerator(prompt);
    // console.log("Generated response:", response);
    res.send({ response });
})

module.exports = router;