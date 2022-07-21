const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

// @desc       registrasi User
// @route       POST /api/users
// @acess       Public
const registrasiUser = asyncHandler(async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Please Fill all fields")
    }

    if(req.body.password.length < 5){
        res.status(400)
        throw new Error("Password too short")
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            name: user.name,
            email: user.email,
            _id: user._id
        });
    } catch (error) {
        res.status(400)
        if(error.code === 11000){
            throw new Error("User already exists");
        }
        throw new Error(error);
    }
})

// @desc       Login User
// @route       POST /api/users/login
// @acess       Public
const loginUser = asyncHandler(async(req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Please Fill all Fields")
    }

    const found = await User.findOne({email: req.body.email});
    if(found && await bcrypt.compare(req.body.password, found.password)){
        res.status(200).json({
            _id: found._id,
            name: found.name,
            email: found.email,
            token: generateToken(found._id)
        });
    }else{
        res.status(400)
        throw new Error("User or password wrong")
    }
})

// @desc       Get User
// @route       GET /api/users
// @acess       Private
const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

// generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
}

module.exports = {
    registrasiUser,
    loginUser,
    getUser
}