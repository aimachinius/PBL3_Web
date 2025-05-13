import {BASE_URL} from "./init.js"
const API_BASE = BASE_URL + '/plane';

// Lấy danh sách tất cả máy bay
export async function getAllPlanes() {
    try {
        const res = await fetch(API_BASE + '/all_plane');
        return await res.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách máy bay:", error);
    }
    return [];
}

// Lấy thông tin 1 máy bay theo ID
export async function getPlaneById(id) {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        return await res.json();
    } catch (error) {
        console.error("Lỗi khi lấy thông tin máy bay:", error);
    }
    return null;
}

// Thêm máy bay mới
export async function addPlane(plane) {
    try {
        await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plane)
        });
    } catch (error) {
        console.error("Lỗi khi thêm máy bay:", error);
    }
}

// Cập nhật máy bay
export async function updatePlane(plane) {
    try {
        await fetch(API_BASE, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plane)
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật máy bay:", error);
    }
}

// Xóa máy bay theo ID
export async function deletePlane(id) {
    try {
        await fetch(`${API_BASE}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Lỗi khi xóa máy bay:", error);
    }
}
