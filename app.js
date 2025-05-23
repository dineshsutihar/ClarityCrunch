const express = require("express");
const app = express();
require("dotenv").config();
const summarizeText = require("./summarize.js");

const port = process.env.PORT || 3000;
// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static("public"));

// summarize endpoint
app.post("/summarize", (req, res) => {
  const text = req.body.text_to_summarize;
  const range = req.body.range;

  summarizeText(text, range)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
