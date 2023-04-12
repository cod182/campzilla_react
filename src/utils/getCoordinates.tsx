const getCoordinates = async (query: string) => {
  const hereApi = process.env.REACT_APP_HERE_API;

  const url =
    'https://geocode.search.hereapi.com/v1/geocode?q=' +
    query +
    '&in=countryCode:GBR&apiKey=' +
    hereApi;

  let data = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There has been a problem, search term invalid:', error);
    });

  return getCoordsFromResponse(data);
};

export default getCoordinates;

export const getCoordsFromResponse = (data: any) => {
  let searchLatLng = { latitude: 0, longitude: 0 };

  const lat = data.items[0].position.lat; //set lat from the data item
  const lng = data.items[0].position.lng; //set lng from the data item

  searchLatLng = { latitude: lat, longitude: lng }; //push the lat into searchLatLng

  return searchLatLng;
};
