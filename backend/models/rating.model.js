import mongoose, { startSession } from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    email: {type: String, required: true},
    star: {type: Number, required: true},
    feedback: {type: String, required: false},
});

export default mongoose.model('Rating', ratingSchema);
