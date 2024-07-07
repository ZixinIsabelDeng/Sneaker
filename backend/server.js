// Import necessary modules
const express = require('express');
const session = require('express-session');

// Define const
const PORT = 3005;

// Create express app
const app = express();

// TODO: Middlewares
// Handle session
app.use(session({
   secret: 'group seven',
   resave: false,
   saveUninitialized: false,
}));

// Parse json
app.use(express.json());

// Parse url-encoded
app.use(express.urlencoded({ extended: false}));

// Use root route
app.use('/', (req, res) => {
   res.send('Welcome to the SNEAKER e-commerce server!');
});

// Register port
app.listen(PORT, () => {
   console.log(`SNEAKER e-commerce server listening on port ${PORT}...`);
});