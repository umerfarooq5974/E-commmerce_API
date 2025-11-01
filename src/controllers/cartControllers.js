import Cart from "../models/Cart";
import Product from "../models/Product";

const calculateTotal = (items) => items.reduce((s,it) => s + it.product.price * it.quantity, 0);

export const getCart = async (req, res) =>{
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
        if(!cart) {
            cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 })
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const addToCart = async (req, res) =>{
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await Product.findById(productId);
        if(!product) return req.status(404).json({error: "Product not found"});

        let cart = await Cart.findOne({user: req.user._id});
        if(!cart) cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });

        const existing = cart.items.find(i => i.product.toString() === productId);
        if(existing) existing.quantity += quantity;
        else cart.items.push({product: productId, quantity});

        await cart.populate("items.product");
        Cart.totalPrice = calculateTotal(cart.items);
        await cart.save();
        res.json(cart);

    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export const UpdateCartItem = async (req, res) => {
    try{
        const { itemId, quantity} = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart) return res.status(404).json({ error: "Cart not found" });

        const item = cart.items.id(itemId);
        if(item) return res.status(404).json({ error: "Item not found" });

        item.quantity = quantity;
        await cart.populate("items.product");
        cart.totalPrice = calculateTotal(cart.items);
        await cart.save();
        res.json(cart);
    }catch(err){
        res.status(400).json({ error: err.message })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart) return res.status(404).json({ error: "Cart not found" });

        cart.items.id(itemId).remove();
        await cart.populate("items.product");
        cart.totalPrice = calculateTotal(cart.items);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(404).json({ error: err.message})
    }
}