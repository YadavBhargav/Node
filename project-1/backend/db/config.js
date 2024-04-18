const mongoose = require('mongoose');
const url = `mongodb+srv://yadavbhargavyb:<2JlonzzoybQ7QoOy>@bmcluster.urz6qks.mongodb.net/`
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(url, connectionOptions)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    
// mongoose.connect('mongodb://0.0.0.0:27017/e-commerce')