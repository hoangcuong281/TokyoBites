import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    highlight: {type: Boolean, default: false},
});

export default mongoose.model('Meal', mealSchema);
