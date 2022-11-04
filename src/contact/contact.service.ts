import { Injectable } from '@nestjs/common';
import { sendEmailWithNodemailer } from 'src/helpers/email';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class ContactService {
  async sendMessage(msgObj: SendMessageDto) {
    const emailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Nouveau message venant du site YVANIG AGENCY',
      text: 'Un message vous a été envoyé à partir du site YVANIG AGENCY',
      html: `
        <h1>Un message vous a été envoyé à partir du site YVANIG AGENCY</h1>
        <br/>
        <br/>
        <strong>Nom et prénom de l'envoyeur: </strong><span>${msgObj.name}</span>
        <br/>
        <strong>Email de l'envoyeur: </strong><span>${msgObj.email}</span>
        <br/>
        <strong>Object du message: </strong><span>${msgObj.subject}</span>
        <br/>
        <strong>Message:</strong>
        <br/>
        ${msgObj.message}
        <br/>
        <hr/>
        <p>Ce message peut contenir de l'information privilégiée ou confidentielle. Si ce message ne vous est pas destiné ou si vous l'avez reçu par erreur, nous vous saurions gré d'en aviser l'expéditeur immédiatement et d'effacer l'original ainsi que tout fichier joint, sans en tirer de copie ni en dévoiler le contenu.</p>
      `,
    };

    await sendEmailWithNodemailer(emailData);

    return JSON.stringify({
      success: true,
    });
  }
}
