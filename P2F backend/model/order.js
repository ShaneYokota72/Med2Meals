const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = new Schema({
    // recipe: an object that contains 3 string
    recipe: {
        title: String,
        description: String,
        imageLink: String,
        // userId: {type:Schema.Types.ObjectId, ref:'user'},
        // isDelivered: {type: Boolean, default: false},
        // compensation: Number,
        // ingredients -> a list of string
        ingredients: Array,
        instructions: Array,
        // user: {
        //     name: string
        // }
    },
    request_user: {type:Schema.Types.ObjectId, ref:'user'},
    chef: {type:Schema.Types.ObjectId, default:null, ref:'user'},
    compensation: Number,
    isDelivered: {type: Boolean, default: false},
})

const orderModel = model('order', orderSchema);
module.exports = orderModel;