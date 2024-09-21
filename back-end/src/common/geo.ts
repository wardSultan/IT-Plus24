import { NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GeolocationDto } from 'src/geolocation/dto/create-geolocation.dto';

export const geoFetch = async (address: string): Promise<GeolocationDto> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const data = await axios
    .get(url)
    .then((response) => {
      const location = response.data[0];

      location.lat && location.lon;

      return location;
    })

    .catch((error) => {
      throw new NotFoundException(`Address: ${address} not found`);
    });

  return { address: address, lat: data['lat'], lon: data['lon'] };
};
