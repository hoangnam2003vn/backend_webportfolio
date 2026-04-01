const User = require('../schemas/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    // 1. API Đăng ký tài khoản mới
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Kiểm tra xem email đã tồn tại chưa
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Email này đã được sử dụng!' });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo user mới lưu vào DB
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                message: 'Đăng ký thành công!',
                user: { id: newUser._id, name: newUser.name, email: newUser.email }
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    },

    // 2. API Đăng nhập
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng!' });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.status(200).json({
                message: 'Đăng nhập thành công!',
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }
};