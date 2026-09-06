import { BASE_URL } from "./init.js";
import axios from 'axios';

const API_BASE = BASE_URL + '/user';

// Cập nhật thông tin người dùng theo ID
export async function updateUser(id, user) {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, user, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Tạo người dùng mới
export async function createUser(user) {
    try {
        const response = await axios.post(`${API_BASE}/create`, user, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Tìm kiếm người dùng theo email
export async function findUser(email) {
    try {
        const response = await axios.get(`${API_BASE}/find_user`, {
            params: { email },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Xóa người dùng theo ID 
export async function deleteUser(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
