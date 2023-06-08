const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
require('dotenv').config();


const { connection } = require('./configs/mongoDB.config');
const { userRouter } = require("./routes/user.routes");
const { orderRouter } = require("./routes/orders.routes");


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json("test OK");
})

app.use('/user', userRouter);
app.use('/orders', orderRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    try {
        await connection
            .then(() => {
                console.log("Connected to MongoDB");
            });
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at PORT ${PORT}`);
})