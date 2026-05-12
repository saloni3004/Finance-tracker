require("dotenv").config();
console.log("JWT:",
    process.env.JWT_SECRET);
console.log("DB:",process.env.MONGO_URI);
    
//IMPORTING
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//son web token secret key
const JWT_SECRET = process.env.JWT_SECRET;
//app creation
const app = express();

//MIDDLEWARE
app.use(express.json());      //data format

//database connection
mongoose.connect(process.env.MONGO_URI,
    {
        tls:true
    })
.then(() => {
    console.log("MOngoDB connected")
});

//ROUTES(GET,POST,DELETE,PUT)
app.get("/",(req,res) =>{
    res.send("my server is running");
});

//SIGNUP API
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
       });

        await newUser.save();
        res.send("User registered successfully");
    } catch (err) {
        console.log(err);
      this
        res.status(500).send("Error occurred");
    }
});
//Login route
app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        //find user
        const existingUser = await User.findOne({email});
        //USER NOT FOUND
        if(!existingUser) {
            return res.status(404).send("User not found");
        }
        //Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        //wrong password
        if(!isMatch) {
            return res.status(404).send("invalid password");
        }
        //success
        const token = jwt.sign(
            {userId: existingUser._id },
            JWT_SECRET
        );
        res.send({
            message: "Login successful",
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    } 
});
app.listen(5000, () => {
    console.log("server running on port 5000");
});