import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { sendEmailWithNodemailer } from '../helpers/email';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async sendEmailVerification(email: string) {
    const token = this.jwtService.sign({ email });

    const emailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `YVANIG TOUR | Veuillez confirmer votre email`,
      text: `Merci d'avoir rejoint YVANIG TOUR. Nous avons besoin d'un peu plus d'informations pour compléter votre inscription, y compris une confirmation de votre adresse e-mail.`,
      html: `
      <html>

      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <style amp4email-boilerplate>
          body {
            visibility: hidden
          }
        </style>
      
        <script async src="https://cdn.ampproject.org/v0.js"></script>
      
      
        <style amp-custom>
          .u-row {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 0;
            margin-right: 0;
          }
          
          .u-row .u-col {
            position: relative;
            width: 100%;
            padding-right: 0;
            padding-left: 0;
          }
          
          .u-row .u-col.u-col-100 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          @media (max-width: 767px) {
            .u-row:not(.no-stack) {
              flex-wrap: wrap;
            }
            .u-row:not(.no-stack) .u-col {
              flex: 0 0 100%;
              max-width: 100%;
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
          
          table,
          td {
            color: #000000;
          }
          
          a {
            color: #0000ee;
            text-decoration: underline;
          }
        </style>
      
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                        <img alt="Image" src="https://images.unlayer.com/projects/71375/1648302815498-logo.png" style="width: 100px"/>
                                      </td>
                                    </tr>
                                  </table>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #008080;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                        <amp-img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" width="335" height="93" layout="intrinsic" style="width: 26%;max-width: 26%;">
      
                                        </amp-img>
                                      </td>
                                    </tr>
                                  </table>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>Merci de nous avoir rejoint !</strong></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">V&eacute;rifier votre adresse email</span></strong>
                                      </span>
                                    </p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 160%;">Bonjour,<br />Merci d&rsquo;avoir rejoint YVANIG TOUR.</p>
                                    <p style="font-size: 14px; line-height: 160%;">Pour finaliser votre inscription, cliquez sur le lien ci-dessous.</p>
                                    <p style="font-size: 14px; line-height: 160%;">Si vous rencontrez des difficult&eacute;s pour vous connecter &agrave; votre compte, contactez-nous &agrave; yvanig-tour@gmail.com</p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div align="center">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse;  font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://kaymkassai.com" style="height:46px; v-text-anchor:middle; width:214px;" arcsize="8.5%" stroke="f" fillcolor="#ff5f46"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="${this.configService.get(
                                      'WEBSITE_URL',
                                    )}/auth/register/complete/?token=${token}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff5f46; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; ">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">V&eacute;rifier mon email</span></strong>
                                      </span>
                                      </span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Cordialement,</span></p>
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">L'&eacute;quipe YVANIG</span></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #008080;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
      `,
    };

    await sendEmailWithNodemailer(emailData);

    return JSON.stringify({
      success: true,
    });
  }

  async sendPasswordResetEmail(email: string) {
    // check if user exists
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign({ email });

    const emailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `YVANIG TOUR | Réinitialisation de votre mot de passe`,
      text: `Vous recevez cet email car vous avez demandé une réinitialisation de votre mot de passe.`,
      html: `
      <html ⚡4email data-css-strict>

      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <style amp4email-boilerplate>
          body {
            visibility: hidden
          }
        </style>
      
        <script async src="https://cdn.ampproject.org/v0.js"></script>
      
      
        <style amp-custom>
          .u-row {
            display: flex;
            flex-wrap: nowrap;
            margin-left: 0;
            margin-right: 0;
          }
          
          .u-row .u-col {
            position: relative;
            width: 100%;
            padding-right: 0;
            padding-left: 0;
          }
          
          .u-row .u-col.u-col-100 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          @media (max-width: 767px) {
            .u-row:not(.no-stack) {
              flex-wrap: wrap;
            }
            .u-row:not(.no-stack) .u-col {
              flex: 0 0 100%;
              max-width: 100%;
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
          
          table,
          td {
            color: #000000;
          }
          
          a {
            color: #0000ee;
            text-decoration: underline;
          }
        </style>
      
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">View Email in Browser</span></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                        <amp-img alt="Image" src="https://images.unlayer.com/projects/71375/1648302815498-logo.png" width="2000" height="1500" layout="intrinsic" style="width: 32%;max-width: 32%;">
      
                                        </amp-img>
                                      </td>
                                    </tr>
                                  </table>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #008080;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                        <amp-img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" width="335" height="93" layout="intrinsic" style="width: 26%;max-width: 26%;">
      
                                        </amp-img>
                                      </td>
                                    </tr>
                                  </table>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>Merci de nous avoir rejoint !</strong></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Réinitialiser votre mot de passe</span></strong>
                                      </span>
                                    </p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 160%;">Bonjour,<br />Nous avons reçu votre demande de reinitialisation de mot de passe.</p>
                                    <p style="font-size: 14px; line-height: 160%;">Pour finaliser votre demande, cliquez sur le lien ci-dessous.</p>
                                    <p style="font-size: 14px; line-height: 160%;">Si vous rencontrez des difficult&eacute;s pour vous connecter &agrave; votre compte, contactez-nous &agrave; yvanig-tour@gmail.com</p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div align="center">
                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse;  font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://kaymkassai.com" style="height:46px; v-text-anchor:middle; width:214px;" arcsize="8.5%" stroke="f" fillcolor="#ff5f46"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="${this.configService.get(
                                      'WEBSITE_URL',
                                    )}/auth/password/reset/?token=${token}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff5f46; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; ">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">V&eacute;rifier mon email</span></strong>
                                      </span>
                                      </span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
      
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Cordialement,</span></p>
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">L'&eacute;quipe YVANIG</span></p>
                                  </div>
      
                                </td>
                              </tr>
                            </tbody>
                          </table>
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <div style="padding: 0px;">
                  <div style="max-width: 600px;margin: 0 auto;background-color: #008080;">
                    <div class="u-row">
      
                      <div class="u-col u-col-100">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
      
                        </div>
                      </div>
      
                    </div>
                  </div>
                </div>
      
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
      `,
    };

    await sendEmailWithNodemailer(emailData);

    return JSON.stringify({
      success: true,
    });
  }

  async register(data: CreateUserDto) {
    // check if email has been verified
    let decodedToken;

    try {
      decodedToken = await this.jwtService.verify(data.token);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }

    // extra check just in case
    if (!decodedToken && !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }

    // check if user already exists
    const users = await this.usersService.find(decodedToken.email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash the user's password

    // 1- Generate a salt
    const salt = randomBytes(8).toString('hex');
    // 2- Generate a password hash
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    // 3- Join the hash and the salt
    const result = salt + '.' + hash.toString('hex');
    // 4- Create a new user and save it to the database

    const userData = {
      ...data,
      email: decodedToken.email,
      is_email_verified: true,
      password: result,
    };

    delete userData.token;

    try {
      const user = await this.usersService.create(userData);
      return user;
    } catch (err) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return user;
  }

  async passwordReset(token: string, newPassword: string): Promise<User> {
    let decodedToken: any;

    try {
      decodedToken = await this.jwtService.verify(token);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }

    // extra check just in case
    if (!decodedToken && !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }

    const [user] = await this.usersService.find(decodedToken.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 1- Generate a salt
    const salt = randomBytes(8).toString('hex');
    // 2- Generate a password hash
    const hash = (await scrypt(newPassword, salt, 32)) as Buffer;
    // 3- Join the hash and the salt
    const result = salt + '.' + hash.toString('hex');

    // modify user's password
    try {
      const updatedUser = await this.usersService.update(user.id, {
        password: result,
      });

      return updatedUser;
    } catch (err) {
      throw new BadRequestException('Failed to update password of the user');
    }
  }
}
