const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, 
    is_active: { type: Boolean, default: true }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Category', categorySchema);