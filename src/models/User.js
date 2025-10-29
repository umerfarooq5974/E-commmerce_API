import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], defualt: "user" },
},{timestamps:true});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = function(candidate){
    return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User",userSchema);
