// Local Database
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce").then(() => {
  console.log("Connected!");
});
 
// Deployment DB
 
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://yadavbhargavyb:2JlonzzoybQ7QoOy@bmcluster.urz6qks.mongodb.net/`
 
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//         useNewUrlParser: true
//     }
// });
 
// async function run() {
//     try {
//         // Connect the client to the server  (optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("e-commerce").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
 
// const mongoose = require("mongoose");
 
// mongoose
//   .connect(
//     "mongodb+srv://yadavbhargavyb:2JlonzzoybQ7QoOy@bmcluster.urz6qks.mongodb.net/e-commerce"
//   )
//   .then(() => console.log("Connected!"));