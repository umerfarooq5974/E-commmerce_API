import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

export const createOrder = async (req, res) =>{
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if( !cart || cart.items.length  === 0 ) return res.status(400).json({ error: "Cart empty" });

        const orderItems = cart.items.map(i => ({
            product: i.product._id,
            quantity: i.quantity,
            price: i.product.price
        }))

        const totalAmount = orderItems.reduce((s, it) => s + it.price * it.quantity, 0);

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            totalAmount,
            status: "Pending"
        })

        for (const it of cart.items) {
            await Product.findByIdAndUpdate(it.product._id, { $inc: { stock: -it.quantity }  })
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        if(req.user.role === "admin"){
            const orders  = await Order.find().populate("user", "name email");
            return res.json(orders);
        }
        const orders = await Order.find({ user: req.user._id }).populate("orderItem.product");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const {orderId} = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if(!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

