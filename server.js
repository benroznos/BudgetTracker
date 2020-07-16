require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// routes
app.use(require("./routes/api.js"));

app.listen(process.env.PORT, () => {
  console.log(`server running on port 3001`);
});