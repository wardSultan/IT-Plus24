import axios from 'axios';

export const geoFetch = async (
  address: string,
): Promise<{ lat: string; lon: string }> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const data = await axios
    .get(url)
    .then((response) => {
      const location = response.data[0];
      console.log(`Geolocation: ${location.lat}, ${location.lon}`);
      return location;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  return { lat: data['lat'], lon: data['lon'] };
};
