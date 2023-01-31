const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    inventory_id:{type:String, required:true},
    customer_id:{type:String, required:true},
    item_name:{type:String, required:true},
    quantity:{type:Number, required:true}
});
module.exports = mongoose.model("Order", orderSchema);