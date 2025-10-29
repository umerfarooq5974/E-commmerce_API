import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], defualt: "user" },
},{timestamps:true});
