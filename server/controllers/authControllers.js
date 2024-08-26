const User = require("../models/user")
const errorResponse = require("../utils/errorResponse")
const sendEmail = require("../utils/sendEmail")
const jwt = require('jsonwebtoken')


// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };


// @desc    Signup user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async(req,res,next)=>{
    const {name, email, password} = req.body

    if(!validateEmail(email)){
        return next(new errorResponse('Invalid email address', 400))
    }

    try {
        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(user._id);

        
        // Send welcome email
        const message = `Welcome to our platform, ${name}!`;
        await sendEmail({
        to: user.email,
        subject: 'Welcome to Our Platform',
        text: message,
        });

        res.status(201).json({success:true, token})
        
    } catch (error) {
        return next(new errorResponse('Error creating user', 500))
    }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

exports.login = async(req,res,next)=>{
    const {email, password} = req.body

    if(!validateEmail(email)){
        return next(new errorResponse('Invalid email address', 400))
    }

    if(!email && !password){
        return next(new errorResponse('Please provide email and password', 400))   
    }

    try {
        const user = await User.findone({email}).select('+password')

        if(!user){
            return next(new errorResponse('User not found', 404))
        }
        
        const isMatched = await user.matchPassword(password)
        if(!isMatched){
            return next(new errorResponse('Invalid credentials', 401))
        }
    
        const token = user.getSignedJwtToken()
    
        res.status(200).json({success:true, token})
    } catch (error) {
        return next(new errorResponse('Error logging in', 500))
    }
}

