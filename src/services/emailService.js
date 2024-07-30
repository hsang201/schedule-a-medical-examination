// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` f or port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Medicare - Medicare Clinic 👻" <medicareclinic@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "XÁC NHẬN THÔNG TIN ĐẶT LỊCH KHÁM BỆNH", // Subject line
        html: `
        <h3>Kính gửi bạn ${dataSend.patientName}.</h3>
        <p>Cảm ơn bạn đã chọn dịch vụ của chúng tôi. Lịch hẹn của bạn đã được xác nhận thành công. 
        Dưới đây là chi tiết cuộc hẹn của bạn:</p>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Thời gian: ${dataSend.time}</b></div>
    
        <p>Chúng tôi xác nhận thông tin đặt lịch trên của bạn là đúng sự thật. Vui lòng nhấp vào chữ 
        <a href=${dataSend.redirectLink} targe="_blank">XÁC NHẬN</a> 
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    
        <div>Cảm ơn bạn đã tin tưởng lựa chọn dịch vụ của chúng tôi. Chúng tôi rất mong được gặp bạn sớm.</div>
        <div>
        <p><strong> Thông Tin Quan Trọng: </strong></p>
        <ul>
            <li>Vui lòng đến sớm 15 phút để hoàn tất các thủ tục cần thiết.</li>
            <li>Mang theo CMND, thẻ bảo hiểm và các hồ sơ y tế liên quan.</li>
            <li>Nếu bạn cần đổi lịch hoặc hủy cuộc hẹn, vui lòng liên hệ với chúng tôi ít nhất 24 giờ trước giờ hẹn.</li>
        </ul>
        </div>
    
    `, // html body
        // <div></div>
    });
}





// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object


    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


module.exports = {
    sendSimpleEmail
}