import axios from "axios";

export function convertLocationToLatLong(location) {
  return axios
    .get(`http://postcodes.io/postcodes/${location}`)
    .then(({ data }) => {
      const longLatData = {
        area: data.result.admin_ward,
        longitude: data.result.longitude,
        latitude: data.result.latitude,
      };
      return { longLatData };
    })
    .catch((err) => {
      console.log(err, "<<< axios error");
    });
}
