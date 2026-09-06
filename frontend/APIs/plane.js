import {BASE_URL} from "./init.js"
const API_BASE = BASE_URL + '/plane';
import axios from 'axios';

// Lấy danh sách tất cả máy bay
export async function getAllPlanes() {
    try {
        const res = await axios.get(API_BASE + '/all_plane', {
            withCredentials: true
        });
        return res.data;

    } catch (error) {
        throw error;
    }
}

// Lấy thông tin 1 máy bay theo ID
export async function getPlaneById(id) {
    try {
        const res = await axios.get(`${API_BASE}/${id}`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

// Thêm máy bay mới
export async function addPlane(plane) {
    try {
        await axios.post(API_BASE, plane, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
    } catch (error) {
        throw error;
    }
}

// Cập nhật máy bay
export async function updatePlane(plane) {
    try {
        await axios.put(API_BASE, plane, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
    } catch (error) {
        throw error;
    }
}

// Xóa máy bay theo ID
export async function deletePlane(id) {
    try {
       const response = await axios.delete(`${API_BASE}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
