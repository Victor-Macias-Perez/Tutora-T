require("dotenv").config();

const { Router } = require("express");
const nodemailer = require("nodemailer");

const router = Router();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASSWORD_SMTP,
    },
});

router.post("/password-reset", async (req, res) => {
    const { email, code } = req.body;

    if (email, code) {
        try {
            const emailToSent = {
                from: '"Tutora-t Support" <tutorate@support.com>',
                to: email,
                subject: "Restablecer contraseña",
                html: `
                <!DOCTYPE html
                    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
                    xmlns:o="urn:schemas-microsoft-com:office:office">

                    <head>
                    <!--[if gte mso 9]>
                        <xml>
                            <o:OfficeDocumentSettings>
                            <o:AllowPNG />
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                        </xml>
                        <![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <!--[if !mso]><!-->
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <!--<![endif]-->
                    <title></title>

                    <style type="text/css">
                        @media only screen and (min-width: 620px) {
                        .u-row {
                            width: 600px !important;
                        }

                        .u-row .u-col {
                            vertical-align: top;
                        }

                        .u-row .u-col-50 {
                            width: 300px !important;
                        }

                        .u-row .u-col-100 {
                            width: 600px !important;
                        }
                        }

                        @media (max-width: 620px) {
                        .u-row-container {
                            max-width: 100% !important;
                            padding-left: 0px !important;
                            padding-right: 0px !important;
                        }

                        .u-row .u-col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }

                        .u-row {
                            width: 100% !important;
                        }

                        .u-col {
                            width: 100% !important;
                        }

                        .u-col>div {
                            margin: 0 auto;
                        }
                        }

                        body {
                        margin: 0;
                        padding: 0;
                        }

                        table,
                        tr,
                        td {
                        vertical-align: top;
                        border-collapse: collapse;
                        }

                        p {
                        margin: 0;
                        }

                        .ie-container table,
                        .mso-container table {
                        table-layout: fixed;
                        }

                        * {
                        line-height: inherit;
                        }

                        a[x-apple-data-detectors="true"] {
                        color: inherit !important;
                        text-decoration: none !important;
                        }

                        table,
                        td {
                        color: #000000;
                        }

                        #u_body a {
                        color: #161a39;
                        text-decoration: underline;
                        }
                    </style>

                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css" />
                    <!--<![endif]-->
                    </head>

                    <body class="clean-body u_body" style="
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: 100%;
                        background-color: #f9f9f9;
                        color: #000000;
                        ">
                    <!--[if IE]><div class="ie-container"><![endif]-->
                    <!--[if mso]><div class="mso-container"><![endif]-->
                    <table id="u_body" style="
                            border-collapse: collapse;
                            table-layout: fixed;
                            border-spacing: 0;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            vertical-align: top;
                            min-width: 320px;
                            margin: 0 auto;
                            background-color: #f9f9f9;
                            width: 100%;
                        " cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr style="vertical-align: top">
                            <td style="
                                word-break: break-word;
                                border-collapse: collapse !important;
                                vertical-align: top;
                                ">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

                            <div class="u-row-container" style="padding: 0px; background-color: #f9f9f9">
                                <div class="u-row" style="
                                    margin: 0 auto;
                                    min-width: 320px;
                                    max-width: 600px;
                                    overflow-wrap: break-word;
                                    word-wrap: break-word;
                                    word-break: break-word;
                                    background-color: #f9f9f9;
                                    ">
                                <div style="
                                        border-collapse: collapse;
                                        display: table;
                                        width: 100%;
                                        height: 100%;
                                        background-color: transparent;
                                    ">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100" style="
                                        max-width: 320px;
                                        min-width: 600px;
                                        display: table-cell;
                                        vertical-align: top;
                                        ">
                                    <div style="height: 100%; width: 100% !important">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div style="
                                            box-sizing: border-box;
                                            height: 100%;
                                            padding: 0px;
                                            border-top: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            "><!--<![endif]-->
                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 15px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="
                                                        border-collapse: collapse;
                                                        table-layout: fixed;
                                                        border-spacing: 0;
                                                        mso-table-lspace: 0pt;
                                                        mso-table-rspace: 0pt;
                                                        vertical-align: top;
                                                        border-top: 1px solid #f9f9f9;
                                                        -ms-text-size-adjust: 100%;
                                                        -webkit-text-size-adjust: 100%;
                                                    ">
                                                    <tbody>
                                                    <tr style="vertical-align: top">
                                                        <td style="
                                                            word-break: break-word;
                                                            border-collapse: collapse !important;
                                                            vertical-align: top;
                                                            font-size: 0px;
                                                            line-height: 0px;
                                                            mso-line-height-rule: exactly;
                                                            -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%;
                                                            ">
                                                        <span>&#160;</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                                </div>
                            </div>

                            <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                <div class="u-row" style="
                                    margin: 0 auto;
                                    min-width: 320px;
                                    max-width: 600px;
                                    overflow-wrap: break-word;
                                    word-wrap: break-word;
                                    word-break: break-word;
                                    background-color: #ffffff;
                                    ">
                                <div style="
                                        border-collapse: collapse;
                                        display: table;
                                        width: 100%;
                                        height: 100%;
                                        background-color: transparent;
                                    ">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100" style="
                                        max-width: 320px;
                                        min-width: 600px;
                                        display: table-cell;
                                        vertical-align: top;
                                        ">
                                    <div style="height: 100%; width: 100% !important">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div style="
                                            box-sizing: border-box;
                                            height: 100%;
                                            padding: 0px;
                                            border-top: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            "><!--<![endif]-->
                                        <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                                </div>
                            </div>

                            <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                <div class="u-row" style="
                                    margin: 0 auto;
                                    min-width: 320px;
                                    max-width: 600px;
                                    overflow-wrap: break-word;
                                    word-wrap: break-word;
                                    word-break: break-word;
                                    background-color: #3fc2ff7d;
                                    ">
                                <div style="
                                        border-collapse: collapse;
                                        display: table;
                                        width: 100%;
                                        height: 100%;
                                        background-color: transparent;
                                    ">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100" style="
                                        max-width: 320px;
                                        min-width: 600px;
                                        display: table-cell;
                                        vertical-align: top;
                                        ">
                                    <div style="height: 100%; width: 100% !important">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div style="
                                            box-sizing: border-box;
                                            height: 100%;
                                            padding: 0px;
                                            border-top: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            "><!--<![endif]-->
                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 35px 10px 10px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                    <td style="
                                                            padding-right: 0px;
                                                            padding-left: 0px;
                                                        " align="center">
                                                        <h1>
                                                        <strong><span style="
                                                                font-size: 24px;
                                                                color: rgb(254, 17, 131);
                                                                ">t</span> </strong><span style="
                                                                font-size: 20px;
                                                                color: rgb(0, 123, 255);
                                                            "><strong>Tutorate</strong></span>
                                                        </h1>
                                                    </td>
                                                    </tr>
                                                </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 0px 10px 30px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <div style="
                                                        line-height: 140%;
                                                        text-align: left;
                                                        word-wrap: break-word;
                                                    ">
                                                    <h1>
                                                    <strong style="font-size: 50px">Olvidaste tu<br /><br /><span
                                                        style="color: rgb(25, 102, 255)">contraseña?</span><span
                                                        style="color: rgb(25, 102, 255)"></span></strong>
                                                    </h1>
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                                </div>
                            </div>

                            <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                <div class="u-row" style="
                                    margin: 0 auto;
                                    min-width: 320px;
                                    max-width: 600px;
                                    overflow-wrap: break-word;
                                    word-wrap: break-word;
                                    word-break: break-word;
                                    background-color: #ffffff;
                                    ">
                                <div style="
                                        border-collapse: collapse;
                                        display: table;
                                        width: 100%;
                                        height: 100%;
                                        background-color: transparent;
                                    ">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100" style="
                                        max-width: 320px;
                                        min-width: 600px;
                                        display: table-cell;
                                        vertical-align: top;
                                        ">
                                    <div style="height: 100%; width: 100% !important">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div style="
                                            box-sizing: border-box;
                                            height: 100%;
                                            padding: 0px;
                                            border-top: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            "><!--<![endif]-->
                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 40px 40px 30px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <div style="
                                                        line-height: 140%;
                                                        text-align: left;
                                                        word-wrap: break-word;
                                                    ">
                                                    <p>
                                                    <span style="font-size: 18px"><strong><strong><span
                                                            style="color: rgb(78, 72, 224)"><span style="color: rgb(25, 102, 255)"><span
                                                                style="font-size: 20px"><span style="color: rgb(0, 0, 0)">Hola,</span>
                                                                usuario!</span></span></span></strong></strong></span>
                                                    </p>
                                                    <p>
                                                    Todos olvidamos nuestra contraseña a veces. No se preocupe, 
                                                    tenemos un código para restablecer su contraseña:
                                                    <strong>Este código solo es válido durante los próximos 5 minutos.</strong>
                                                    </p>
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 0px 40px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <!--[if mso
                                                    ]><style>
                                                        .v-button {
                                                        background: transparent !important;
                                                        }
                                                    </style><!
                                                    [endif]-->
                                                <div align="left">
                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:51px; v-text-anchor:middle; width:205px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]-->
                                                    <p style="text-align: center">
                                                    <span style="font-size: 35px"><strong><strong><span
                                                            style="color: rgb(78, 72, 224)"><span style="color: rgb(25, 102, 255)">${code}</span></span></strong></strong></span><br />
                                                    </p>
                                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                            width="100%" border="0">
                                            <tbody>
                                            <tr>
                                                <td style="
                                                    overflow-wrap: break-word;
                                                    word-break: break-word;
                                                    padding: 40px 40px 30px;
                                                    font-family: 'Lato', sans-serif;
                                                    " align="left">
                                                <div style="
                                                        line-height: 140%;
                                                        text-align: left;
                                                        word-wrap: break-word;
                                                    ">
                                                    <br><br>
                                                    <h2><strong>Estamos aquí para ayudarle</strong></h2>
                                                    <p>Si tiene alguna pregunta o desea más información, envíenos un mensaje a <span
                                                        style="color: rgb(25, 102, 255);"><u>tutorate@support.com</u></span>.</p>
                                                    <p>-&nbsp;Equipo de Tutora-t</p>
                                                </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </body>

                    </html>
                `,
            };

            await transporter.sendMail(emailToSent, (error, info) => {
                if (error) res.status(500).json(error);
                else res.status(200).send("email to reset password was sent");

                transporter.close();
            });
        } catch (error) {
            res.status(500).json(error);
        }
    } else res.status(500).send("You need to add a information to sent a reset password email");
});

