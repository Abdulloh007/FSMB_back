const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, verificationCode) {
  try {
    const transporter = nodemailer.createTransport({
    });

    const mailOptions = {
      from: 'your@example.com',
      to: email,
      subject: 'Верификация аккаунта',
      text: `Ваш верификационный код: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
