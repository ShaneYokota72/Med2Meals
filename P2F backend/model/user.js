const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: String,
    password: Number,
    wallet: {type:String, required: false},
    collectionID : {type: String, required: false},
    credentialList : {type: Array, default: []}
})

const userModel = model('user', userSchema);
module.exports = userModel;