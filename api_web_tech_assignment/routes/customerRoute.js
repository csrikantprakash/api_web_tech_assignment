const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
let customerIDcount = 1;
router.get("/customerDetails", async (req, res)=>{
    try{
        const customer = await Customer.find();
        return res.status(200).json({
            customer
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})
router.post("/createCustomer", async (req, res)=> {
    console.log(req.body);
    try{
        const notUnique = await Customer.find({email: req.body.email});
        console.log(notUnique);
        if(notUnique.length != 0){
            return res.json({
                message: "Email already exists"
            })
        } 
        const customer = await Customer.create({
            customer_id: "OD" + customerIDcount,
            customer_name: req.body.customer_name,
            email: req.body.email
        });
        customerIDcount++;
        return res.status(200).json({
            customer
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})

module.exports = router;