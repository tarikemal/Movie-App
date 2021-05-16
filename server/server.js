const path = require("path");
const express = require("express");
const app = express();

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const cors = require("cors");
const mongoose = require("mongoose");
const authenticationRouter = require("./routes/authentication.router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

app.use("/", authenticationRouter);

app.listen(5000, () => console.log("Server is running on port 5000"));
