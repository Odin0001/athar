import nodemailer from 'nodemailer'


export async function POST(req) {
  // Parse the request body
  const { name, email, phone, company, position, subject, message, website } = await req.json();

  // Check for honeypot field to prevent spam
  if (website && website.trim() !== "") {
    console.log("Spam bot detected via honeypot.");
    return new Response(JSON.stringify({ message: "Spam detected" }), {
      status: 400,
    });
  }

  if (!name || !email || !phone || !company || !position || !subject || !message) {
    return new Response(JSON.stringify({ message: 'Please fill the required fields.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // create a transporter object (using host + port for privateemail)
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { 
        ciphers: "SSLv3", 
        rejectUnauthorized: false 
    },
    logger: true,
    debug: true
  });

  try {
    // verify connection configuration before sending
    await transporter.verify();

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Website Contact Us Form - ${subject}`,
      text: `New message from ${name} (${email})\n\nCompany: ${company}\nPosition: ${position}\nPhone: ${phone}\n\n${message}`,
      html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
         <h2 style="color: #0056b3;">New Contact Form Submission from Athar Website</h2>
         <p>You have received a new message from your website contact form.</p>
         <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
         <p><strong>Full Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone}</p>
         <p><strong>Company Name:</strong> ${company}</p>
         <p><strong>Subject:</strong> ${subject}</p>
         <p><strong>position:</strong> ${position}</p>
         <p><strong>Message:</strong></p>
         <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">${message}</p>
         <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
         <p style="font-size: 0.9em; color: #666;">This email was sent from your website's contact form.</p>
       </div>
     `,
    })

    console.log('message is sent')
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    const messageText = error?.message || 'Internal server error';
    return new Response(JSON.stringify({ message: messageText }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}