const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Inventory = require("../models/inventoryTable");
const Customer = require("../models/customer");

router.get("/orders", async (req, res)=>{
    try{
        const orders = await Order.find();
        return res.status(200).json({
            orders
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
});
router.post("/createOrders", async (req, res)=>{
    console.log(req.body.quantity);
    try{
        const checkQuantity = await Inventory.find({item_name: req.body.item_name});
        console.log(checkQuantity[0].available_quantity);
        let totalQuantity = checkQuantity[0].available_quantity;
        if(checkQuantity[0].available_quantity <= 0 || checkQuantity[0].available_quantity < req.body.quantity){
            return res.json("Out of stock")
        }
        const inventory = await Order.create({
            customer_id: req.body.customer_id,
            inventory_id: req.body.inventory_id,
            item_name: req.body.item_name,
            quantity: req.body.quantity
        });
        const updateInventory = await Inventory.updateOne({
            item_name: req.body.item_name
        },{
            available_quantity: totalQuantity-1
        })
        return res.status(200).json({
            order : inventory,
            updatedQuantity : updateInventory
        })
    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;