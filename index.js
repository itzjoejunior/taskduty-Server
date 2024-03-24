require("dotenv/config")
const express = require('express')
const app = express();
const port = 3000;
const mongoose = require ("mongoose");
const connect = require('./config/db');

const userRouter = require('./routes/userRoute');

// middleware
app.use(express.json());

// API 
app.use('/api/v1', userRouter);



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

//

app.get("/", function (req, res){
    res.send("Hello World");
});

app.use((req,res)=>{
    res.status(404).send("route not found")
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

