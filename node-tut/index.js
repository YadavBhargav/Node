const express = require("express");
const multer = require("multer");
require("./config");

const Product = require("./product");

const app = express();
app.use(express.json());

/* Create api */
app.post("/create", async (req, res) => {
    let data = new Product(req.body)
    let result = await data.save();
    res.send(result)
})
/* End */

/* List api */
app.get("/list", async (req, res) => {
    let data = await Product.find();
    res.send(data)
})
/* End */

/* Delete by id api */
app.delete("/delete/:_id", async (req, res) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params)
    res.send(data)
})
/* End */

/* Update by id api */
app.put("/update/:_id", async (req, res) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        { $set: req.body }
    );
    res.send(data)
})
/* End */

/* Search api */
app.get("/search/:key", async (req, res) => {
    console.log(req.params.key)
    let data = await Product.find(
        {
            "$or": [
                { "name": { $regex: req.params.key } },
                { "brand": { $regex: req.params.key } },
                { "category": { $regex: req.params.key } }
            ]
        }
    )
    res.send(data)
})
/* End */

/* File upload api */
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file");

app.post("/upload", upload, (req, res) => {
    res.send("updaloded")
})
/* End */

app.listen(5000);
