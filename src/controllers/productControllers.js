import Product from "../models/Product.js"

export const createProduct = async( req, res ) =>{
    try {
        const p = await Product.create(req.body);
        res.status(201).json(p);
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

export const getProducts = async(req, res) => {
    try {
        const { page = 1, limit = 10, sort, category, q } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (q) filter.name = { $regex: q, $options: "1" };

        const products = (await Product.find(filter).skip((page - 1) * limit).limit(Number(limit))).sort(sort ? { [sort]: -1 }: {});
        res.json(products);

    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

export const getProduct = async (req, res) => {
    try {
        const p = await Product.findById(req.param.id);
        if(!p) return res.status(404).json({ error: "Product not found" });
        res.json(p);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
}

export const updateProduct = async(req,res) => {
    try {
        const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!p) return res.status(404).json({ error: "Product not found" });
        res.json(p);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const p = await Product.findByIdAndDelete(req.params.id);
        if(!p) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
}
