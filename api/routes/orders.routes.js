const express = require('express');
require('dotenv').config();
const { OrderModel } = require('../models/orders.model');
const { jwtAuth } = require('../middlewares/jwtAuth.middleware');

const orderRouter = express.Router();


orderRouter.use(jwtAuth)


orderRouter.post('/add-order', async (req, res) => {

    const { sub_total, phone_number } = req.body;
    const { userId: user_id } = req.userData;
    if (sub_total, phone_number) {
        try {
            const newOrder = new OrderModel({ user_id, sub_total, phone_number });
            newOrder.save()
            res.status(200).json("Order Created Successfully")
        } catch (error) {
            console.log(error)
            return res.status(500).json("Something went wrong")
        }
    }else{
        res.status(401).json("Invalid Credentials")
    }
})

orderRouter.get('/get-order', async (req, res) => {
    const { userId: user_id } = req.userData;
    try {
        const orders = await OrderModel.find({ user_id });
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Something went wrong")
    }
})

module.exports = {
    orderRouter
}