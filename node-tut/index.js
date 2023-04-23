const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String,
});

const saveInDB = async () => {
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

const updateInDB = async () => {
    const ProductModel = mongoose.model('products', ProductSchema);
    let data = await ProductModel.updateOne(
        { name: "Narzo 55" },
        {
            $set: { price: "15000", name: "Narzo 10" }
        }
    )
    console.log(data);
}

const deleteInDB = async () => {
    const ProductModel = mongoose.model('products', ProductSchema);
    let data = await ProductModel.deleteOne({ name: "Narzo 10" });
    console.log(data);
}


const findInDB = async () => {
    const ProductModel = mongoose.model('products', ProductSchema);
    let data = await ProductModel.find();
    console.log(data);
}

findInDB()


