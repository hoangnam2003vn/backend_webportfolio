const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Lấy token từ Header của request (Frontend sẽ gửi kèm chữ Bearer)
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Từ chối truy cập! Yêu cầu phải có Token.' });
    }

    try {
        // 2. Tách chữ "Bearer " ra để lấy đúng cái chuỗi token thôi
        const token = authHeader.split(' ')[1];
        
        // 3. Dùng chìa khóa bí mật để giải mã token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Lưu thông tin user (như id) vào request để xài cho các bước sau
        req.user = verified; 
        
        // 5. Cho phép đi qua cửa!
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};

module.exports = { verifyToken };