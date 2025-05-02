import {BASE_URL} from "../init.js"
const PATH_FIND_FLIGHT = 'flight/find_flight'


//tìm tat cac cac chuyen bayy
export async function findFlight(fromLocationId,toLocationId,departureDate) {
    const bEUrl = BASE_URL + PATH_FIND_FLIGHT;
  const params = {
    fromLocationId,
    toLocationId,
    departureDate,
  };
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = `${bEUrl}?${queryString}`;

  try {
    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

    }catch(e){
        console.error('error: of get flight');
    }
    return [];
    
}