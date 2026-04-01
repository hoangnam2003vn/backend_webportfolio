const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    notes: { type: String }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Order', orderSchema);