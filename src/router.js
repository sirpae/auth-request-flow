const jwtSecret = "secretPassword"

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

// If user types the correct credentials shown above this text, in Insomnia, it will show a '200 OK' status with a given token. 
// If the user types an invalid credential, in insomnia it will show '404 Not Found' status with a error message displaying 'Invalid credentials'. 
router.post('/login', (req, res) => {
    const { 
        username, password 
    } = mockUser; 

    const {
        username: reqUsername, 
        password: reqPassword 
    } = req.body; 

    if (reqUsername !== username || reqPassword !== password) 
    { res.status(404).json({ error: "Invalid Credentials." }); }

    const token = jwt.sign(mockUser, jwtSecret) 
    res.json({ token });
  });  

router.get('/profile', (req, res) => {

    try {
        const token = req.headers.authorization;
        jwt.verify(token, jwtSecret);
        res.status(200).json({ profile: mockUser.profile });
      } catch (err) {
        res.status(404).json({ error: "Unable to retrieve profile." });
      }
    });

module.exports = router;
