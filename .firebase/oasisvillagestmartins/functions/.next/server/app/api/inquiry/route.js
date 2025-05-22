(()=>{var e={};e.id=693,e.ids=[693],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1630:e=>{"use strict";e.exports=require("http")},1645:e=>{"use strict";e.exports=require("net")},1820:e=>{"use strict";e.exports=require("os")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3766:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>m,routeModule:()=>p,serverHooks:()=>g,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>u});var o={};t.r(o),t.d(o,{POST:()=>d});var i=t(6559),a=t(8088),s=t(7719),n=t(2190);let l=t(9526).createTransport({service:"gmail",auth:{user:"thevillagestmartins@gmail.com",pass:process.env.GMAIL_APP_PASSWORD},secure:!0});async function d(e){try{let{inquiryName:r,inquiryEmail:t,inquiryPhoneNumber:o,inquiryMessage:i,spaceTitle:a}=await e.json();if(!r||!t||!o)return n.NextResponse.json({error:"Missing required fields: Name, Email, and Phone Number are required."},{status:400});let s={from:'"Website Inquiry" <thevillagestmartins@gmail.com>',to:"thevillagestmartins@gmail.com",subject:`New Inquiry: ${r} - Regarding ${a||"General Inquiry"}`,text:`You have received a new inquiry:

Name: ${r}
Email: ${t}
Phone: ${o}
Regarding Space: ${a||"N/A"}

Message:
${i||"No additional message provided."}`,html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Space Inquiry</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
            .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .header { background-color: #1a365d; /* Deep Navy */ color: #ffffff; padding: 30px 20px; text-align: center; }
            .header img { max-width: 180px; margin-bottom: 10px; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
            .content { padding: 25px 30px; }
            .content p { margin-bottom: 15px; font-size: 16px; }
            .details-box { background-color: #f9f9f9; padding: 20px; margin: 25px 0; border-left: 5px solid #1a365d; border-radius: 0 5px 5px 0; }
            .details-box h3 { margin-top: 0; color: #1a365d; font-size: 18px; }
            .details-box p { margin: 8px 0; }
            .message-box { margin-top: 20px; padding: 15px; border: 1px solid #eeeeee; border-radius: 5px; background-color: #ffffff; }
            .footer { background-color: #e9ecef; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
            .footer a { color: #1a365d; text-decoration: none; }
            strong { color: #000000; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis-st-martins-village-logo.png-068f1365cd3418f6769d76529815412a.png" alt="The Village Workspace Logo">
              <h1>New Space Inquiry</h1>
            </div>
            <div class="content">
              <p>You have received a new inquiry with the following details:</p>
              <div class="details-box">
                <h3>Contact Information:</h3>
                <p><strong>Name:</strong> ${r}</p>
                <p><strong>Email:</strong> <a href="mailto:${t}" style="color:#0f766e;">${t}</a></p>
                <p><strong>Phone:</strong> ${o}</p>
                <p><strong>Regarding Space:</strong> ${a||"General Inquiry"}</p>
              </div>
              <div class="message-box">
                <h3>Message:</h3>
                <p>${i||"No additional message provided."}</p>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was submitted via the website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `},d={from:'"The Village Workspace" <thevillagestmartins@gmail.com>',to:t,subject:`Thank you for your inquiry, ${r}!`,text:`Dear ${r},

Thank you for your inquiry about ${a||"our spaces"} at The Village Workspace.

We have received your details:
Email: ${t}
Phone: ${o}
${i?`Your Message: ${i}`:""}

Our team will review your inquiry and get back to you as soon as possible.

Best regards,
The Village Team
155 Tulse Hill, London SW2 3UP
+447975708289
thevillagestmartins@gmail.com`,html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inquiry Confirmation</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
            .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .header { background-color: #0f766e; /* Teal */ color: #ffffff; padding: 30px 20px; text-align: center; }
            .header img { max-width: 180px; margin-bottom: 10px; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
            .content { padding: 25px 30px; }
            .content p { margin-bottom: 15px; font-size: 16px; }
            .cta-button { background-color: #1a365d; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block; margin-top:15px; }
            .footer { background-color: #e9ecef; padding: 20px; text-align: center; font-size: 12px; color: #666666; }
            .footer a { color: #0f766e; text-decoration: none; }
            strong { color: #000000; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oasis-st-martins-village-logo.png-068f1365cd3418f6769d76529815412a.png" alt="The Village Workspace Logo">
              <h1>Thank You For Your Inquiry!</h1>
            </div>
            <div class="content">
              <p>Dear ${r},</p>
              <p>Thank you for your interest in <strong>${a||"our spaces"}</strong> at The Village Workspace. We've received your inquiry and our team will get back to you as soon as possible, typically within 1-2 business days.</p>
              <p><strong>Details Received:</strong></p>
              <ul>
                <li>Email: ${t}</li>
                <li>Phone: ${o}</li>
                ${i?`<li>Your Message: ${i}</li>`:""}
              </ul>
              <p>If your matter is urgent, or if you'd like to speak to someone sooner, please don't hesitate to call us at +447975708289.</p>
              <p style="text-align:center;">
                <a href="https://www.thevillagebyoasis.com" class="cta-button">Visit Our Website</a> (Assuming you have a website)
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
      `};return await l.sendMail(s),await l.sendMail(d),n.NextResponse.json({success:!0,message:"Inquiry submitted successfully."},{status:200})}catch(r){console.error("[INQUIRY API] Error processing inquiry:",r);let e=r instanceof Error?r.message:"An unknown error occurred";return n.NextResponse.json({error:"Failed to submit inquiry.",details:e},{status:500})}}l.verify(function(e,r){e?console.log("[INQUIRY API] SMTP server connection error:",e):console.log("[INQUIRY API] SMTP server connection verified and ready")});let p=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/inquiry/route",pathname:"/api/inquiry",filename:"route",bundlePath:"app/api/inquiry/route"},resolvedPagePath:"C:\\Users\\madei\\oasiscatalog\\src\\app\\api\\inquiry\\route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:c,workUnitAsyncStorage:u,serverHooks:g}=p;function m(){return(0,s.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:u})}},3873:e=>{"use strict";e.exports=require("path")},4075:e=>{"use strict";e.exports=require("zlib")},4631:e=>{"use strict";e.exports=require("tls")},4735:e=>{"use strict";e.exports=require("events")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5511:e=>{"use strict";e.exports=require("crypto")},5591:e=>{"use strict";e.exports=require("https")},6487:()=>{},7366:e=>{"use strict";e.exports=require("dns")},7910:e=>{"use strict";e.exports=require("stream")},8335:()=>{},8354:e=>{"use strict";e.exports=require("util")},9021:e=>{"use strict";e.exports=require("fs")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:e=>{"use strict";e.exports=require("url")},9646:e=>{"use strict";e.exports=require("child_process")}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[447,580,526],()=>t(3766));module.exports=o})();