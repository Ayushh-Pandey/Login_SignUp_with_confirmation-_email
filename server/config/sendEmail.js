const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer");


const mail = async(userEmail,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASS
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    try {
        const info = await transporter.sendMail({
            from: `"Aeonaxy Technologies" <${process.env.ETHEREAL_EMAIL}`, // sender address
            to: `${userEmail}`, // list of receivers
            subject: "From Aeonaxy Technologies", // Subject line
            text: "Thank you for creating account with dribble!", // plain text body
            
        });
        return info
    } catch (error) {
        return "Error"
    }
}

module.exports = {mail}