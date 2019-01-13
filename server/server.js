const express = require("express");
// const os = require("os");
const PORT = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;

const app = express();

app.get("/api/getSong", (req, res) => {
    res.send({title: "Skye Boat Song"});
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));