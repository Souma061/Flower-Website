# SendGrid Setup Instructions

## Step 1: Sign up for SendGrid

1. Go to: https://signup.sendgrid.com/
2. Sign up for a **FREE account** (100 emails/day)
3. Verify your email address

## Step 2: Get API Key

1. Log in to SendGrid Dashboard
2. Go to: **Settings** → **API Keys**
3. Click **"Create API Key"**
4. Name: "Flower Website"
5. Select **"Full Access"**
6. Click **"Create & View"**
7. **Copy the API key** (you'll only see it once!)

## Step 3: Verify Sender Email

1. Go to: **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in your details:
   - From Name: Flower Website
   - From Email: soumabrataghosh57@gmail.com
   - Reply To: soumabrataghosh57@gmail.com
4. Check your email and click the verification link

## Step 4: Update Render Environment Variables

Go to your Render dashboard → Your service → Environment:

**Remove these (SMTP not needed anymore):**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

**Add these:**
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=soumabrataghosh57@gmail.com
TO_EMAIL=soumabrataghosh57@gmail.com
```

## Step 5: Deploy

Push changes and Render will auto-deploy!

## Why SendGrid Instead of SMTP?

- ✅ Works on Render free tier (SMTP is blocked)
- ✅ More reliable delivery
- ✅ 100 emails/day free (perfect for contact forms)
- ✅ Email analytics dashboard
- ✅ Better deliverability rates
