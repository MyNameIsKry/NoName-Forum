import { createTransport } from "nodemailer";
import envConfig from "../config";

const trasnporter = createTransport({
    service: "Gmail",
    auth: {
        user: envConfig?.GMAIL_USER,
        pass: envConfig?.PASS_GMAIL_USER
    }
})

export const sendVerificationCode = async (emailToSend: string, code: string): Promise<void> => {
    try {
        const mailOptions = {
            from: envConfig?.GMAIL_USER,
            to: emailToSend,
            subject: 'Mã xác nhận đăng ký tài khoản',
            html: `<p>Mã xác nhận của bạn là: <strong>${code}</strong></p>`,
        };

        trasnporter.sendMail(mailOptions, (err, info) => {
            if(err)
                return console.error(err);
            console.log(info);
        })
    } catch(err) {
        console.log(err);
    }
}