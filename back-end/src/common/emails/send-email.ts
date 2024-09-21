import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: 'fraktfinder@sveasoft.se',
        pass: 'ward_0000',
      },
      tls: {
        rejectUnauthorized: false,
      },
      timeout: 60000,
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(options);
      console.log('Email sent: ', info.response);
    } catch (error) {
      if (error.code == 'EENVELOPE') {
        throw new BadRequestException(
          `Mailbox : ${options.to} does not exist.`,
        );
      }
    }
  }
}
