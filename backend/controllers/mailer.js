import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const sendMail=async(req,res)=>{

    var {username,otp,subject}=req.body;
    var decodedEmail = decodeURIComponent(req.body.email);
    const email=decodedEmail;
    let con={
        service:"gmail",
        auth:{
            user:process.env.REACT_APP_EMAIL,
            pass:process.env.REACT_APP_PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(con);

    let mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Instagram",
            link: "https://mailgen.js/",
        },
    });
    var emailBody = mailGenerator.generate({
        body: {
            name: username,
            intro: 'Your OTP for verification is:' + otp,
            outro: 'If you did not request this OTP, please ignore this email.',
          },
    
    });
    let message={
        from:process.env.REACT_APP_EMAIL,
        to:email,
        subject:subject||"Welcome",
        html:emailBody
    }
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({message:"Email sent"});
    })
    .catch((err)=>{
        return res.status(500).send(err.message);
    })
}

export default sendMail;