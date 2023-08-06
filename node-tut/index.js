const express = require("express");
require("./config");

const Product = require("./product");

const app = express();
app.use(express.json());
app.post("/create", async (req, res) => {
    let data = new Product(req.body)
    let result = await data.save();
    res.send(result)
})

app.get("/list", async (req, res) => {
    let data = await Product.find();  
    res.send(data)
})

app.delete("/delete/:id", async (req,res)=>{
    console.log(req.params)
    res.send("done")
})

app.listen(5000)
