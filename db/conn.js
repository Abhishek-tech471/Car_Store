const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(()=>{
    console.log("Database connected successfully");
}).catch((err) =>{
    console.error("Databses eror found",err);
});
