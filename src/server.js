require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.json({ 
        status: 'success',
        message: '🚀 Backend Portfolio đang chạy cực mượt!' 
    });
});

app.use('/api/auth', require('./routes/auth'));

// ---------------- KHỞI ĐỘNG SERVER ----------------
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});