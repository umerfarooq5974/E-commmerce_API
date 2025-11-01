import jwt from "jsonwebtoken";
import User from "../models/user.js"

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || "7d"});
export const register = async (req, res) =>{
    try{
        const { name, email, password } = req.body;
        if( !name || !email || !password ) return res.status(400).json({ error: "Missing fields!" });

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ error: "Email already used" });

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });

    }catch(err){
        res.status(400).json({ error: err.message });

    }
}

export const login = async ( req, res ) =>{
    try{
        const { email, password } = req.body;
        if( !email || !password ) return res.status(400).json({ error: " Missing Credentials " });
        
        const user = await User.findOne(email);
        if(!user) return res.status(400).json({ error: "Invalid Credentials" });

        const match = await user.comparePassword(password);
        if(!match) return res.status(400).json({ error: " Invalid Credentials "});

        const token = signToken(user._id);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, password: user.password } })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const profile = async (req, res) =>{
    res.json(req.user);
}