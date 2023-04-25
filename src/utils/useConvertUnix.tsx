export const ConvertUnixTimeToHour = (unixTime: number) => {
  let dateObj = new Date(unixTime * 1000);
  let hours = dateObj.getUTCHours(); // Get hours from the timestamp
  let minutes = dateObj.getUTCMinutes(); // Get minutes from the timestamp
  let hoursMin =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0'); //combine hours and minutes

  return hoursMin;
};

export const convertUnixTimeToDay = (unixTime: number) => {
  const milliseconds = unixTime * 1000;
  const dateObject = new Date(milliseconds);

  return dateObject.toLocaleString('en-gb', { weekday: 'short' });
};
