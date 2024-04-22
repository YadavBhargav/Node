const express = require('express');
const cors = require('cors');
require('./db/config')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const jwt = require('jsonwebtoken');
const jwtkey = "e-comm"

const User = require('./db/users')
const Product = require('./db/product')

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Node JS API project for mongoDB",
        version: "1.0.0",
        description: "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        }
    },
    security: [{
        bearerAuth: []
    }]
}

const options = {
    swaggerDefinition,
    language: "en-US",
    autoHeaders: false,
    autoQuery: false,

    // Paths to files containing OpenAPI definitions
    apis: ["index.js", "./routes/*.js"],
    // servers: [{api:"http://localhost:5000/"}]
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post("/register", verifyToken, async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    // res.send(result);
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "no user found" })
        }
        else {
            res.send({ result, auth: token })
        }
    })
})

app.post("/login", verifyToken, async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "no user found" })
                }
                else {
                    res.send({ user, auth: token })
                }

            })
        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "doesn't match email or password" })
    }

})

app.post("/addProduct", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.post("/updateProduct", verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.body._id }, { $set: req.body })
    res.send(result)
})

app.get("/productsList", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No products found" });
    }
})

app.post("/deleteProduct/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/getProduct/:id", verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "Product not found" })
    }
})

app.get('/serach/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    });

    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1]
        jwt.verify(token, jwtkey, (error, valid) => {
            if (error) {
                res.status(401).send({ result: "Provide Valid token" })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "You are not authorized" })
    }
}


app.listen(5000);