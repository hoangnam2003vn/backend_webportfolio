const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    cover_image: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },       
    published_at: { type: Date }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Post', postSchema);