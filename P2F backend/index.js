const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const userModel = require('./model/user');
const orderModel = require('./model/order');

app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/login' , async (req, res) => {
    mongoose.connect(process.env.MONGO_CONNECT)
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        res.send(user);
    } else {
        res.status(401).send("Unauthorized");
    }
})

app.post("/signup", async (req, res) => {
    const { email , password } = req.body;
    mongoose.connect(process.env.MONGO_CONNECT)

    // make a crypto wallet
    const crossmint_api_key = process.env.CROSSMINT_API_KEY;
    const options = {
        method: 'POST',
        headers: {'X-API-KEY': crossmint_api_key, 'Content-Type': 'application/json'},
        body: JSON.stringify({
            chain: "polygon",
            email: email
        })
    };
        
    const response = await fetch('https://staging.crossmint.com/api/v1-alpha1/wallets', options)
    const wallet = await response.json();
    const walletid = wallet.publicKey

    const user = await userModel.create({
        email: email,
        password: password,
        wallet: walletid,
        collectionID: "997be271-c6de-4716-a0d2-11c976c889f8",
        credentialList: []
    })

    res.send(user);
})

app.post('/issuecredential', async (req, res) => {
    const { email, orderID } = req.body;
    mongoose.connect(process.env.MONGO_CONNECT)
    const user = await userModel.findOne({
        email: email
    })
    const walletid = user.wallet;

    const order = await orderModel.findOne({
        _id: orderID
    })
    order.chef = user._id;
    order.save();

    const crossmint_api_key = process.env.CROSSMINT_API_KEY;

    const options = {
        method: "POST",
        headers: {
          "X-API-KEY": crossmint_api_key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "metadata": {
                "name": "Chef certificate credential",
                "image": "https://www.crossmint.com/assets/crossmint/logo.png",
                "description": `Proof of taking the order ${orderID}`
            },
            "recipient": "polygon:"+walletid,
            "credential": {
                "subject": {
                "chef": email
                },
                "expiresAt": "2025-02-18"
            }
        }),
    };

    const response = await fetch("https://staging.crossmint.com/api/unstable/collections/997be271-c6de-4716-a0d2-11c976c889f8/credentials", options)
    const data = await response.json();

    user.credentialList.push(data.credentialId);
    await user.save();

    res.send(user);
})

app.post('/verifycredential', async (req, res) => {
    const { credentialID } = req.body;
    mongoose.connect(process.env.MONGO_CONNECT)
    const crossmint_api_key = process.env.CROSSMINT_API_KEY;

    const options = {method: 'GET', headers: {'X-API-KEY': crossmint_api_key}};

    const response = await fetch("https://staging.crossmint.com/api/unstable/credentials/"+credentialID, options)
    const data = await response.json();

    const options2 = {
        method: 'POST',
        headers: {'X-API-KEY': crossmint_api_key, 'Content-Type': 'application/json'},
        body: JSON.stringify(
            {"credential":data}
        ) 
      };
      
    const verifyresponse = await fetch('https://staging.crossmint.com/api/unstable/credentials/verify', options2)

    const finaldata = await verifyresponse.json();
    res.send(finaldata);
})

app.get('/getuser', async (req, res) => {
    mongoose.connect(process.env.MONGO_CONNECT)
    const user = await userModel.findOne({
        _id: req.query.request_user
    })
    res.send(user);
})

app.post('/createorder', async (req, res) => {
    // recipe meta infos, email->request_user, compensation
    const { title, description, ingredients, instructions, email } = req.body;
    mongoose.connect(process.env.MONGO_CONNECT)

    const user = await userModel.findOne({
        email: email
    })
    if (!user) {
        res.status(401).send("Unauthorized");
    }

    const newOrder = await orderModel.create({
        recipe: {
            title: title,
            description: description,
            imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
            ingredients: ingredients,
            instructions: instructions,
        },
        request_user: user._id,
        chef: null,
        compensation: Math.floor(Math.random() * 20) + 5,
        isDelivered: false
    })

    res.send(newOrder);
})

app.get('/orders', async (req, res) => {
    mongoose.connect(process.env.MONGO_CONNECT)
    // find orders that are not delivered and chef is null
    const orders = await orderModel.find({
        isDelivered: false,
        chef: null
    })
    res.send(orders);
})

app.listen(4000, () => {});