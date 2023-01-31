const express = require("express");
const app = express();
const mongoose = require("mongoose");
const inventoryRoutes = require("./routes/inventoryRoute");
const customerRoutes = require("./routes/customerRoute");
const orderRoutes = require("./routes/orderRoute");
const Inventory = require("./models/inventoryTable");
const Order = require("./models/order");
const Customer = require("./models/customer");

app.set('view engine', "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/api_web_tech_assignment", ()=>{
    console.log("connected to db");
})
app.get("/", async (req, res)=>{
    const inventory = await Inventory.find();
    const order = await Order.find();
    const customer = await Customer.find();

    res.render("index.ejs",{
        inventory:inventory,
        order:order,
        customer:customer
    });
})
app.use(express.json());
app.use("/", inventoryRoutes);
app.use("/", customerRoutes);
app.use("/", orderRoutes);

app.listen(3005, ()=>{
    console.log("Server Up and Running");
})
