import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geo } from './entities/geolocation.entity';
import { MailServiceModule } from 'src/common/emails/invite-user.module';
import { SendGeoDetailsEmail } from './emails/send-email';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Geo]),
    MailServiceModule,
  ],
  controllers: [GeolocationController],
  providers: [GeolocationService, SendGeoDetailsEmail],
})
export class GeolocationModule {}
