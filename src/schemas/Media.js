const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    file: { type: String, required: true }, 
    url: { type: String, required: true },  
    mime_type: { type: String },            
    size: { type: Number },                 
    alt_text: { type: String },
    folder: { type: String, default: 'uploads' }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Media', mediaSchema);