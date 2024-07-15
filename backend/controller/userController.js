const fs = require('fs');
const path = require('path');

const signup = (req, res) => {
    const { newUsername, newPassword } = req.body;

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

    if (!usernameRegex.test(newUsername)) {
        return res.status(400).json({ error: 'Invalid username format.' });
    }
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ error: 'Invalid password format.' });
    }

    const loginFilePath = path.join(__dirname, '../database', 'user-database.txt');
    const existingUsers = fs.readFileSync(loginFilePath, 'utf8')
                                    .split('\n')
                                    .map(line => line.split(':')[0]);
    if (existingUsers.includes(newUsername)) {
        return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
    }

    fs.appendFileSync(loginFilePath, `${newUsername}:${newPassword}\n`);
    res.status(200).json({ message: 'Account created successfully. You can now log in.', redirectUrl: '/signin.html' });
};

const login = (req, res) => {
    const { username, password } = req.body;

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Invalid username or password format.', redirectUrl: '/error' });
    }

    const loginFilePath = path.join(__dirname, '../database', 'user-database.txt');
    const existingUsers = fs.readFileSync(loginFilePath, 'utf8')
                                    .split('\n')
                                    .map(line => line.split(':')[0]);
   
    if (existingUsers.includes(username)) {
        const userData = fs.readFileSync(loginFilePath, 'utf8')
                                  .split('\n')
                                  .find(line => line.startsWith(`${username}:`));
        const storedPassword = userData.split(':')[1].trim();

        if (password === storedPassword) {
            req.session.username = username;
            req.session.isLogin = true;
            return res.status(200).json({ message: 'Login successful!', redirectUrl: '/' });
        } else {
            return res.status(401).json({ error: 'Invalid password.', redirectUrl: '/error' });
        }
    } else {
        return res.status(401).json({ error: 'Username not found.', redirectUrl: '/error' });
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: 'An error occurred during logout' });
        } else {
            res.redirect('/');
        }
    });
};

const checkLogin = (req, res) => {
    if (req.session.isLogin) {
        return res.status(200).json({ isLogin: true, username: req.session.username });
    } else {
        return res.status(200).json({ isLogin: false });
    }
};

module.exports = {
    signup,
    login,
    logout,
    checkLogin
};
