const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });
    console.log(`✅ Email sent: ${info.response}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendEmail;
