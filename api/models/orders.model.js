const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    sub_total: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = {
    OrderModel
}