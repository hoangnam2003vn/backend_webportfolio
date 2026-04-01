const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author_name: { type: String, required: true },
    author_email: { type: String, required: true },
    content: { type: String, required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // FK -> Post
    status: { type: String, enum: ['pending', 'approved', 'spam', 'trash'], default: 'pending' }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

module.exports = mongoose.model('Comment', commentSchema);