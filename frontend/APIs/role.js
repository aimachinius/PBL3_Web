// role.js
import { BASE_URL } from "./init.js";

const API_BASE = BASE_URL + '/role';

// Lấy danh sách tất cả role
export async function getAllRoles() {
    const res = await fetch(API_BASE);
    return await res.json();
}

// Lấy thông tin 1 role theo ID
export async function getRoleById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
}

// Thêm role mới
export async function addRole(role) {
    await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role)
    });
}

// Cập nhật role
export async function updateRole(id, role) {
    await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role)
    });
}

// Xóa role theo ID
export async function deleteRole(id) {
    await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    });
}

// Lấy tất cả permission (dạng DTO)
export async function getAllPermissions() {
    const res = await fetch(`${API_BASE}/permissions`);
    return await res.json();
}
