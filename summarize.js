const axios = require("axios");
require("dotenv").config();

// This is the function where the call to the API is made. Returns the summarized text as a string.

async function summarizeText(text, range) {
  let max, min;

  if (range == 1) {
    max = 100;
    min = 50;
  } else if (range == 2) {
    max = 200;
    min = 100;
  } else if (range == 3) {
    max = 400;
    min = 200;
  } else {
    max = 70;
    min = 50;
  }
  let data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: max,
      min_length: min,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (err) {
    console.log(err);
  }
}

// Allows for summarizeText() to be called outside of this file

module.exports = summarizeText;
