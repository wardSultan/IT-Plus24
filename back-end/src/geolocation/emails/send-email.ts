import { Injectable } from '@nestjs/common';
import { MailService } from 'src/common/emails/send-email';
import { GeolocationDto } from '../dto/create-geolocation.dto';

@Injectable()
export class SendGeoDetailsEmail {
  constructor(private mailService: MailService) {}

  async sendEmail(userEmail: string, geo: GeolocationDto): Promise<void> {
    const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Geolocation Results</h2>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333;">Here are the geolocation results for the address you provided:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f2f2f2;">
                <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Address</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${geo.address}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
                <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Latitude</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${geo.lat}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Longitude</th>
                <td style="padding: 10px; border: 1px solid #ddd;">${geo.lon}</td>
            </tr>
        </table>

        <p style="font-size: 16px; color: #333;">Thank you for using our service!</p>
        <p style="font-size: 16px; color: #4CAF50; text-align: center;">Geolocation App</p>
    </div>
    `;
    const mailOptions = {
      from: 'fraktfinder@sveasoft.se',
      to: userEmail,
      subject: `Your Geo location details `,

      html: emailTemplate,
    };

    await this.mailService.sendMail(mailOptions);
  }
}
