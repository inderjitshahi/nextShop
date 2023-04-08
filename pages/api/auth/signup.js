import nc from 'next-connect'
import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import User from '@/models/Users';
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { activateEmailTemplate } from '@/emails/activateEmailTemplate';
const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please Fill All Fields" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "This email already exists." })
        }
        if (password?.length < 6) {
            return res.status(400).json({ message: "Password must have at least 6 characters" })
        }
        const encryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: encryptedPassword });
        const addedUser = await newUser.save();
        const activationToken=createActivationToken({
            id:addedUser._id.toString(),
        })
        const url=`${process.env.BASE_URL}/activate/${activationToken}`
        sendEmail(email,url,"","Activate Your ISShop Account.",activateEmailTemplate);
        await db.disconnectDb();
        res.json({message:"Sign Up Successful, Please Look into your Mailbox to Activate Account."})
        // res.send({ url });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



export default handler;