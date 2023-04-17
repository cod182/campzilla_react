const hereApiKey = process.env.REACT_APP_HERE_API;

// export const getPositionFromQuery = (query: string) => {
//   const url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&in=countryCode:GBR&apiKey=${hereApiKey}`; //combining the api url with the search term and limiting to GBR

//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       } else {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       return data.items[0];
//     })
//     .catch((error) => {
//       console.error('There has been a problem, search term invalid:', error);
//     });
// };

export async function fetchPosition(query: string): Promise<any> {
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&in=countryCode:GBR&apiKey=${hereApiKey}`; //combining the api url with the search term and limiting to GBR

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
