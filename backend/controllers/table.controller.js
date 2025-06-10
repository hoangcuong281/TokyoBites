import Table from '../models/table.model.js';
import Tblconfig from '../models/tblconfig.js';

export const createTable = async (req, res) => {
    const {quantity, time, date, name, phone, email, occasion, specialRequest, tableType, depositStatus, bill, tableID} = req.body;
    const table = new Table({quantity, time, date, name, phone, email, occasion, specialRequest, tableType, depositStatus, bill, tableID});
    await table.save();
    res.status(201).json(table);
}

export const getTables = async (req, res) => {
    const tables = await Table.find();
    res.status(200).json(tables);
}

export const getTableById = async (req, res) => {
    const {id} = req.params;
    const table = await Table.findById(id);
    res.status(200).json(table);
}

export const updateTableDepositStatus = async (req, res) => {
    const {id} = req.params;
    const {depositStatus} = req.body;
    const table = await Table.findOneAndUpdate({tableID: id}, {depositStatus}, {new: true});
    res.status(200).json(table);
}

export const updateTable = async (req, res) => {
    const {id} = req.params;
    const fields = ["quantity", "time", "date", "name", "phone", "email", "occasion", "specialRequest", "tableType", "depositStatus", "bill"];

    const updateData = {};
    fields.forEach(field => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });
    const table = await Table.findByIdAndUpdate({_id: id}, updateData, {new: true});
    res.status(200).json(table);
}

export const updateTableBill = async (req, res) => {
    const {id} = req.params;
    const {bill} = req.body;
    const table = await Table.findOneAndUpdate({_id: id}, {bill}, {new: true});
    res.status(200).json(table);
}

export const deleteTable = async (req, res) => {
    const {id} = req.params;
    await Table.findByIdAndDelete(id);
    res.status(200).json({message: 'Table deleted successfully'});
}

export const getAvailTbls = async (req, res) => {
    const {date, time} = req.params;
    try {
        const isLunchShift = time === '12:00';
        const shiftStart = isLunchShift ? '09:00' : '18:00';
        const shiftEnd = isLunchShift ? '14:00' : '23:00';

        const bookedTables = await Table.find({
            date: date,
            time: { 
                $gte: shiftStart,
                $lte: shiftEnd
            },
            depositStatus: { $in: ['paid'] },
            bill: 0
        });

        const tableConfigs = await Tblconfig.find();

        const availableTables = tableConfigs.map(config => {
            const bookedQuantity = bookedTables
                .filter(booking => booking.tableType === config.tableID)
                .reduce((total, booking) => {
                    return total + Math.ceil(booking.quantity / 10);
                }, 0);

            return {
                tableID: config.tableID,
                tableName: config.tableName,
                tableQty: Math.max(0, config.tableQty - bookedQuantity)
            };
        });

        res.status(200).json(availableTables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTblConfig = async (req, res) => {
    const tblconfig = await Tblconfig.find().select('tableID tableName tablePrice tableIMG tableQty');
    res.status(200).json(tblconfig);
}

export const getTblConfigById = async (req, res) => {
    const {id} = req.params;
    const tblconfig = await Tblconfig.findById(id);
    res.status(200).json(tblconfig);
}

export const createAdminTable= async (req, res) => {
    const {tableID, name, quantity, time, date, phone, email, occasion, specialRequest, tableType, depositStatus, bill} = req.body;
    const table = new Table({tableID, name, quantity, time, date, phone, email, occasion, specialRequest, tableType, depositStatus, bill});
    await table.save();
    res.status(201).json(table);
}







