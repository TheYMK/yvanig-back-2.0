import {
  BadRequestException,
  Injectable,
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

  async sendEmailVerification(email: string, isRegistration: boolean) {
    const token = this.jwtService.sign({ email });

    let subject = `YVANIG TOUR | Veuillez confirmer votre email`;
    let registrationMetaText = `Merci d'avoir rejoint YVANIG TOUR. Nous avons besoin d'un peu plus d'informations pour compléter votre inscription, y compris une confirmation de votre adresse e-mail.`;
    let simpleValidationMetaText = `Une confirmation de votre adresse e-mail est requise avoir accès aux fonctionnalités de YVANIG TOUR. Veuillez confirmer votre adresse e-mail en cliquant sur le lien ci-dessous.`;

    let registrationLink = `${this.configService.get(
      'WEBSITE_URL',
    )}/auth/register/complete?token=${token}`;

    let simpleValidationLink = `${this.configService.get(
      'WEBSITE_URL',
    )}/auth/email/validate?token=${token}`;

    const emailData = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: isRegistration ? registrationMetaText : simpleValidationMetaText,
      html: `
      <!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          @media (max-width:850px) {
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .column .border {
              display: none;
            }
      
            table {
              table-layout: fixed !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:10px;">
                                      <div align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-left:15px;padding-right:15px;width:100%;">
                                      <div align="center" style="line-height:10px"><a href="${this.configService.get(
                                        'WEBSITE_URL',
                                      )}" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-10t6qah1e6rc/logo.png" style="display: block; height: auto; border: 0; width: 208px; max-width: 100%;" width="208" alt="Yvanig Logo" title="Yvanig Tour"></a></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #008080;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 10px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="color: #ffffff;">Confirmer votre adresse email</span></h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                      <div align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td>
                                      <h1 style="margin: 0; color: #2b2d2d; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 43px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Merci de nous avoir rejoint</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 21px; color: #6f7077; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                          <p style="margin: 0;">Pour finaliser votre inscription, cliquez sur le bouton ci-dessous.</p>
                                          <p style="margin: 0; mso-line-height-alt: 21px;">&nbsp;</p>
                                          <p style="margin: 0;">Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous à</p>
                                          <p style="margin: 0;"><a href="mailto:yvanig-tour@gmail.com?subject=Je%20rencontre%20des%20probl%C3%A8mes%20de%20connexion" target="_blank" title="yvanig-tour@gmail.com" style="text-decoration: underline; color: #8a3b8f;" rel="noopener">yvanig-tour@gmail.com</a></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;text-align:left;">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${
                                        isRegistration
                                          ? registrationLink
                                          : simpleValidationLink
                                      }" style="height:42px;width:243px;v-text-anchor:middle;" arcsize="120%" stroke="false" fillcolor="#ff5f46"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${
        isRegistration ? registrationLink : simpleValidationLink
      }" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff5f46;border-radius:50px;width:auto;border-top:0px solid #2B2D2D;border-right:0px solid #2B2D2D;border-bottom:0px solid #2B2D2D;border-left:0px solid #2B2D2D;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Je confirme mon adresse email</strong></span></span></a>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                      <div align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/784379_768130/Pink%20Beige%20White%20Email%20Marketing%20Cheatsheet%20Facebook%20Post%20%281%29.png" style="display: block; height: auto; border: 0; width: 415px; max-width: 100%;" width="415" alt="Services Company" title="Services Company"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;">
                                        <p style="margin: 0;">Ou cliquez sur ce lien: <a href="${
                                          isRegistration
                                            ? registrationLink
                                            : simpleValidationLink
                                        }" target="_blank" style="text-decoration: underline; color: #8a3b8f;" rel="noopener">Confirmer mon adresse email</a></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td style="vertical-align: middle; text-align: center;">
                                            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                            <!--[if !vml]><!-->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
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
      <!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          @media (max-width:850px) {
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .column .border {
              display: none;
            }
      
            table {
              table-layout: fixed !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:10px;">
                                      <div align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-left:15px;padding-right:15px;width:100%;">
                                      <div align="center" style="line-height:10px"><a href="${this.configService.get(
                                        'WEBSITE_URL',
                                      )}" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-10t6qah1e6rc/logo.png" style="display: block; height: auto; border: 0; width: 208px; max-width: 100%;" width="208" alt="Yvanig Logo" title="Yvanig Tour"></a></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #008080;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 10px; padding-bottom: 10px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder" style="color: #ffffff;">Réinitialiser votre mot de passe</span></h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="divider_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:25px;">
                                      <div align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td>
                                      <h1 style="margin: 0; color: #2b2d2d; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 43px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><strong>Mot de passe oublié?</strong></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div class="txtTinyMce-wrapper" style="font-size: 14px; mso-line-height-alt: 21px; color: #6f7077; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                          <p style="margin: 0;">Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous.</p>
                                          <p style="margin: 0; mso-line-height-alt: 21px;">&nbsp;</p>
                                          <p style="margin: 0;">Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous à</p>
                                          <p style="margin: 0;"><a href="mailto:yvanig-tour@gmail.com?subject=Je%20rencontre%20des%20probl%C3%A8mes%20de%20connexion" target="_blank" title="yvanig-tour@gmail.com" style="text-decoration: underline; color: #8a3b8f;" rel="noopener">yvanig-tour@gmail.com</a></p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;text-align:left;">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${this.configService.get(
                                        'WEBSITE_URL',
                                      )}/auth/password/reset?token=${token}" style="height:42px;width:243px;v-text-anchor:middle;" arcsize="120%" stroke="false" fillcolor="#ff5f46"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${this.configService.get(
        'WEBSITE_URL',
      )}/auth/password/reset?token=${token}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff5f46;border-radius:50px;width:auto;border-top:0px solid #2B2D2D;border-right:0px solid #2B2D2D;border-bottom:0px solid #2B2D2D;border-left:0px solid #2B2D2D;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Je réinitialise mon mot de passe</strong></span></span></a>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                      <div align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/784379_768130/Pink%20Beige%20White%20Email%20Marketing%20Cheatsheet%20Facebook%20Post%20%281%29.png" style="display: block; height: auto; border: 0; width: 415px; max-width: 100%;" width="415" alt="Services Company" title="Services Company"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td>
                                      <div style="color:#393d47;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;">
                                        <p style="margin: 0;">Ou cliquez sur ce lien: <a href="${this.configService.get(
                                          'WEBSITE_URL',
                                        )}/auth/password/reset?token=${token}" target="_blank" style="text-decoration: underline; color: #8a3b8f;" rel="noopener">Réinitialiser mon mot de passe</a></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 830px;" width="830">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td style="vertical-align: middle; text-align: center;">
                                            <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                            <!--[if !vml]><!-->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
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
      const updatedUser = await this.usersService.update(user, {
        password: result,
      });

      return updatedUser;
    } catch (err) {
      throw new BadRequestException('Failed to update password of the user');
    }
  }

  async verifyEmail(user: User, token: string) {
    // check if email has been verified
    let decodedToken;

    try {
      decodedToken = await this.jwtService.verify(token);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }

    // extra check just in case
    if (!decodedToken && !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }

    // check if user already exists
    const [foundUser] = await this.usersService.find(decodedToken.email);

    try {
      const updatedUser = await this.usersService.update(foundUser, {
        is_email_verified: true,
      });

      return updatedUser;
    } catch (err) {
      throw new BadRequestException('Failed to verify email');
    }
  }
}
