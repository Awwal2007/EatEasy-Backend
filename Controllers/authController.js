const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../Models/user")
const sendVerificationEmail = require("../Services/Nodemailer/sendVerificationEmail")
const generateRandomString = require("../Utils/generateRandomStrings")
const { MongooseError } = require("mongoose")

//Signup
const signup = async (req, res, next)=>{
    const {password, email, name} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const token = generateRandomString(8)
        const verificationExp = Date.now() + 300000

        const user = userModel.create({...req.body, password: hashedPassword, verificationToken: token, verificationExp})

        if(!user){
           return res.status(404).json({
                status: "error",
                message: "could not sign up"
            })
        }
        
        const userFirstName = name.split(" ")[0]
        sendVerificationEmail(email, userFirstName, token)

        res.status(202).json({
            status: "success",
            message: "Sign up successful. Check your email to verify your account"
        })

    } catch (error) {
        console.log(error)
        const err = new MongooseError(message)
        {err && res.status(401).json({
            status: "error",
            message: err.message})}
        next(error)      
    }
}

//Verify
const verifyEmail = async (req, res, next)=>{
    const {token} = req.params
    try {
        // find the user with the verification token
        const user = await userModel.findOne({verificationToken: token})
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "This token is invalid or has been verified"
            })
        }

        // compare the current time with the expiration time
        if(user.verificationExp < Date.now()){
            return res.status(403).json({
                status: "error",
                message: "Verification time has expired"
            }),
            await userModel.findOneAndDelete({verificationToken: token})
        }
        await userModel.findByIdAndUpdate(user._id, {verificationExp: null, verificationToken: null, isVerified: true})
        res.status(200).json({
            status: "success",
            message: "Your email has been verified"
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

//Login
const login = async (req, res, next)=>{

    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "password or email is incorrect"
            })
        }
        
        // if (!password || !user?.password) {
        //     return res.status(400).json({ error: "Missing credentials." });
        // }
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if(!passwordCorrect){
            return res.status(404).json({
                status: "error",
                message: "password or email is incorrect"
            })
        }

        const accessToken = jwt.sign({id: user._id, email: user.email}, process.env.jwt_secret, {
            expiresIn: process.env.jwt_exp
        })        

        res.status(200).json({
            status: "success",
            message: "Login successfully. Welcome back",
            accessToken
        })
    } catch (error) {
        console.log(error);  
        next(error) 
    }
}

module.exports = {
    signup,
    verifyEmail,
    login
}