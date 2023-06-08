const express = require('express');
require('dotenv').config();
const { UserModel } = require('../models/user.model')
const { jwtAuth } = require('../middlewares/jwtAuth.middleware');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = express.Router();


userRouter.post('/add-user', async (req, res) => {
    try {
        const { name, phone_number, password } = req.body

        const userExists = await UserModel.findOne({ phone_number });
        if (userExists) {
            return res.status(202).json("User already exists, Please Login")
        }
        if (name && phone_number && password) {
            const hashedPass = bcrypt.hashSync(password, +process.env.SaltRounds);
            const user = new UserModel({ name, phone_number, password: hashedPass })
            user.save();
            jwt.sign({ userId: user._id, name, phone_number }, process.env.JWT_secret, (err, token) => {
                if (err) {
                    throw err
                } else {
                    res.cookie("token", token, { sameSite: 'none', secure: true }).status(201).json({
                        msg: 'User created successfully, Logging In...',
                        _id: user._id,
                        name: user.name
                    })
                }
            })
        } else {
            res.status(401).json("Invalid Credentials")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong")
    }
})

userRouter.post('/login-user', async (req, res) => {
    try {
        const { phone_number, password } = req.body

        const user = await UserModel.findOne({ phone_number });
        if (!user) {
            return res.status(401).json("User not found")
        }
        if (phone_number && password) {
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                return res.status(401).json("Wrong Password")
            }

            jwt.sign({ userId: user._id, name: user.name , phone_number}, process.env.JWT_secret, (err, token) => {
                if (err) {
                    throw err
                } else {
                    res.cookie("token", token, { sameSite: 'none', secure: true }).status(200).json({
                        msg: 'Login Success',
                        _id: user._id,
                        name: user.name
                    })
                }
            })
        }else{
            res.status(401).json("Invalid Credentials")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("Something went wrong")
    }
})

userRouter.get('/profile', jwtAuth,async (req,res)=>{
    if(req.userData){
        res.status(200).json(req.userData)
    }else{
        res.status(401).json('no token')
    }
})
userRouter.post('/logout-user', async (req, res) => {
    res.cookie("token", '', { sameSite: 'none', secure: true }).status(200).json('logged out')
})


module.exports = {
    userRouter
}