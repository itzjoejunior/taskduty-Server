require("dotenv/config")
const express = require('express')
const app = express()
const port = 3000
const mongoose = require ("mongoose")
const connect = require('./config/db')



//server connection and DB
connect()
.then(()=>{
try {
    app.listen(port,()=>{
        console.log(`server is running on http://localhost:${port}`);
    }) 
} catch (error) {
    console.log("cannot connect to the server");
}
})
.catch((error)=>{
    console.log("invalid database connection...!", error);
})




// app.get("/about", (req,res)=>{
//     res.send('Welcome to my about page')
// })

// app.get("/product",(req,res)=>{
//     res.send('Welocome to my product page')
// })

// app.get("/contact", (req,res)=>{
//     res.send('Welcome to my contact page')
// })


// const people = ["Eggys", "Musa", "David", "Joseph"];
// console.log(people);

// const age = [20,40,60,80];

// console.log(age);

// module.exports = {
//     people,
//     age
// }

