// Import necessary modules
const express = require('express');
const session = require('express-session');
const path = require('path');
const rootRouter = require('./router/rootRouter');

// Create express app
const app = express();
const PORT = 3005;

// Serve static files from the frontend folder
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Parse json
app.use(express.json());

// Parse url-encoded
app.use(express.urlencoded({ extended: false }));

// Handle session
app.use(session({
   secret: 'GROUP SEVEN, A PLUS',
   resave: false,
   saveUninitialized: false,
}));

// Use root router
app.use('/', rootRouter);

// Register port
app.listen(PORT, () => {
   console.log(`SNEAKER e-commerce server listening on port ${PORT}...`);
});
