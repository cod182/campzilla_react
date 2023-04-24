export const useConvertUnixTimeToHour = (unix: number) => {
  let dateObj = new Date(unix * 1000);
  let hours = dateObj.getUTCHours(); // Get hours from the timestamp
  let minutes = dateObj.getUTCMinutes(); // Get minutes from the timestamp
  let hoursMin =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0'); //combine hours and minutes

  return hoursMin;
};
