import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    email: {type: String, required: true},
});

export default mongoose.model('Email', emailSchema);
