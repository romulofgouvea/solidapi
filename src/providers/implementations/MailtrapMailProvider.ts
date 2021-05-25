// é um serviço que a gente utiliza quando nossa aplicação está em desenvolvimento
// para a gente captar os emails

import { IMailProvider, IMessage } from '../IMailProvider';
// nodemailer é usado no node para envio de email
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b46da5240e73cc',
        pass: '84b46267394ac9'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
  // A implementação da funcionalidade de envio de email tá pronta.
  // A implementação tá totalmente desconexa do nosso caso de uso, da implementação do código,
  // da regra de negócio, da lógica, que é nosso useCase.
  // Então a gente tem essa separação, esse desacoplamento do código, o que que é camada de
  // infra, o que que é basicamente que vai tá conectado com ponto externo, que vai tá
  // conectado com uma API, com banco de dados, com a lógica da nossa aplicação mesmo.
  // Ela consegue ser lida sem uma implementação externa, sem depender de serviços externos
}