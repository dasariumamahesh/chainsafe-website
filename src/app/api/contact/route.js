import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `Portfolio Contact: ${subject}`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Email sent successfully'
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            }
        );

    } catch (error) {
        console.error('Email error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Failed to send email'
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            }
        );
    }
}