const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const quizRoute = require("./routes/quiz.route");
const chatRoute = require("./routes/chat.route");
const authRoute = require("./routes/auth.route");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/quiz", quizRoute);
app.use("/api/chat", chatRoute);
app.use("/api/auth", authRoute);

app.listen(port, async() => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`Server is running on http://localhost:${port}`);
});