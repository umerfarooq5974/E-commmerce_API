import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true },
    quantity: { type: Number, default: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending","Shipped","Delivered"], default: "Pending" }
},{ timestamps: true });

export default mongoose.model("Order", orderSchema);