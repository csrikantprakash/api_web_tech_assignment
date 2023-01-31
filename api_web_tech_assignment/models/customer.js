const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    customer_id:{type:String, required:true},
    customer_name:{type:String, required:true},
    email:{type:String, required:true},
});
module.exports = mongoose.model("Customer", customerSchema);