const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    consolse.log(`User ${user} registered successfully!`);
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
    else {
      res.status(400);
      throw new Error("Invalid user data");
    }

    res.json({ username, email, password });
    });

    

//@desc Get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    res.json({ message: "Get all users" });
    });

//@desc get current user info 
//@route GET /api/users/current
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: "User Profile info" });
    });



module.exports = {registerUser,getUsers,getCurrentUser};