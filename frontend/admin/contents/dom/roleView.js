import {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole,
    getAllPermissions
} from '../../../APIs/role.js';

let selectedRole = null;

export default async function loadRoleView() {
    selectedRole = null;
    const addBtn = document.getElementById("add-role-btn");
    const editBtn = document.getElementById("edit-role-btn");
    const removeBtn = document.getElementById("remove-role-btn");
    const formContainer = document.getElementById("role-form-container");
    const form = document.getElementById("role-form");

    await populatePermissionsSelect();

    addBtn.addEventListener("click", () => {
        selectedRole = null;
        clearForm();
        showForm("Thêm vai trò");
    });

    editBtn.addEventListener("click", () => {
        if (!selectedRole) return;
        fillForm(selectedRole);
        showForm("Chỉnh sửa vai trò");
    });

    removeBtn.addEventListener("click", async () => {
        if (!selectedRole) return;
        await deleteRole(selectedRole.id);
        selectedRole = null;
        await loadRoleTable();
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const roleData = getRoleFromForm();

        if (selectedRole) {
            await updateRole(selectedRole.id, roleData);
        } else {
            await addRole(roleData);
        }

        selectedRole = null;
        formContainer.classList.add("hidden");
        await loadRoleTable();
    });

    formContainer.addEventListener("click", (e) => {
        if (!form.contains(e.target)) formContainer.classList.add("hidden");
    });

    await loadRoleTable();
}
async function loadRoleTable() {
    const roles = await getAllRoles();
    const table = document.getElementById("role-table-body");
    table.innerHTML = ''; // Xóa dữ liệu cũ trước khi thêm mới

    roles.forEach(role => {
        const row = document.createElement("tr");

      
        
        row.className = "bg-white hover:bg-blue-100";  // Thêm hiệu ứng hover cho hàng
        row.setAttribute("role-data", JSON.stringify(role));

        row.innerHTML = `
            <td class="border px-2 py-1">${role.id}</td>
            <td class="border px-2 py-1">${role.name}</td>
            <td class="border px-2 py-1">
                <div class="relative w-full p-2 bg-gray-100 border border-gray-300 cursor-pointer group">
                    <span class="text-blue-500">Di chuột vào đây để xem chi tiết</span>
                    <div class="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-lg p-4 hidden group-hover:block z-10">
                        <ul class="list-disc list-inside text-sm text-gray-700">
                            ${role.permissions?.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </td>
        `;

        // Xử lý sự kiện click để chọn row
        row.addEventListener("click", () => {
            document.querySelectorAll("tbody tr").forEach(r => r.classList.remove("bg-blue-300"));
            row.classList.add("bg-blue-300");
            selectedRole = JSON.parse(row.getAttribute("role-data"));
        });

        table.appendChild(row);
    });
}


function showForm(title) {
    document.getElementById("form-role-title").textContent = title;
    document.getElementById("role-form-container").classList.remove("hidden");
}

function clearForm() {
    document.getElementById("role-name").value = "";
    [...document.getElementById("role-permissions").options].forEach(o => o.selected = false);
}

function fillForm(role) {
    document.getElementById("role-name").value = role.name;
    const permissionSelect = document.getElementById("role-permissions");
    [...permissionSelect.options].forEach(option => {
        const permId = JSON.parse(option.value).id;
        option.selected = role.permissions.some(p => p.id === permId);
    });
}

function getRoleFromForm() {
    const name = document.getElementById("role-name").value;
    const selectedOptions = [...document.getElementById("role-permissions").selectedOptions];
    const permissions = selectedOptions.map(opt => JSON.parse(opt.value));
    return { name, permissions };
}

async function populatePermissionsSelect() {
    const permissions = await getAllPermissions();
    const select = document.getElementById("role-permissions");
    select.innerHTML = '';
    permissions.forEach(p => {
        const option = document.createElement("option");
        option.value = JSON.stringify(p.name);
        option.textContent = `${p.name} (${p.description})`;
        select.appendChild(option);
    });
}