router.post("/verify-email", async (req, res) => {
    const { email, name } = req.body;

    if (email, name) {
        try {
            const emailToSent = {
                from: '"Tutora-t Support" <tutorate@support.com>',
                to: email,
                subject: "Verificación de correo electrónico",
                html: `
                        <!DOCTYPE html
                            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
                            xmlns:o="urn:schemas-microsoft-com:office:office">
        
                            <head>
                            <!--[if gte mso 9]>
                                <xml>
                                    <o:OfficeDocumentSettings>
                                    <o:AllowPNG />
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                    </o:OfficeDocumentSettings>
                                </xml>
                                <![endif]-->
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <meta name="x-apple-disable-message-reformatting" />
                            <!--[if !mso]><!-->
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                            <!--<![endif]-->
                            <title></title>
        
                            <style type="text/css">
                                @media only screen and (min-width: 620px) {
                                .u-row {
                                    width: 600px !important;
                                }
        
                                .u-row .u-col {
                                    vertical-align: top;
                                }
        
                                .u-row .u-col-50 {
                                    width: 300px !important;
                                }
        
                                .u-row .u-col-100 {
                                    width: 600px !important;
                                }
                                }
        
                                @media (max-width: 620px) {
                                .u-row-container {
                                    max-width: 100% !important;
                                    padding-left: 0px !important;
                                    padding-right: 0px !important;
                                }
        
                                .u-row .u-col {
                                    min-width: 320px !important;
                                    max-width: 100% !important;
                                    display: block !important;
                                }
        
                                .u-row {
                                    width: 100% !important;
                                }
        
                                .u-col {
                                    width: 100% !important;
                                }
        
                                .u-col>div {
                                    margin: 0 auto;
                                }
                                }
        
                                body {
                                margin: 0;
                                padding: 0;
                                }
        
                                table,
                                tr,
                                td {
                                vertical-align: top;
                                border-collapse: collapse;
                                }
        
                                p {
                                margin: 0;
                                }
        
                                .ie-container table,
                                .mso-container table {
                                table-layout: fixed;
                                }
        
                                * {
                                line-height: inherit;
                                }
        
                                a[x-apple-data-detectors="true"] {
                                color: inherit !important;
                                text-decoration: none !important;
                                }
        
                                table,
                                td {
                                color: #000000;
                                }
        
                                #u_body a {
                                color: #161a39;
                                text-decoration: underline;
                                }
                            </style>
        
                            <!--[if !mso]><!-->
                            <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css" />
                            <!--<![endif]-->
                            </head>
        
                            <body class="clean-body u_body" style="
                                margin: 0;
                                padding: 0;
                                -webkit-text-size-adjust: 100%;
                                background-color: #f9f9f9;
                                color: #000000;
                                ">
                            <!--[if IE]><div class="ie-container"><![endif]-->
                            <!--[if mso]><div class="mso-container"><![endif]-->
                            <table id="u_body" style="
                                    border-collapse: collapse;
                                    table-layout: fixed;
                                    border-spacing: 0;
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    vertical-align: top;
                                    min-width: 320px;
                                    margin: 0 auto;
                                    background-color: #f9f9f9;
                                    width: 100%;
                                " cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr style="vertical-align: top">
                                    <td style="
                                        word-break: break-word;
                                        border-collapse: collapse !important;
                                        vertical-align: top;
                                        ">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
        
                                    <div class="u-row-container" style="padding: 0px; background-color: #f9f9f9">
                                        <div class="u-row" style="
                                            margin: 0 auto;
                                            min-width: 320px;
                                            max-width: 600px;
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                            word-break: break-word;
                                            background-color: #f9f9f9;
                                            ">
                                        <div style="
                                                border-collapse: collapse;
                                                display: table;
                                                width: 100%;
                                                height: 100%;
                                                background-color: transparent;
                                            ">
                                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
        
                                            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="u-col u-col-100" style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                                ">
                                            <div style="height: 100%; width: 100% !important">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="
                                                    box-sizing: border-box;
                                                    height: 100%;
                                                    padding: 0px;
                                                    border-top: 0px solid transparent;
                                                    border-left: 0px solid transparent;
                                                    border-right: 0px solid transparent;
                                                    border-bottom: 0px solid transparent;
                                                    "><!--<![endif]-->
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 15px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                            style="
                                                                border-collapse: collapse;
                                                                table-layout: fixed;
                                                                border-spacing: 0;
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                                vertical-align: top;
                                                                border-top: 1px solid #f9f9f9;
                                                                -ms-text-size-adjust: 100%;
                                                                -webkit-text-size-adjust: 100%;
                                                            ">
                                                            <tbody>
                                                            <tr style="vertical-align: top">
                                                                <td style="
                                                                    word-break: break-word;
                                                                    border-collapse: collapse !important;
                                                                    vertical-align: top;
                                                                    font-size: 0px;
                                                                    line-height: 0px;
                                                                    mso-line-height-rule: exactly;
                                                                    -ms-text-size-adjust: 100%;
                                                                    -webkit-text-size-adjust: 100%;
                                                                    ">
                                                                <span>&#160;</span>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                            </div>
                                            <!--[if (mso)|(IE)]></td><![endif]-->
                                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                        </div>
                                    </div>
        
                                    <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                        <div class="u-row" style="
                                            margin: 0 auto;
                                            min-width: 320px;
                                            max-width: 600px;
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                            word-break: break-word;
                                            background-color: #ffffff;
                                            ">
                                        <div style="
                                                border-collapse: collapse;
                                                display: table;
                                                width: 100%;
                                                height: 100%;
                                                background-color: transparent;
                                            ">
                                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                                            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="u-col u-col-100" style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                                ">
                                            <div style="height: 100%; width: 100% !important">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="
                                                    box-sizing: border-box;
                                                    height: 100%;
                                                    padding: 0px;
                                                    border-top: 0px solid transparent;
                                                    border-left: 0px solid transparent;
                                                    border-right: 0px solid transparent;
                                                    border-bottom: 0px solid transparent;
                                                    "><!--<![endif]-->
                                                <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                            </div>
                                            <!--[if (mso)|(IE)]></td><![endif]-->
                                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                        </div>
                                    </div>
        
                                    <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                        <div class="u-row" style="
                                            margin: 0 auto;
                                            min-width: 320px;
                                            max-width: 600px;
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                            word-break: break-word;
                                            background-color: #3fc2ff7d;
                                            ">
                                        <div style="
                                                border-collapse: collapse;
                                                display: table;
                                                width: 100%;
                                                height: 100%;
                                                background-color: transparent;
                                            ">
                                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
        
                                            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="u-col u-col-100" style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                                ">
                                            <div style="height: 100%; width: 100% !important">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="
                                                    box-sizing: border-box;
                                                    height: 100%;
                                                    padding: 0px;
                                                    border-top: 0px solid transparent;
                                                    border-left: 0px solid transparent;
                                                    border-right: 0px solid transparent;
                                                    border-bottom: 0px solid transparent;
                                                    "><!--<![endif]-->
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 35px 10px 10px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                            <td style="
                                                                    padding-right: 0px;
                                                                    padding-left: 0px;
                                                                " align="center">
                                                                <h1>
                                                                <strong><span style="
                                                                        font-size: 24px;
                                                                        color: rgb(254, 17, 131);
                                                                        ">t</span> </strong><span style="
                                                                        font-size: 20px;
                                                                        color: rgb(0, 123, 255);
                                                                    "><strong>Tutorate</strong></span>
                                                                </h1>
                                                            </td>
                                                            </tr>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 0px 10px 30px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <div style="
                                                                line-height: 140%;
                                                                text-align: left;
                                                                word-wrap: break-word;
                                                            ">
                                                            <h1>
                                                            <strong style="font-size: 50px">Verificación de<br /><br /><span
                                                                style="color: rgb(25, 102, 255)">correo electrónico</span><span
                                                                style="color: rgb(25, 102, 255)"></span></strong>
                                                            </h1>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                            </div>
                                            <!--[if (mso)|(IE)]></td><![endif]-->
                                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                        </div>
                                    </div>
        
                                    <div class="u-row-container" style="padding: 0px; background-color: transparent">
                                        <div class="u-row" style="
                                            margin: 0 auto;
                                            min-width: 320px;
                                            max-width: 600px;
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                            word-break: break-word;
                                            background-color: #ffffff;
                                            ">
                                        <div style="
                                                border-collapse: collapse;
                                                display: table;
                                                width: 100%;
                                                height: 100%;
                                                background-color: transparent;
                                            ">
                                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
                                            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                            <div class="u-col u-col-100" style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                                ">
                                            <div style="height: 100%; width: 100% !important">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="
                                                    box-sizing: border-box;
                                                    height: 100%;
                                                    padding: 0px;
                                                    border-top: 0px solid transparent;
                                                    border-left: 0px solid transparent;
                                                    border-right: 0px solid transparent;
                                                    border-bottom: 0px solid transparent;
                                                    "><!--<![endif]-->
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 40px 40px 30px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <div style="
                                                                line-height: 140%;
                                                                text-align: left;
                                                                word-wrap: break-word;
                                                            ">
                                                            <p>
                                                            <span style="font-size: 18px"><strong><strong><span
                                                                    style="color: rgb(78, 72, 224)"><span style="color: rgb(25, 102, 255)"><span
                                                                        style="font-size: 20px"><span style="color: rgb(0, 0, 0)">Hola,</span>
                                                                        ${name}!</span></span></span></strong></strong></span>
                                                            </p>
                                                            <p>
                                                            Casi estás listo para empezar a disfrutar de Tutora-t. Simplemente haz clic en el enlace de abajo para verificar tu dirección de correo electrónico y empezar.
                                                            <strong>El enlace expira en 48 horas</strong>
                                                            </p>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 0px 40px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <!--[if mso
                                                            ]><style>
                                                                .v-button {
                                                                background: transparent !important;
                                                                }
                                                            </style><!
                                                            [endif]-->
                                                        <div align="left">
                                                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:51px; v-text-anchor:middle; width:205px;" arcsize="2%"  stroke="f" fillcolor="#1492e6"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]-->
                                                            <a href="${process.env.TUTORA_T_APP}/verification/true" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #1492e6; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Verificar mi dirección de correo electrónico</span></span>
    </a>
                                                            <p style="text-align: center; color: rgb(25, 102, 255)">
                                                            <!--[if mso]></center></v:roundrect><![endif]-->
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <table style="font-family: 'Lato', sans-serif" role="presentation" cellpadding="0" cellspacing="0"
                                                    width="100%" border="0">
                                                    <tbody>
                                                    <tr>
                                                        <td style="
                                                            overflow-wrap: break-word;
                                                            word-break: break-word;
                                                            padding: 40px 40px 30px;
                                                            font-family: 'Lato', sans-serif;
                                                            " align="left">
                                                        <div style="
                                                                line-height: 140%;
                                                                text-align: left;
                                                                word-wrap: break-word;
                                                            ">
                                                            <br>
                                                            <h2><strong>Estamos aquí para ayudarle</strong></h2>
                                                            <p>Si tiene alguna pregunta o desea más información, envíenos un mensaje a <span
                                                                style="color: rgb(25, 102, 255);"><u>tutorate@support.com</u></span>.</p>
                                                            <p>-&nbsp;Equipo de Tutora-t</p>
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
        
                                                <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </body>
        
                            </html>
                        `,
            };

            transporter.sendMail(emailToSent, (error, info) => {
                if (error) res.status(500).json(error);
                else res.status(200).send("email to verification was sent");

                transporter.close();
            });

        } catch (error) {
            res.status(500).json(error);
        }
    } else res.status(500).send("You need to add a information to sent a validation email");
});

module.exports = router;
