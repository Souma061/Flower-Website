import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend'))); 

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message, subject } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL || process.env.SMTP_USER,
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

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 SMTP configured: ${process.env.SMTP_USER || 'Not set'}`);
});

