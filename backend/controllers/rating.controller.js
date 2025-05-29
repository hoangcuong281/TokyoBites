import Rating from '../models/rating.model.js';

export const createRating = async (req, res) => {
    const { email, star, feedback ='' } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !star) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    try {
        const newRating = new Rating({ email, star, feedback });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error creating rating:', error);
        res.status(500).json({ message: 'Lỗi khi tạo đánh giá.' });
    }
}