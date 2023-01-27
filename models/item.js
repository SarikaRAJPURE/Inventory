const mongoose = require('mongoose');
const { createSemanticDiagnosticsBuilderProgram } = require('typescript');

//schemas are kind of like the structure of our data and the data types.

const itemsSchema = new mongoose.Schema({
    price:Number ,
    inventory: Number,
    nextDelivery: Date,
    deliveryAmt: Number,
    name: { type: String, required: true, unique: true }
});

// indide model define which collection,and schema
const myItem = mongoose.model('items',itemsSchema);

module.exports = myItem;