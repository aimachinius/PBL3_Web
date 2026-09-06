import {
    createUser,
    updateUser,
    deleteUser,
    findUser
} from '../../../APIs/user.js';

let selectedUser;

export default async function loadUserView() {
    selectedUser = null;

    const addBtn = document.getElementById("add-user-btn");
    const editBtn = document.getElementById("edit-user-btn");
    const removeBtn = document.getElementById("remove-user-btn");
    const searchBtn = document.getElementById("search-btn");
    const searchEmailInput = document.getElementById("search-email");
    const searchUserTypeInput = document.getElementById("search-user-type");

    const formContainer = document.getElementById("user-form-container");
    const userForm = document.getElementById("user-form");

    // Hiển thị form thêm người dùng
    addBtn.addEventListener("click", () => {
        selectedUser = null;
        showAddUserForm();
    });

    // Xử lý tìm kiếm
    searchBtn.addEventListener("click", async () => {
        const users = await findUser(searchEmailInput.value);
        loadUsersTable(users);
    });

    // Hiển thị form chỉnh sửa người dùng
    editBtn.addEventListener("click", () => {
        if (!selectedUser) return;
        showEditUserForm();
        fillEditUserForm(selectedUser);
    });

    // Xóa người dùng
    removeBtn.addEventListener("click", async () => {
        if (!selectedUser) return;
        await deleteUser(selectedUser.idUser);
        selectedUser = null;
        const users = await findUser("");
        loadUsersTable(users);
    });

    // Xử lý submit form
    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = getUserFromForm(e);

        if (selectedUser) {
            await updateUser(selectedUser.idUser, userData);
        } else {
            await createUser(userData);
        }

        formContainer.classList.add("hidden");
        const users = await findUser("");
        loadUsersTable(users);
    });

    // Đóng form khi click ra ngoài
    formContainer.addEventListener("click", (e) => {
        if (e.target === formContainer) {
            formContainer.classList.add("hidden");
        }
    });

    // Load danh sách người dùng ban đầu
    const users = await findUser("");
    loadUsersTable(users);
}

function showAddUserForm() {
    const formTitle = document.getElementById("form-title");
    formTitle.textContent = "Thêm người dùng mới";

    const form = document.getElementById("user-form");
    form.reset();

    const formContainer = document.getElementById("user-form-container");
    formContainer.classList.remove("hidden");
}

function showEditUserForm() {
    const formTitle = document.getElementById("form-title");
    formTitle.textContent = "Chỉnh sửa thông tin người dùng";

    const formContainer = document.getElementById("user-form-container");
    formContainer.classList.remove("hidden");
}

function fillEditUserForm(user) {
    const form = document.getElementById("user-form");
    form.fullName.value = user.fullName || "";
    form.phone.value = user.phone || "";
    form.email.value = user.email || "";
    form.cardNumber.value = user.cardNumber || "";
    form.address.value = user.address || "";
    form.sex.value = user.sex || "";
    form.dayOfBirth.value = user.dayOfBirth ? new Date(user.dayOfBirth).toISOString().split('T')[0] : "";
    form.userType.value = user.userType || "";
}

function getUserFromForm(e) {
    const form = e.target;
    return {
        fullName: form.fullName.value,
        phone: form.phone.value,
        email: form.email.value,
        cardNumber: form.cardNumber.value,
        address: form.address.value,
        sex: form.sex.value,
        dayOfBirth: form.dayOfBirth.value,
        userType: form.userType.value
    };
}

function loadUsersTable(users) {
    const table = document.getElementById("user-table-body");
    table.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement("tr");
        row.className = "hover:bg-amber-100";
        row.setAttribute("user", JSON.stringify(user));

        row.innerHTML = `
            <td class="border px-2 py-1">${user.idUser || ""}</td>
            <td class="border px-2 py-1">${user.fullName || ""}</td>
            <td class="border px-2 py-1">${user.email || ""}</td>
            <td class="border px-2 py-1">${user.phone || ""}</td>
            <td class="border px-2 py-1">${user.cardNumber || ""}</td>
            <td class="border px-2 py-1">${user.address || ""}</td>
            <td class="border px-2 py-1">${user.sex || ""}</td>
            <td class="border px-2 py-1">${user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ""}</td>
            <td class="border px-2 py-1">${user.userType || ""}</td>
        `;

        row.addEventListener("click", () => {
            table.querySelectorAll("tr").forEach(r => {
                r.classList.remove("bg-amber-300");
                r.classList.add("bg-gray-100");
            });
            selectedUser = JSON.parse(row.getAttribute("user"));
            row.classList.remove("bg-gray-100");
            row.classList.add("bg-amber-300");
        });

        table.appendChild(row);
    });
}
