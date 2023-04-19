const hereApiKey = process.env.REACT_APP_HERE_API;

export async function getResultsInArea({
  lat,
  lng,
  radius,
}: {
  lat: number;
  lng: number;
  radius: number;
}): Promise<any> {
  const keyword = 'campground';
  const url = `https://discover.search.hereapi.com/v1/discover?q=${keyword}&in=circle:${lat},${lng};r=${radius}&limit=100&apiKey=${hereApiKey}`;

  const response = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error('There has been a problem, search term invalid:');
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There has been a problem, search term invalid:', error);
    });

  const data = await response;
  return data;
}
