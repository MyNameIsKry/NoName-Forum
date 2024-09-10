import { createTransport } from "nodemailer";
import envConfig from "../config";

const trasnporter = createTransport({
    service: "Gmail",
    auth: {
        user: envConfig?.GMAIL_USER,
        pass: envConfig?.PASS_GMAIL_USER
    }
})

export const sendVerificationCode = async (emailToSend: string, code: string, username: string): Promise<void> => {
    try {
        const mailOptions = {
            from: envConfig?.GMAIL_USER,
            to: emailToSend,
            subject: 'Mã xác nhận đăng ký tài khoản',
            html: `
                    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                        <div style="margin:50px auto;width:70%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em;color: black;text-decoration:none;font-weight:600">NoName Forum</a>
                            </div>
                            <p style="font-size:1.1em">Xin chào, ${username}</p>
                            <p>Bạn có 1 phút để nhập mã xác thực dưới đây:</p>
                            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            </div>
                        </div>
                    </div>
            `,
        };

        trasnporter.sendMail(mailOptions, (err, info) => {
            if(err)
                return console.error(err);
        })
    } catch(err) {
        console.log(err);
    }
}