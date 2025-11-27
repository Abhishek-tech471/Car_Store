require('dotenv').config();
const express = require('express');
const app = express();

require('./db/conn');

app.use("/", require('./Routes/route'));

app.listen(3000, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log("Server is running on port 3000");
    }
});