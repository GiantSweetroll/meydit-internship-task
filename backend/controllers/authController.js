const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/dbModels')
const db = require('./dbController');

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if email exists
    const dbUser = await db.getUser(email)
    const emailExists = dbUser !== undefined;
    if (!emailExists) {
        return res.status(400).send({
            'status' : 400,
            'data' : 'A user with that email cannot be found'
        });
    }

    // check password
    try {
        if (await bcrypt.compare(password, dbUser.hashedPassword)) {

            const accessToken = generateAccessToken(dbUser);
            const {hashedPassword, ...user} = dbUser 

            return res.send({
                'user' : user,
                'accessToken': accessToken
            });
        } else {
            return res.status(400).send({
                'status' : 400,
                'data' : 'Incorrect email or password'
            });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

const register = async (req, res) => {
    const body = req.body

    // check email does not exist in the db
    const dbUser = await db.getUser(body.email)
    const emailExists = dbUser !== undefined
    if (emailExists) {
        return res.status(400).send({
            'status' : 400,
            'data' : 'Email already exists'
        })
    }

    // create hashed password
    const hPass = await bcrypt.hash(req.body.password, 10)

    var user = {
        ...body,
        hashedPassword: hPass
    }

    // insert user details into the db
    await db.registerUser(user)

    user = await db.getUser(user.email)

    const token = generateAccessToken(user)

    const {hashedPassword, ...exportUser} = user

    res.status(201).send({
        'status' : 201,
        'user' : exportUser,
        'accessToken' : token
    })
}

// Function to generate access tokens
function generateAccessToken(user) {
    return jwt.sign({
        email: user.email,
        password: user.hashedPassword
    }, process.env.ACCESS_TOKEN_SECRET);
}

// function to authenticate the access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    login,
    register,
    authenticateToken
}