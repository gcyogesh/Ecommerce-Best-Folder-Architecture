import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  },
  debug: true, 
  logger: true 
})

console.log({   
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  });

export const ProvideMail = async (to: string, subject: string, text: string) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to,
            subject,
            text,
        
            
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};