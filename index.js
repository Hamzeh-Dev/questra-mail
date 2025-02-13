const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const { data } = require("./data.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const sendEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_PASS,
            },
        });
    
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_EMAIL,
            to: email,
            subject: "Level-UP, and Embark on Your Legendary Journey!",
            html: `
            <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; font-family: Arial, sans-serif; background: #f9f9f9; border: 1px solid #ddd;">
                <tr style="color: white; text-align: center;">
                <th style="padding: 15px; font-size: 20px;" colspan="2">
                    <img src="https://firebasestorage.googleapis.com/v0/b/chmi-a1a22.appspot.com/o/ef9ed53a-4dcf-4508-806a-7aca9614f4de.jpeg?alt=media&token=eabfc073-4cb0-446e-90e7-afbf6fd25fee" alt="Logo" style="width: 40%; height: auto; display: block; margin: 0 auto;" />
                </th>
                </tr>
                <tr>
                <td style="padding: 15px; text-align: center; font-size: 18px; font-weight: bold;">
                    Welcome to <span style="color: #007bff;">Questra</span>!
                </td>
                </tr>
                <tr>
                <td style="padding: 10px; text-align: center; font-size: 16px; color: #333;">
                    Transform your daily life into an epic quest. Level up, earn rewards, and become the hero of your own story.
                </td>
                </tr>
                <tr>
                <td style="padding: 15px; text-align: center;">
                    <a href="[YOUR_APP_LINK]" style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Get Started</a>
                </td>
                </tr>
            </table>
            `,
        };
    
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
    }
};

const sendEmails = async () => {
    try {
        for (const user of data) {
            await sendEmail(user.email);
        }
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

sendEmails();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
