const nodemailer = require('nodemailer');
require('dotenv').config

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from : `${process.env.EMAIL_FROM} <${process.env.EMAIL_USERNAME}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;