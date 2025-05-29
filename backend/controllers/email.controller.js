import Email from '../models/email.model.js';
import transporter from '../config/nodemailer.js';

export const sendEmail = async (req, res) => {
    const emails = await Email.find();
    const emailList = emails.map(item => item.email);
    const { subject, text} = req.body;

    (async () => {
    const info = await transporter.sendMail({
        from: '"TokyoBites" <viperdiff28@gmail.com>',
        to: 'ng.hoangcuong28@gmail.com', // list of receivers
        subject: subject,
        text: text,
    });
    })();
}
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
