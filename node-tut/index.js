const express = require('express');
const EventEmitter = require("events");
const app = express();
const event = new EventEmitter();

/* 
    EventEmitter returns How many api call at a time
*/

let count = 0;

event.on("CountAPI", () => {
    count++;
    console.log("object", count);
})

app.get("/", (req, res) => {
    res.send("api called")
    event.emit("CountAPI")
})

app.get("/search", (req, res) => {
    res.send("Search api called")
})
app.get("/update", (req, res) => {
    res.send("update api called")
})

app.listen(5000);