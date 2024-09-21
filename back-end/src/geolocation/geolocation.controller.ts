import { Controller, Post, Body } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Post()
  create(@Body() createGeolocationDto: CreateGeolocationDto) {
    return this.geolocationService.create(createGeolocationDto);
  }
}
