import cron from 'node-cron';
import Table from '../models/table.model.js';
import moment from 'moment';

cron.schedule('* * * * *', async () => {
    try {
        const tables = await Table.find({ status: 'pending' });
        const now = moment();

        for (const table of tables) {
            const tableTime = moment(table.time, 'HH:mm');
            const timeDifference = now.diff(tableTime, 'minutes');
            console.log(`Table ID: ${table._id}, Table Name: ${table.name}, Time Difference: ${timeDifference} minutes`);
            if (timeDifference > 30) {
                await Table.findByIdAndUpdate(table._id, { depositStatus: 'pending' , status: 'canceled' }, { new: true });
                console.log(`Updated table ${table._id} depositStatus to pending and status to canceled.`);
            }
        }
    } catch (error) {
        console.error('Error updating pending tables:', error);
    }
});