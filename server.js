const express = require("express");
const path = require('path');
// const os = require("os");
const PORT = process.env.PORT || 8080;

const app = express();

app.get("/api/getSong", (req, res) => {
    res.send({title: "Skye Boat Song"});
});


app.use("/", express.static(path.join(__dirname, '/dist')));

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));