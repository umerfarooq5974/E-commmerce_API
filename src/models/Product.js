import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default:"" },
    price: { type: Number, required: true },
    category: { type: String, default: "general" },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" },
},{ timestamps: true });

export default mongoose.model("Product", productSchema);