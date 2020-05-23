import nodemailer from "nodemailer";

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zoha7878@gmail.com', // generated ethereal user
            pass: 'Fara2205', // generated ethereal password
        },
    });

    await transporter.sendMail(mailOptions);
};


export default sendMail;
