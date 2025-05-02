import {BASE_URL} from "../init.js"
const PATH_ALL_LOCATION = 'Shared/getAllLocation'



// lấy hết tất cả các địa điểm
export async function getAllLocation() {
    try {
        const response = await fetch(BASE_URL + PATH_ALL_LOCATION, {
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
