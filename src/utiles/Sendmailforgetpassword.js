import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAILESEND
    }
});

const sendResetEmail = async (to, resetToken) => {
    const resetUrl = `${process.env.CORS}/reset-password?reset=${resetToken}`;

    const mailOptions = {
        from: 'mauryas22it@student.mes.ac.in',
        to,
        subject: 'Password Reset Request',
        html: `
            <html>
                <body>
                    <h1>Password Reset</h1>
                    <p>Click the link below to reset your password:</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>If you did not request this, please ignore this email.</p>
                </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default sendResetEmail;
