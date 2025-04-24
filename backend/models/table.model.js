import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    quantity: {type: Number, required: true},
    time: {type: String, required: true},
    date: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    occasion: {type: String},
    specialRequest: {type: String},
    tableType: {type: String, required: true},
    paymentStatus: {type: String, required: true},
    tableID:{type: String , required: true},
});

export default mongoose.model('Table', tableSchema);
