const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const userController = require('../controller/userController');

const router = express.Router();

// Serve the index.html file
router.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, '../../frontend', 'index.html');
    res.sendFile(indexPath);
});

// Render sign in page
router.get('/user/signin', (req, res) => {
    const loginPagePath = path.resolve(__dirname, '../../frontend', 'signin.html');
    res.sendFile(loginPagePath);
});

// Render sign up page
router.get('/user/signup', (req, res) => {
    const signupPagePath = path.resolve(__dirname, '../../frontend', 'signup.html');
    res.sendFile(signupPagePath);
});

// Create an account
router.post('/user/signup', userController.signup);

// Log in
router.post('/user/login', userController.login);

// Log out
router.post('/user/logout', userController.logout);

// Check login status
router.get('/user/login', userController.checkLogin);

// Render error page
router.get('/error', (req, res) => {
    const errorPagePath = path.resolve(__dirname, '../../frontend', 'error.html');
    res.sendFile(errorPagePath);
});

app.use('/api', router); // Mount the router on the /api path

module.exports.handler = serverless(app);
