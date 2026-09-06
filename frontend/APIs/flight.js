import { BASE_URL } from "./init.js";
import axios from 'axios';

const API_BASE = BASE_URL + '/flight';


// Lấy thông tin 1 chuyến bay theo ID
export async function getFlightById(id) {
  const res = await axios.get(`${API_BASE}/${id}`, {
    withCredentials: true
  });
  return res.data;
}

// Thêm chuyến bay mới
export async function addFlight(flight) {
  await axios.post(API_BASE, flight, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
}

// Cập nhật chuyến bay theo ID
export async function updateFlight(id, flight) {
  await axios.put(`${API_BASE}/${id}`, flight, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
}

// Xoá chuyến bay theo ID
export async function deleteFlight(id) {
  await axios.delete(`${API_BASE}/${id}`, {
    withCredentials: true
  });
}


export async function getAllFlights() {
  const res = await axios.get(API_BASE + '/all_flights', {
    withCredentials: true
  });
  return res.data;
}

export async function getFlightSeatsByFlightId(flightId) {
  const response = await axios.get(API_BASE + '/flight_seats?flightId=' + flightId, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
  return response.data;
}

//tìm tat cac cac chuyen bayy
export async function findFlight(fromLocationId, toLocationId, departureDate) {
  const bEUrl = API_BASE + '/find_flight';
  const params = {
    fromLocationId,
    toLocationId,
    departureDate,
  };

  const queryString = new URLSearchParams(params).toString();
  const finalUrl = `${bEUrl}?${queryString}`;

  try {
    const response = await axios.get(finalUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });

    return response.data;

  } catch (e) {
    console.error('error: of get flight');
  }
  return [];
}

export async function getFlightInformation(flightId) {
  try {
    const response = await axios.get(`${API_BASE}/${flightId}/information`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
