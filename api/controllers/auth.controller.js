import User from '../models/user.model.js';
import bcrypyjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

//signup
export const signup =async (req, res, next) => {
    const { username, email, password} = req.body;
    const hashPassword = bcrypyjs.hashSync(password, 10)
    const newUser = new User ({ username, email, password : hashPassword});

    try {   
        await newUser.save()
        res.status(201).json({ message: "user created successfully"});
    } catch (error) {
        next(error);
    }
};

//signin
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(401, 'user not found'));
        const validPassword = bcrypyjs.compareSync(password, validUser.password);
        if(!validPassword)  return next (errorHandler(401, 'wrong credentials'));
        //create token
        const token = jwt.sign({ id:validUser._id}, process.env.JWT_SECRET);
        //password hide
        const {password: hashPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);// 1 hour
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {
        next(error);
    }
}