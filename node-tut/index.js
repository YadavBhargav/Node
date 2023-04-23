const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
    const ProductSchema = new mongoose.Schema({
        name: String,
        price: Number,
        brand: String,
        category: String,
    });

    const ProductModel = mongoose.model('products', ProductSchema);
    let data = new ProductModel({
        name: "Narzo 55",
        price: 15000,
        brand: "Realme",
        category: "Mobile"
    });
    let result = await data.save()
    console.log(result)
}

main()