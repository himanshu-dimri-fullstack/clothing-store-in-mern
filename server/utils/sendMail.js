import nodemailer from "nodemailer"

import dotenv from "dotenv"

dotenv.config()

const transport = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASS

    }

})

export const sendMail = async (email, otp, subject) => {

    try {
        const info = await transport.sendMail({

            from: process.env.SMTP_USER,

            to: email,

            subject: subject,

            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <title>OTP Verification</title>
            </head>

            <body style="
                margin: 0;
                padding: 0;
                background-color: #f4f7fa;
                font-family: Arial, Helvetica, sans-serif;
            ">

                <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 15px;">
                    <tr>
                        <td align="center">

                            <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                    max-width: 520px;
                                    background: #ffffff;
                                    border-radius: 14px;
                                    overflow: hidden;
                                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                                "
                            >

                                <!-- Header -->
                                <tr>
                                    <td style="
                                        background: #003963;
                                        padding: 28px 30px;
                                        text-align: center;
                                    ">

                                        <h1 style="
                                            margin: 0;
                                            color: #ffffff;
                                            font-size: 25px;
                                            font-weight: 700;
                                        ">
                                            OTP Verification
                                        </h1>

                                        <p style="
                                            margin: 8px 0 0;
                                            color: #dbeafe;
                                            font-size: 14px;
                                        ">
                                            Secure verification for your account
                                        </p>

                                    </td>
                                </tr>


                                <!-- Content -->
                                <tr>
                                    <td style="padding: 35px 30px;">

                                        <p style="
                                            margin: 0 0 15px;
                                            color: #334155;
                                            font-size: 16px;
                                            line-height: 1.6;
                                        ">
                                            Hello,
                                        </p>

                                        <p style="
                                            margin: 0 0 25px;
                                            color: #64748b;
                                            font-size: 15px;
                                            line-height: 1.7;
                                        ">
                                            Use the following One-Time Password (OTP)
                                            to complete your verification.
                                        </p>


                                        <!-- OTP Box -->
                                        <table
                                            width="100%"
                                            cellpadding="0"
                                            cellspacing="0"
                                        >
                                            <tr>
                                                <td align="center">

                                                    <div style="
                                                        display: inline-block;
                                                        background: #eef5f9;
                                                        border: 1px solid #d5e4ed;
                                                        border-radius: 10px;
                                                        padding: 18px 35px;
                                                    ">

                                                        <span style="
                                                            color: #003963;
                                                            font-size: 32px;
                                                            font-weight: 700;
                                                            letter-spacing: 8px;
                                                        ">
                                                            ${otp}
                                                        </span>

                                                    </div>

                                                </td>
                                            </tr>
                                        </table>


                                        <p style="
                                            margin: 25px 0 0;
                                            text-align: center;
                                            color: #64748b;
                                            font-size: 13px;
                                        ">
                                            This OTP is valid for a limited time.
                                        </p>


                                        <div style="
                                            height: 1px;
                                            background: #e2e8f0;
                                            margin: 30px 0;
                                        "></div>


                                        <p style="
                                            margin: 0;
                                            color: #94a3b8;
                                            font-size: 13px;
                                            line-height: 1.6;
                                        ">
                                            If you did not request this verification
                                            code, you can safely ignore this email.
                                            Please do not share your OTP with anyone.
                                        </p>

                                    </td>
                                </tr>


                                <!-- Footer -->
                                <tr>
                                    <td style="
                                        background: #f8fafc;
                                        padding: 20px 30px;
                                        text-align: center;
                                        border-top: 1px solid #e2e8f0;
                                    ">

                                        <p style="
                                            margin: 0;
                                            color: #003963;
                                            font-size: 14px;
                                            font-weight: 600;
                                        ">
                                            Clothing Store
                                        </p>

                                        <p style="
                                            margin: 6px 0 0;
                                            color: #94a3b8;
                                            font-size: 12px;
                                        ">
                                            This is an automated email. Please do not reply.
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
            </html>
        `

        })
        return info
    }
    catch (error) {
        return error
    }

}