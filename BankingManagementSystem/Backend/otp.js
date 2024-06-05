const nodemailer = require('nodemailer');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmail(otp, mail) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your@gmail.com',
        pass: 'pass key'
      }
    });

    const mailOptions = {
      from: 'your@gmail.com',
      to: mail,
      subject: 'OTP',
      text: `Do not share this OTP: ${otp}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

module.exports = { generateOTP, sendEmail };
