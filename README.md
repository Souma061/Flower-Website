# 🌸 Flower Website

A beautiful flower delivery website with a contact form that sends emails directly to your inbox.

## 📁 Project Structure

```
Flower-Website/
├── frontend/               # Frontend files
│   ├── index.html         # Main HTML file
│   └── styles.css         # CSS styles
│
├── backend/               # Backend server
│   ├── server.js         # Express server with email functionality
│   ├── package.json      # Backend dependencies
│   ├── .env.example      # Environment variables template
│   ├── .gitignore        # Git ignore file
│   └── README.md         # Backend setup instructions
│
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Install Backend Dependencies

Open PowerShell/Terminal in the project root and run:

```powershell
cd backend
npm install
```

This will install:
- **express** - Web server framework
- **nodemailer** - Email sending library
- **cors** - Enable cross-origin requests
- **dotenv** - Environment variable management
- **nodemon** (dev) - Auto-restart server on changes

### 2. Configure Email Settings

```powershell
# Copy the example env file
cd backend
copy .env.example .env
```

Then edit `backend\.env` with your email credentials (see Backend Setup section below).

### 3. Run the Server

```powershell
cd backend
npm start
```

Visit: **http://localhost:3000**

## 📧 Backend Setup

### For Gmail Users:

1. **Enable 2-Factor Authentication** in your Google account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-digit password

3. **Edit `backend\.env`**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
TO_EMAIL=your-email@gmail.com
PORT=3000
```

### For Outlook/Hotmail Users:

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
TO_EMAIL=your-email@outlook.com
PORT=3000
```

### For Other Email Providers:

Check your email provider's SMTP settings and update accordingly.

## 📦 All Dependencies to Install

Run this command in the `backend` folder:

```powershell
npm install express nodemailer cors dotenv
```

**Development dependency (optional):**
```powershell
npm install --save-dev nodemon
```

### Dependencies Breakdown:

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web server framework |
| nodemailer | ^6.9.7 | Send emails from Node.js |
| cors | ^2.8.5 | Handle cross-origin requests |
| dotenv | ^16.3.1 | Load environment variables |
| nodemon | ^3.0.1 | Auto-restart server (dev only) |

## 🧪 Testing the Contact Form

1. Start the server: `npm start` in backend folder
2. Open http://localhost:3000
3. Scroll to the Contact section
4. Fill out the form and click "Send Message"
5. Check your email inbox!

## 🔒 Security Notes

- ✅ Never commit your `.env` file to Git (already in `.gitignore`)
- ✅ Use App Passwords for Gmail (not your main password)
- ✅ Keep SMTP credentials secure
- ⚠️ Consider adding rate limiting for production
- ⚠️ Add reCAPTCHA to prevent spam in production

## 📝 Scripts Available

In the `backend` folder:

```powershell
npm start      # Start the server
npm run dev    # Start with auto-reload (if nodemailer installed)
```

## 🛠️ Troubleshooting

**Port 3000 already in use?**
- Change `PORT=3001` in `backend\.env`

**Emails not sending?**
- Check SMTP credentials in `.env`
- For Gmail, ensure App Password is used
- Check server console for error messages

**Form not submitting?**
- Make sure server is running
- Check browser console (F12) for errors
- Ensure you're accessing via http://localhost:3000

## 📄 License

ISC

## 👨‍💻 Author

Souma061

---

**Need help?** Check the `backend\README.md` for detailed backend setup instructions.
