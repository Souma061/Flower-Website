import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const app = express();

// Configure CORS to allow Vercel frontend
app.use(
  cors({
    origin: [
      'https://flower-website-plum.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001/',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message, subject } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    try {
        console.log('📧 Preparing to send email via SendGrid...');

        const msg = {
            to: process.env.TO_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
            replyTo: email,
            subject: `New Contact Form: ${subject || 'No Subject'}`,
            text: `You have received a new message from your website contact form.\n\n` +
                  `Here are the details:\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n` +
                  `Phone: ${phone || 'N/A'}\n` +
                  `Subject: ${subject || 'No Subject'}\n\n` +
                  `Message:\n${message}\n`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <hr style="border: 1px solid #ddd;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                    <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                    <hr style="border: 1px solid #ddd;">
                    <p><strong>Message:</strong></p>
                    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                        ${message.replace(/\n/g, '<br/>')}
                    </p>
                </div>
            `
        };

        await sgMail.send(msg);
        console.log('✅ Email sent successfully via SendGrid!');
        res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        console.error('Full error:', error);

        let errorMessage = 'Failed to send email. ';
        if (error.code === 403) {
            errorMessage += 'SendGrid API key invalid or sender email not verified.';
        } else {
            errorMessage += error.message;
        }

        res.status(500).json({ success: false, message: errorMessage });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured: SendGrid ${process.env.SENDGRID_API_KEY ? '✅' : '❌ (API key missing)'}`);
});
