export const getMilesFromMeters = (meters: number) => {
  const distKm = meters * 0.001; //convert meters to KM
  const dist = distKm / 1.609; //converts KM to Miles
  return dist.toFixed(1); //Returns distance in miles to 1 decimal place
};
