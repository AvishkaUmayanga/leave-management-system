import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';

export const sendEmail = async({email, emailType, userId}) => {
    try{
        const hashedToken = await bcrypt.hash(userId.toString(), 10); 
        
        if(emailType === 'VERIFY'){
          await userModel.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        }
        else if(emailType === 'RESET'){
          await userModel.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000});
        }
        const transporter = nodemailer.createTransport({
          host: "smtp.forwardmail.net",
          port: 465,
          secure: true, 
          auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
          },
        });

        const mailOptions = {
          from: 'avishkas97@gmail.com',
          to: email, 
          subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', 
          html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'reset your password'} or copy and paste the link below in your browser.
          <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`, 
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    }
    catch(error){
        throw new Error(error.message);
    }
}