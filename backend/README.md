# Flower Website Backend

Backend server for handling contact form submissions with email notifications.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` with your email credentials:

#### For Gmail:
- Enable 2-factor authentication in your Google account
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use the generated password in `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
TO_EMAIL=your-email@gmail.com
```

#### For Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
TO_EMAIL=your-email@outlook.com
```

### 3. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on http://localhost:3000

## API Endpoints

### POST /api/contact
Submit contact form data

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Question about flowers",
  "message": "I would like to know..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Testing

Test the contact form by:
1. Running the server
2. Opening http://localhost:3000 in your browser
3. Filling out and submitting the contact form
4. Checking your email inbox

## Troubleshooting

**Email not sending?**
- Check your SMTP credentials in `.env`
- For Gmail, ensure you're using an App Password, not your regular password
- Check if your email provider requires "Less secure app access" to be enabled
- Look at the server console for error messages

**Port already in use?**
- Change the `PORT` value in `.env` to a different number (e.g., 3001)
