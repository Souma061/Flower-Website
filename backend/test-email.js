import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
    console.log('🔧 Testing SMTP Connection...\n');
    console.log('SMTP Settings:');
    console.log('  Host:', process.env.SMTP_HOST);
    console.log('  Port:', process.env.SMTP_PORT);
    console.log('  User:', process.env.SMTP_USER);
    console.log('  Pass:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
    console.log('\n');

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        console.log('🔄 Verifying connection...');
        await transporter.verify();
        console.log('✅ SMTP connection successful!\n');

        console.log('📧 Sending test email...');
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.TO_EMAIL,
            subject: '✅ Test Email from Flower Website',
            text: 'If you receive this, your SMTP is working correctly!',
            html: '<h2>✅ Success!</h2><p>Your SMTP configuration is working correctly.</p>'
        });

        console.log('✅ Test email sent successfully!');
        console.log('📬 Check your inbox:', process.env.TO_EMAIL);
        process.exit(0);

    } catch (error) {
        console.error('❌ SMTP Test Failed!\n');
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('\nFull Error:', error);
        
        if (error.code === 'EAUTH') {
            console.log('\n💡 Solution: Invalid credentials. Generate a new App Password.');
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
            console.log('\n💡 Solution: Cannot reach Gmail SMTP. Check your internet or try Brevo.');
        }
        
        process.exit(1);
    }
}

testEmail();
