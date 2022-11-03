import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user.js";

export const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: 'User not found' })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Users password incorrect' })
        const token = jwt.sign({ email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, result: existingUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const userSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'User with that email already exists!' })
        if (password !== confirmPassword) return res.status(400).json({ message: 'User passwords do not match' })

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))

        const result = await User.create({ email, firstName, lastName, password: hashedPassword })

        const token = jwt.sign({ email, id: result._id }, process.env.SECRET, { expiresIn: '1h' })

        res.status(200).json({ token, result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};