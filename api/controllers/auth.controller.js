import User from '../models/user.model.js';
import bcrypyjs from 'bcryptjs';

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