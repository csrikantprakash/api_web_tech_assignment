const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventoryTable");
let inventoryIDcount = 1;
router.get("/inventory", async (req, res)=>{
    try{
        const inventory = await Inventory.find();
        return res.status(200).json({
            inventory
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})
router.get("/inventory/:inventory_type", async (req, res)=>{
    try{
        const inventory = await Inventory.find({inventory_type: req.params.inventory_type});
        return res.status(200).json({
            inventory
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})
router.post("/createInventory", async (req, res)=>{
    console.log(req.body);
    try{
        const inventory = await Inventory.create({
            inventory_id: "INTD" + inventoryIDcount,
            inventory_type: req.body.inventory_type,
            item_name: req.body.item_name,
            available_quantity: req.body.available_quantity
        });
        return res.status(200).json({
            inventory
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})
router.put("/:itemName/:availableQuantity", async (req, res)=>{
    console.log(req.body);
    try{
        const updateInventory = await Inventory.updateOne({
            item_name: req.params.itemName
        },{
            available_quantity: req.params.availableQuantity
        });
        return res.status(200).json({
            updateInventory
        })
    }catch(e){
        res.status(500).json({
            message: e
        })
    }
})

module.exports = router;