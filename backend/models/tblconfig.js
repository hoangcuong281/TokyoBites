import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tblconfigSchema = new Schema({
    tableID: {type: String, required: true},
    tableName: {type: String, required: true},
    tablePrice: {type: Number, required: true},
    tableImage: {type: String, required: true},
    tableQty: {type: Number, required: true},
});

export default mongoose.model('Tblconfig', tblconfigSchema);

