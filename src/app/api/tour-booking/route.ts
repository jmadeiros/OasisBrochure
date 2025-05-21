import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ical, { ICalAttendeeRole } from 'ical-generator';

// Log the environment variable at the module scope to check if it's loaded
console.log('GMAIL_APP_PASSWORD loaded:', !!process.env.GMAIL_APP_PASSWORD);
console.log('GMAIL_APP_PASSWORD value (first 2 chars):', process.env.GMAIL_APP_PASSWORD?.substring(0,2));

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thevillagestmartins@gmail.com',
    // Never use a regular password in Gmail SMTP - it will fail with modern security settings
    // You must use an App Password after enabling 2FA
    pass: process.env.GMAIL_APP_PASSWORD!, // Will use environment variable
  },
  secure: true,
});

// For development testing, log auth status
transporter.verify(function(error, success) {
  if (error) {
    console.log('SMTP server connection error:', error);
  } else {
    console.log('SMTP server connection verified and ready');
  }
});

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const data = await request.json();
    const { tourName, tourEmail, tourPhoneNumber, tourDate, tourTime, tourMessage } = data;

    if (!tourName || !tourEmail || !tourPhoneNumber || !tourDate || !tourTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format date and time for display
    const dateObj = new Date(tourDate + 'T' + tourTime);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Create calendar event
    const calendar = ical({
      prodId: { company: 'thevillagebyoasis', product: 'tour-booking' },
      name: 'The Village Tour',
    });

    // Add event to calendar
    const event = calendar.createEvent({
      start: dateObj,
      end: new Date(dateObj.getTime() + 60 * 60 * 1000), // 1 hour tour
      summary: 'Tour of The Village Workspace',
      description: `Tour for ${tourName}\nPhone: ${tourPhoneNumber}\n${tourMessage ? `Message: ${tourMessage}` : ''}`,
      location: 'The Village, 155 Tulse Hill, London SW2 3UP',
      organizer: {
        name: 'The Village Workspace',
        email: 'thevillagestmartins@gmail.com',
      },
      attendees: [
        {
          name: tourName,
          email: tourEmail,
          rsvp: true,
          role: ICalAttendeeRole.REQ,
        },
        {
          name: 'The Village Admin',
          email: 'thevillagestmartins@gmail.com',
          role: ICalAttendeeRole.OPT,
        },
      ],
    });

    // User email content (confirmation)
    const userEmailContent = {
      from: '"The Village" <thevillagestmartins@gmail.com>',
      to: tourEmail,
      subject: 'Your Village Tour is Booked!',
      text: `Dear ${tourName},

Thank you for booking a tour of The Village Workspace!

Your tour is scheduled for:
Date: ${formattedDate}
Time: ${formattedTime}

Location: The Village, 155 Tulse Hill, London SW2 3UP

We look forward to showing you our historic workspace. If you have any questions before your tour or need to reschedule, please don't hesitate to contact us.

A calendar invitation (.ics file) has been attached to this email for your convenience. Please open it to add this event to your calendar.

Best regards,
The Village Team
155 Tulse Hill, London SW2 3UP
+447975708289
thevillagestmartins@gmail.com`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tour Confirmation</title>
  <style>
    body { margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .header { background-color: #0f766e; /* Teal */ color: #ffffff; padding: 30px 20px; text-align: center; }
    .header img { max-width: 180px; margin-bottom: 10px; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
    .content { padding: 25px 30px; }
    .content p { margin-bottom: 15px; font-size: 16px; }
    .details-box { background-color: #f9f9f9; padding: 20px; margin: 25px 0; border-left: 5px solid #0f766e; border-radius: 0 5px 5px 0; }
    .details-box h3 { margin-top: 0; color: #0f766e; font-size: 18px; }
    .calendar-cta { text-align: center; margin: 25px 0; }
    .calendar-cta a { background-color: #1a365d; /* Deep Navy */ color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block; }
    .footer { background-color: #e9ecef; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
    .footer a { color: #0f766e; text-decoration: none; }
    strong { color: #000000; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis-st-martins-village-logo.png-068f1365cd3418f6769d76529815412a.png" alt="The Village Workspace Logo">
      <h1>Your Village Tour is Booked!</h1>
    </div>
    <div class="content">
      <p>Dear ${tourName},</p>
      <p>Thank you for booking your tour of <strong>The Village Workspace</strong>! We're excited to show you around.</p>
      <div class="details-box">
        <h3>Your Tour Details:</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Location:</strong> The Village, 155 Tulse Hill, London SW2 3UP</p>
      </div>
      <p>We look forward to showing you our historic and versatile workspace. If you have any questions before your tour, or if you need to reschedule, please don't hesitate to contact us.</p>
      <div class="calendar-cta">
        <p style="margin-bottom:10px; font-size: 16px;"><strong>🗓️ Add this to your calendar:</strong></p>
        <p style="font-size:14px; color:#555;">An invitation (.ics file) is attached. Open it to add the tour to your preferred calendar (Google, Apple, Outlook, etc.).</p>
      </div>
      <p>Best regards,<br>
      The Village Team<br>
      </p>
    </div>
    <div class="footer">
      <p>155 Tulse Hill, London SW2 3UP | +447975708289 | <a href="mailto:thevillagestmartins@gmail.com">thevillagestmartins@gmail.com</a></p>
      <p>This is an automated email. Please do not reply directly.</p>
    </div>
  </div>
</body>
</html>
      `,
      icalEvent: {
        filename: 'tour-invitation.ics',
        method: 'REQUEST',
        content: calendar.toString(),
      },
    };

    // Admin email content (notification)
    const adminEmailContent = {
      from: '"The Village Booking System" <thevillagestmartins@gmail.com>',
      to: 'thevillagestmartins@gmail.com',
      subject: `New Village Tour Booking: ${tourName} - ${formattedDate}`,
      text: `New Tour Booking Details:

Name: ${tourName}
Email: ${tourEmail}
Phone: ${tourPhoneNumber}
Date: ${formattedDate}
Time: ${formattedTime}
${tourMessage ? `\nMessage: ${tourMessage}` : ''}

This tour has been automatically added to your calendar.`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .header { background-color: #1a365d; /* Deep Navy */ color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;}
    .header h2 { margin: 0; font-size: 22px; }
    .content { padding: 20px; }
    .content p { margin-bottom: 12px; font-size: 15px; }
    .details { background-color: #f1f3f5; padding: 15px; margin: 20px 0; border-left: 4px solid #0f766e; /* Teal Accent */ border-radius: 0 4px 4px 0; }
    .details strong { color: #1a365d; }
    .footer { text-align: center; font-size: 12px; color: #6c757d; padding-top: 20px; border-top: 1px solid #e9ecef; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Tour Booking Notification</h2>
    </div>
    <div class="content">
      <p>A new tour has been booked for <strong>The Village Workspace</strong>.</p>
      <div class="details">
        <p><strong>Name:</strong> ${tourName}</p>
        <p><strong>Email:</strong> ${tourEmail}</p>
        <p><strong>Phone:</strong> ${tourPhoneNumber}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        ${tourMessage ? `<p><strong>Message:</strong> ${tourMessage}</p>` : ''}
      </div>
      <p>This tour has been automatically added to the shared calendar.</p>
    </div>
    <div class="footer">
      <p>This is an automated notification from The Village Booking System.</p>
    </div>
  </div>
</body>
</html>
      `,
      icalEvent: {
        filename: 'tour-invitation.ics',
        method: 'REQUEST',
        content: calendar.toString(),
      },
    };

    // Send emails
    const userEmailResult = await transporter.sendMail(userEmailContent);
    const adminEmailResult = await transporter.sendMail(adminEmailContent);

    return NextResponse.json({ 
      success: true, 
      message: 'Tour booking confirmed',
      userEmail: userEmailResult.messageId,
      adminEmail: adminEmailResult.messageId
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing tour booking:', error);
    return NextResponse.json({ 
      error: 'Failed to process booking', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 