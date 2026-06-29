import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createServer as createViteServer } from 'vite';

// Load Firebase Config safely using fs to ensure no ES Module import assertion issues
const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// API Routes FIRST
app.post('/api/leads', async (req, res) => {
  const { fullName, email, phoneNumber, websiteUrl } = req.body;

  if (!fullName || !email || !phoneNumber) {
    return res.status(400).json({ error: 'Full name, email, and phone number are required.' });
  }

  try {
    // 1. Save to Firestore
    const docRef = await addDoc(collection(db, 'leads'), {
      fullName,
      email,
      phoneNumber,
      websiteUrl: websiteUrl || '',
      createdAt: serverTimestamp(),
    });

    console.log(`Lead saved to Firestore with ID: ${docRef.id}`);

    // 2. Try to Send Email
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP Email parameters not configured. Documenting lead data on console:');
      console.log(`- Name: ${fullName}\n- Email: ${email}\n- Phone: ${phoneNumber}\n- Website: ${websiteUrl || 'N/A'}`);
      console.warn('👉 ACTION REQUIRED: Add SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in the AI Studio Settings (Secrets) panel to enable email dispatch.');
      
      return res.status(200).json({ 
        success: true, 
        id: docRef.id,
        emailStatus: 'not_configured',
        message: 'Lead saved successfully. SMTP is not configured, so no email was dispatched.' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"LaunchThread Leads" <${smtpUser}>`,
      to: 'gautam@launchthread.store',
      subject: `🔥 New Lead Captured: ${fullName}`,
      text: `
You have a new lead from your LaunchThread website!

Lead Details:
----------------------------------------
Name: ${fullName}
Email: ${email}
Phone: ${phoneNumber}
Website: ${websiteUrl || 'Not provided'}
Submitted At: ${new Date().toISOString()}
----------------------------------------
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">🔥 New Lead Captured!</h2>
          <p style="font-size: 16px; color: #334155;">You have a new lead submission from your LaunchThread landing page.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #f1f5f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 8px 0; color: #0f172a;">${phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Website:</td>
                <td style="padding: 8px 0; color: #0f172a;">${websiteUrl ? `<a href="${websiteUrl}" target="_blank" style="color: #4f46e5;">${websiteUrl}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}</td>
              </tr>
            </table>
          </div>
          
          <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            Sent automatically by your LaunchThread website engine.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Lead notification email sent to gautam@launchthread.store successfully.`);

    return res.status(200).json({ 
      success: true, 
      id: docRef.id,
      emailStatus: 'sent' 
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({ 
      error: 'An error occurred while saving the lead or sending the notification email.',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Configure Vite middleware or static serving
async function configureServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

configureServer();
