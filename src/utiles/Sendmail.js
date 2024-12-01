import nodemailer from 'nodemailer';
import User from '../Modules/User.module.js';

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAILESEND,
    },
});

async function sendWelcomeEmail(userEmail, userName) {
    try {

        const info = await transporter.sendMail({
            from: '"mauryas22it@student.mes.ac.in',
            to: userEmail,
            subject: 'Welcome to Our Resume Bulding Services!',
            text: `Hello ${userName},\n\nThank you for registering with us! We're excited to have you on board.`,
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <h1 style="color: #007BFF; font-size: 40px;">
                        Hello,<span style="text-transform: uppercase;"> ${userName} 👋</span>
                        </h1>
                        <p style="font-size: 18px;">Thank you for registering with us! We're excited to have you on board.</p>
                        <p>To get started, please click the button below:</p>
                        <a href="http://localhost:5173/Login" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                        Get Started
                        </a>
                        <p>Best regards,<br>Team Resume Building</p>
                    </body>
                    </html>

            `,
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Export the function
export default sendWelcomeEmail;
