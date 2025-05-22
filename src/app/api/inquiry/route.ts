import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter (using the same one as tour-booking for consistency)
// Ensure GMAIL_APP_PASSWORD is set in your environment variables
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'thevillagestmartins@gmail.com',
//     pass: process.env.GMAIL_APP_PASSWORD!, // Crucial: Use the App Password from env
//   },
//   secure: true,
// });

// Verify transporter connection (optional, good for debugging)
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log('[INQUIRY API] SMTP server connection error:', error);
//   } else {
//     console.log('[INQUIRY API] SMTP server connection verified and ready');
//   }
// });

export async function POST(request: NextRequest) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thevillagestmartins@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD!,
      },
      secure: true,
    });

    const data = await request.json();
    const { inquiryName, inquiryEmail, inquiryPhoneNumber, inquiryMessage, spaceTitle } = data;

    if (!inquiryName || !inquiryEmail || !inquiryPhoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, Email, and Phone Number are required.' },
        { status: 400 }
      );
    }

    // Email to Admin
    const adminEmailContent = {
      from: '"Website Inquiry" <thevillagestmartins@gmail.com>',
      to: 'thevillagestmartins@gmail.com', // Your admin email
      subject: `New Inquiry: ${inquiryName} - Regarding ${spaceTitle || 'General Inquiry'}`,
      text: `You have received a new inquiry:\\n\\nName: ${inquiryName}\\nEmail: ${inquiryEmail}\\nPhone: ${inquiryPhoneNumber}\\nRegarding Space: ${spaceTitle || 'N/A'}\\n\\nMessage:\\n${inquiryMessage || 'No additional message provided.'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Space Inquiry</title>
          <style>
    body { margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .header { background-color: #F1F5F9; /* Changed to Slate-100 */ color: #1a365d; /* Changed h1 color to Deep Navy */ padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
    .content { padding: 25px 30px; }
    .content p { margin-bottom: 15px; font-size: 16px; }
    .details-box { background-color: #f9f9f9; padding: 20px; margin: 25px 0; border-left: 5px solid #0f766e; border-radius: 0 5px 5px 0; }
    .details-box h3 { margin-top: 0; color: #0f766e; font-size: 18px; }
    .details-box p { margin: 8px 0; } /* Specific to admin inquiry */
    .message-box { margin-top: 20px; padding: 15px; border: 1px solid #eeeeee; border-radius: 5px; background-color: #ffffff; } /* Specific to admin inquiry */
    .footer { background-color: #e9ecef; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
    .footer a { color: #0f766e; text-decoration: none; }
    strong { color: #000000; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div style="font-size: 26px; color: #1a365d; margin-bottom: 10px; font-weight: 300;">The <strong style="font-weight: bold; color: #1a365d;">Village</strong></div>
              <h1>New Space Inquiry</h1>
            </div>
            <div class="content">
              <p>You have received a new inquiry with the following details:</p>
              <div class="details-box">
                <h3>Contact Information:</h3>
                <p><strong>Name:</strong> ${inquiryName}</p>
                <p><strong>Email:</strong> <a href="mailto:${inquiryEmail}" style="color:#0f766e;">${inquiryEmail}</a></p>
                <p><strong>Phone:</strong> ${inquiryPhoneNumber}</p>
                <p><strong>Regarding Space:</strong> ${spaceTitle || 'General Inquiry'}</p>
              </div>
              <div class="message-box">
                <h3>Message:</h3>
                <p>${inquiryMessage || 'No additional message provided.'}</p>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was submitted via the website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email to User (Confirmation)
    const userEmailContent = {
      from: '"The Village Workspace" <thevillagestmartins@gmail.com>',
      to: inquiryEmail,
      subject: `Thank you for your inquiry, ${inquiryName}!`,
      text: `Dear ${inquiryName},\\n\\nThank you for your inquiry about ${spaceTitle || 'our spaces'} at The Village Workspace.\\n\\nWe have received your details:\\nEmail: ${inquiryEmail}\\nPhone: ${inquiryPhoneNumber}\\n${inquiryMessage ? `Your Message: ${inquiryMessage}` : ''}\\n\\nOur team will review your inquiry and get back to you as soon as possible.\\n\\nBest regards,\\nThe Village Team\\n155 Tulse Hill, London SW2 3UP\\n+447975708289\\nthevillagestmartins@gmail.com`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inquiry Confirmation</title>
          <style>
    body { margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .header { background-color: #F1F5F9; /* Changed to Slate-100 */ color: #1a365d; /* Changed h1 color to Deep Navy */ padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
    .content { padding: 25px 30px; }
    .content p { margin-bottom: 15px; font-size: 16px; }
    .details-box { background-color: #f9f9f9; padding: 20px; margin: 25px 0; border-left: 5px solid #0f766e; border-radius: 0 5px 5px 0; } /* Copied from tour booking */
    .details-box h3 { margin-top: 0; color: #0f766e; font-size: 18px; } /* Copied from tour booking */
    .cta-button { background-color: #1a365d; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block; margin-top:15px; } /* Specific to user inquiry */
    .footer { background-color: #e9ecef; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
    .footer a { color: #0f766e; text-decoration: none; }
    strong { color: #000000; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div style="font-size: 26px; color: #1a365d; margin-bottom: 10px; font-weight: 300;">The <strong style="font-weight: bold; color: #1a365d;">Village</strong></div>
              <h1>Thank You For Your Inquiry!</h1>
            </div>
            <div class="content">
              <p>Dear ${inquiryName},</p>
              <p>Thank you for your interest in <strong>${spaceTitle || 'our spaces'}</strong> at The Village Workspace. We've received your inquiry and our team will get back to you as soon as possible, typically within 1-2 business days.</p>
              <p><strong>Details Received:</strong></p>
              <ul>
                <li>Email: ${inquiryEmail}</li>
                <li>Phone: ${inquiryPhoneNumber}</li>
                ${inquiryMessage ? `<li>Your Message: ${inquiryMessage}</li>` : ''}
              </ul>
              <p>If your matter is urgent, or if you'd like to speak to someone sooner, please don't hesitate to call us at +447975708289.</p>
              <p style="text-align:center; margin-top: 25px;">
                <a href="https://www.thevillagebyoasis.com" style="background-color: #1a365d; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">Visit Our Main Website</a>
              </p>
              <p>Best regards,<br>
              The Village Team</p>
            </div>
            <div class="footer">
              <p>155 Tulse Hill, London SW2 3UP | +447975708289 | <a href="mailto:thevillagestmartins@gmail.com">thevillagestmartins@gmail.com</a></p>
              <p>This is an automated confirmation. Please do not reply directly.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    await transporter.sendMail(adminEmailContent);
    await transporter.sendMail(userEmailContent);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' }, { status: 200 });

  } catch (error) {
    console.error('[INQUIRY API] Error processing inquiry:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to submit inquiry.', details: errorMessage }, { status: 500 });
  }
} 