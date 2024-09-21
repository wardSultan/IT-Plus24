import { Injectable } from '@nestjs/common';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Geo } from './entities/geolocation.entity';
import { Repository } from 'typeorm';
import { geoFetch } from 'src/common/geo';
import { SendGeoDetailsEmail } from './emails/send-email';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geo)
    private geoRepository: Repository<Geo>,
    private sendGeoDetailsEmail: SendGeoDetailsEmail,
  ) {}

  async create(createGeolocationDto: CreateGeolocationDto): Promise<any> {
    const { address, email } = createGeolocationDto;

    const geoExist = await this.geoExist(address);

    if (geoExist) {
      if (email) {
        await this.sendGeoDetailsEmail.sendEmail(email, geoExist);
      }
      return geoExist;
    } else {
      const myGeo = await geoFetch(address);

      const newGeo = this.geoRepository.create(myGeo);

      if (email) {
        await this.sendGeoDetailsEmail.sendEmail(email, myGeo);
      }

      return await this.geoRepository.save(newGeo);
    }
  }

  async geoExist(address: string) {
    return await this.geoRepository.findOne({ where: { address: address } });
  }
}
