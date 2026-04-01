const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true }, 
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    image: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'out_of_stock'], default: 'active' }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Product', productSchema);