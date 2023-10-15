const express = require('express');
const cors = require('cors');
require('./db/config')
const User = require('./db/users')
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
})

app.listen(5000);