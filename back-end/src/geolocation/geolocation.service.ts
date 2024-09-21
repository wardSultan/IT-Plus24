import { Injectable } from '@nestjs/common';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';
import { UpdateGeolocationDto } from './dto/update-geolocation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Geo } from './entities/geolocation.entity';
import { Repository } from 'typeorm';
import { geoFetch } from 'src/common/geo';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geo)
    private geoRepository: Repository<Geo>,
  ) {}

  async create(createGeolocationDto: CreateGeolocationDto): Promise<Geo> {
    const { address } = createGeolocationDto;
    const geoExist = await this.geoExist(address);
    if (geoExist) {
      return geoExist;
    } else {
      const myGeo = await geoFetch(address);

      const newGeo = this.geoRepository.create({
        address: address,
        lat: myGeo.lat,
        lon: myGeo.lon,
      });
      return await this.geoRepository.save(newGeo);
    }
  }

  async geoExist(address: string) {
    return await this.geoRepository.findOne({ where: { address: address } });
  }
  findAll() {
    return `This action returns all geolocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geolocation`;
  }

  update(id: number, updateGeolocationDto: UpdateGeolocationDto) {
    return `This action updates a #${id} geolocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} geolocation`;
  }
}
