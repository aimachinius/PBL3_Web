import { BASE_URL } from "./init.js"
const LOCATION_CONTROLLER_API = BASE_URL +  '/location';



// lấy hết tất cả các địa điểm
export async function getAllLocation() {
    try {
        const response = await fetch(LOCATION_CONTROLLER_API + '/all_location' , {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
}
