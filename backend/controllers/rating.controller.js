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

export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá.' });
    }
}

export const deleteRating = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRating = await Rating.findByIdAndDelete(id);
        if (!deletedRating) {
            return res.status(404).json({ message: 'Đánh giá không tồn tại.' });
        }
        res.status(200).json({ message: 'Đánh giá đã được xóa thành công.' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ message: 'Lỗi khi xóa đánh giá.' });
    }
}