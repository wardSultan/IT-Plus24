import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geo } from './entities/geolocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geo])],
  controllers: [GeolocationController],
  providers: [GeolocationService],
})
export class GeolocationModule {}
