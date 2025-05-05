import {BASE_URL} from "./init.js"
const API_BASE = BASE_URL + '/plane';

// Lấy danh sách tất cả máy bay
export async function getAllPlanes() {
    const res = await fetch(API_BASE + '/all_plane');
    return await res.json();
}

// Lấy thông tin 1 máy bay theo ID
export async function getPlaneById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
}

// Thêm máy bay mới
export async function addPlane(plane) {
    await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plane)
    });
}

// Cập nhật máy bay
export async function updatePlane(plane) {
    await fetch(API_BASE, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plane)
    });
}

// Xóa máy bay theo ID
export async function deletePlane(id) {
    await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    });
}
