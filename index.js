const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors")
const Product = require('./productmodel')
const app =express()
app.use(cors())
app.use(express.json())



mongoose.connect("mongodb://localhost:27017/")
.then(()=>{
    console.log("Connected to the DB !");

    app.listen(4000,()=>{
        console.log("HELLO");
    })
    
})
.catch(()=>{
    console.log("ERROR!!");
})
 

app.get("/Product" , async(req,res) =>{
    try{
        const pro = await Product.find();
        res.json(pro);
    }
    catch(err){
        res.json(err)
    }
})

//app.listen(4000 ,()=>console.log('server running at 4000'))
app.post("/getProduct" , async(req,res) =>{
    try{
        const temp = req.body;
        const newdata = new Product(temp)
        await newdata.save();
        res.json(temp)
    }

    catch(err){
        res.json(err)
    }
})