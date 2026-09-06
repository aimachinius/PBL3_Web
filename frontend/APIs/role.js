// role.js
import axios from 'axios';
import { BASE_URL } from "./init.js";

const API_BASE = BASE_URL + '/role';

// Lấy danh sách tất cả role
export async function getAllRoles() {
    try {
        const res = await axios.get(API_BASE, { withCredentials: true });
        return res.data;
    } catch (error) {
        throw error
    }
}

// Lấy thông tin 1 role theo ID
export async function getRoleById(id) {
    try {
        const res = await axios.get(`${API_BASE}/${id}`, { withCredentials: true });
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

// Thêm role mới
export async function addRole(role) {
    try {
        await axios.post(API_BASE, role, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
    } catch (error) {
        throw error;
    }
}

// Cập nhật role
export async function updateRole(id, role) {
    try {
        await axios.put(`${API_BASE}/${id}`, role, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
    } catch (error) {
        throw error;
    }
}

// Xóa role theo ID
export async function deleteRole(id) {
    try {
        await axios.delete(`${API_BASE}/${id}`, {
            withCredentials: true
        });
    } catch (error) {
        throw error;
    }
}

// Lấy tất cả permission (dạng DTO)
export async function getAllPermissions() {
    try {
        const res = await axios.get(`${API_BASE}/permissions`, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
