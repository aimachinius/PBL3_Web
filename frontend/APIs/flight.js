import { BASE_URL } from "./init.js";

const API_BASE = BASE_URL + '/flight';


// Lấy thông tin 1 chuyến bay theo ID
export async function getFlightById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
}

// Thêm chuyến bay mới
export async function addFlight(flight) {
    await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flight)
    });
}

// Cập nhật chuyến bay theo ID
export async function updateFlight(id, flight) {
    await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flight)
    });
}

// Xoá chuyến bay theo ID
export async function deleteFlight(id) {
    await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    });
}


export async function getAllFlights() {
    const res = await fetch(API_BASE + '/all_flights');
    return await res.json();
  }
  
  //tìm tat cac cac chuyen bayy
  export async function findFlight(fromLocationId,toLocationId,departureDate) {
      const bEUrl = API_BASE + '/find_flight' ;
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