const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./routers/user");

const mongoURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/fakebook";

mongoose.connect(mongoURL);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(User);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
