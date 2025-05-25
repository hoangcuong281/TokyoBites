import Email from '../models/email.model.js';

export const getEmails = async (req, res) => {
    const emails = await Email.find();
    res.status(200).json(emails);
}

export const createEmail = async (req, res) => {
    const {email} = req.body;
    const emailEntry = new Email({email});
    await emailEntry.save();
    res.status(201).json(emailEntry);
}

export const deleteEmail = async (req, res) => {
    const {id} = req.params;
    await Email.findByIdAndDelete(id);
    res.status(200).json({message: 'Email deleted successfully'});
}
