const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/dbModels')
const db = require('./dbController');

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if email exists
    // TODO: check if email exists in db
    const emailExists = true;
    if (!emailExists) {
        res.status(400).send({
            'status' : 400,
            'data' : 'A user with that email cannot be found'
        });
    }

    // check password
    try {
        // TODO: retrieve user details from db (remove password attribute)
        const user = { email: "temp@gmail.com", password: "somehashedpassword"}     // TODO: replace with real db object
        if (await bcrypt.compare(password, user.password)) {

            const accessToken = generateAccessToken(user);

            res.send({
                'user' : user,
                'accessToken': accessToken
            });
        } else {
            res.status(400).send({
                'status' : 400,
                'data' : 'Incorrect email or password'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status" : 500,
            "data" : "Something went wrong"
        });
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

    const token = generateAccessToken({
        email: user.email,
        password: user.hashedPassword
    })

    const {hashedPassword, ...exportUser} = user

    res.status(201).send({
        'status' : 201,
        'user' : exportUser,
        'accessToken' : token
    })
}

// Function to generate access tokens
function generateAccessToken(user) {
    // TODO: just use their email and password
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
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
}