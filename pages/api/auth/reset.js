import nc from 'next-connect'
import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import User from '@/models/Users';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';
const handler = nc();

handler.put(async (req, res) => {
    try {
        await db.connectDb();
        const { user,password} = req.body;
        if(user.exp>Date.now()){
            return res.status(400).json({message:"The Link Has Expired"})
        }
        const userData =await User.findById({_id:user.id});
        if(!userData){
            return res.status(400).json({message:"The Account doesn't Exists"})
        }
        const encryptedPassword=await bcrypt.hash(password,12);
        await userData.updateOne({
            password:encryptedPassword,
        });
        res.status(200).json({ email: userData.email })
        await db.disconnectDb();
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



export default handler;