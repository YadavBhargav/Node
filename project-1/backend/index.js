const express = require('express');
const cors = require('cors');
require('./db/config')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
}

const options = {
    swaggerDefinition,
    language: "en-US",
    autoHeaders: false,
    autoQuery: false,

    // Paths to files containing OpenAPI definitions
    apis: ["./routes/*.js"],
    // servers: [{api:"http://localhost:5000/"}]
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "doesn't match email or password" })
    }

})

app.post("/addProduct", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})


app.listen(5000);