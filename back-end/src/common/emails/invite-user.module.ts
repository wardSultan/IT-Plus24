import { Module } from '@nestjs/common';
import { MailService } from './send-email';

@Module({
  imports: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailServiceModule {}
