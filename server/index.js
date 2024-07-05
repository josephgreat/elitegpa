const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./db/connection");
const apiRouter = require("./routes/apis");

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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Middleware
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/elitegpa', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

// Routes
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
