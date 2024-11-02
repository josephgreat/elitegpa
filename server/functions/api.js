const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const ServerlessHttp = require("serverless-http");  // Import serverless-http
dotenv.config();
require("../db/connection");
const apiRouter = require("../routes/apis");

const app = express();
const PORT = process.env.PORT || 6000;
app.use(cors());
app.use(bodyParser.json());

// Set COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(express.json());
app.use('/.netlify/functions/api', (res, req) => {
  return res.json({message: "hello"})
});  // Change path for Netlify function

// Comment out the local server line if deploying on Netlify
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const handler = ServerlessHttp(app);

module.exports.handler = async(event, context) => {
  const result = await handler(event, context);
  return result
};  // Wrap the app for serverless
