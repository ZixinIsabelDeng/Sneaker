// Import necessary modules
const express = require("express");
const session = require("express-session");
const path = require("path");
const rootRouter = require("../router/rootRouter");
const serverless = require("serverless-http");

// Create express app
const app = express();

// Serve static files from the frontend folder
app.use(express.static(path.resolve(__dirname, "../../frontend")));

// Parse json
app.use(express.json());

// Parse url-encoded
app.use(express.urlencoded({ extended: false }));

// Handle session
app.use(
  session({
    secret: "GROUP SEVEN, A PLUS",
    resave: false,
    saveUninitialized: false,
  })
);

// Use root router
app.use("/.netlify/functions/server", rootRouter); // Prefix path for Netlify Functions

module.exports.handler = serverless(app);

// For local testing
if (process.env.NODE_ENV !== "production") {
  const PORT = 3005;
  app.listen(PORT, () => {
    console.log(`SNEAKER e-commerce server listening on port ${PORT}...`);
  });
}
