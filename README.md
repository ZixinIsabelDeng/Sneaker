# Sneaker E-commerce Website Description
- For COMP354 project , expand backend and new features.
- Reference (the original open source repo):
https://github.com/safak/youtube/tree/html-css-js-ecommerce

# How to start this program
To setup this project, you have to follow these simple steps. The required code to start the project is node.js and npm.
- cd to backend folder
- Run the `npm install` command to install all of the dependencies.
- Run the `npm start` command to run the server or npm test to test the code.
- Open http://localhost:3005/

# API Documentation

This document provides an overview of the available API endpoints for managing user accounts, including account creation, login, and logout. Each endpoint is described with its HTTP method, URL, and a brief explanation of its functionality.

## Endpoints

### Serve the Index Page
- **Method**: GET  
- **URL**: `/`  
- **Description**: Serves the main index.html file of the application.  

### Render Sign In Page
- **Method**: GET  
- **URL**: `/user/signin`  
- **Description**: Serves the sign-in page for users.  



### Render Sign Up Page
- **Method**: GET  
- **URL**: `/user/signup`  
- **Description**: Serves the sign-up page for new users.  


### Create an Account
- **Method**: POST
- **URL**: `/user/signup`
- **Description**: Creates a new user account. Validates the username and password format, checks if the username already exists, and then writes the new user to the database.

### Log in 
- **Method**: POST
- **URL**: `/user/login`
- **Description**: Logs a user into their account. Validates the username and password format, checks credentials, and creates a session if the login is successful.

### Log out
- **Method**: GET
- **URL**: `/user/logout`
- **Description**: Logs a user out by destroying their session. 
### Check Login (session on server) Status
- Method: GET
- URL: `/user/status`
- Description
This API endpoint is used to check the current login status of a user. It returns the login status and, if the user is logged in, their username.
- Request
No request body is needed for this endpoint.
-  Response
- **Status Code: 200 OK**
- **Response Body:**
    - If the user is logged in:
      ```json
      {
        "isLogin": true,
        "username": "exampleUser"
      }
      ```
    - If the user is not logged in:
      ```json
      {
        "isLogin": false
      }
      ```

### Render Error Page
- **Method**: GET  
- **URL**: `/error`  
- **Description**: Serves the error page when an error occurs.  



# Database Documentation
## User Database Structure

This document explains the structure of the user database and how it is used in the `create account`, `login`, and `logout` functionalities.

### Structure

The user database is a plain text file where each user's data occupies one line. Each line follows the format:
- Each field is separated by colon (:) and each user info is in one line.
For example if I have a file with 3 accounts, the file will look like so:
- user1:pass1 
- user2:pass2 
- user3:pass3

### Functionalities

#### Create Account

When a user creates an account, the following steps are performed:

1. **Parse Request Body**: The `newUsername` and `newPassword` are extracted from the request body.
2. **Validate Format**: The `newUsername` and `newPassword` are validated against predefined regular expressions to ensure they meet the required format.
3. **Check for Existing Username**: The existing usernames are read from the user database file to check if `newUsername` already exists.
4. **Write to Database**: If the `newUsername` is unique and the credentials are valid, the new user information is appended to the user database file.

Example code snippet:

```js
router.post('/user/regUser', (req, res) => {
    const { newUsername, newPassword } = req.body;

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

    if (!usernameRegex.test(newUsername) || !passwordRegex.test(newPassword)) {
        return res.status(400).json({ error: 'Invalid username or password format.' });
    }

    const loginFilePath = path.join(__dirname, '../database', 'user-database.txt')
    const existingUsers = fs.readFileSync(loginFilePath, 'utf8')
                                    .split('\n')
                                    .map(line => line.split(':')[0]);
    if (existingUsers.includes(newUsername)) {
        return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
    }

    fs.appendFileSync(loginFilePath, `${newUsername}:${newPassword}\n`);
    res.status(200).json({ message: 'Account created successfully. You can now log in.' });
});

