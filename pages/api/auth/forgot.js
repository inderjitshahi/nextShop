import nc from 'next-connect'
import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import User from '@/models/Users';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';
const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email } = req.body;
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"The Email doesn't Exists"})
        }
        const user_id= createResetToken({
            id:user._id.toString(),
        })
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Reset Your ISShop Account Password.",resetEmailTemplate);
        await db.disconnectDb();
        res.status(200).json({ message: "Email Sent Successfully, Please Look into your Mailbox to Reset Password." })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



export default handler;