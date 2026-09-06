import {
    getAllAccountByEmail,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
} from '../../../APIs/account.js';
import { getAllRoles } from '../../../APIs/role.js';


let selectedAccount;

export default async function loadAccountView() {
    selectedAccount = null;

    const addBtn = document.getElementById("add-account-btn");
    const editAccountBtn = document.getElementById("edit-account-btn");
    const editUserInfoBtn = document.getElementById("edit-user-info-btn");
    const removeBtn = document.getElementById("remove-account-btn");
    const searchBtn = document.getElementById("search-btn");
    const searchEmailInput = document.getElementById("search-email");
    const searchRoleInput = document.getElementById("search-role");

    const formContainer = document.getElementById("account-form-container");
    const accountForm = document.getElementById("account-form");

    // Lấy danh sách tất cả các role
    const roleOptions = await getAllRoles();
    // Thêm tất cả các role vào select


    try {
        roleOptions.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option.id;
            opt.textContent = option.name;
            searchRoleInput.appendChild(opt);
        });
    } catch (error) {
        console.log("error -----", error);
    }


    // hiển thị form thêm tài khoản
    addBtn.addEventListener("click", () => {
        selectedAccount = null;
        showAddAccountForm(roleOptions);
    });

    searchBtn.addEventListener("click", async () => {
        loadAccountsTable(await getAllAccountByEmail(searchEmailInput.value, searchRoleInput.value));
    });

    // hiển thị form chỉnh sửa tài khoản
    editAccountBtn.addEventListener("click", () => {
        // if (!selectedAccount) return;
        showEditAccountForm(roleOptions);

        fillEditAccountForm(selectedAccount);
    });

    /// test data customer
    // const testDataCustomer = {
    //     username: "jane434434doe@exampkkkkle.com",
    //     password: "password123",
    //     role: { id: 1 },
    //     user: {
    //         fullName: "kuku kuku",
    //         phone: "0914344342345678",
    //         email: "janedoe@exafefemple.com",
    //         cardNumber: "9876434354321098",
    //         address: "456 Another St, Ho Chi Minh",
    //         sex: "FEMALE", 
    //         dayOfBirth: "1992-05-15"
    //     }
    // };

    // await createAccount(testDataCustomer);

    // // end test data customer


    // Xóa tài khoản
    removeBtn.addEventListener("click", async () => {
        if (!selectedAccount) return;
        await deleteAccount(selectedAccount.idAccount);
        selectedAccount = null;
        loadAccountsTable(await getAllAccountByEmail("", ""));
    });

    // Lưu tài khoản


    // Xóa form khi click ngoài


    loadAccountsTable(await getAllAccountByEmail("", ""));
}

function showEditAccountForm(roleOptions) {
    const content = `
            <h2 id="form-title" class="text-2xl font-semibold text-center mb-8"></h2>

            <div class="form-section mb-8">
                <h3 class="text-xl font-medium mb-4">Thông tin tài khoản</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Địa chỉ email</label>
                        <input type="email" id="email" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Mật khẩu</label>
                        <input type="password" id="password" required class="border rounded-lg px-4 py-2" />
                        <small class="mt-1 text-gray-500">Mật khẩu phải có ít nhất 8 ký tự và bao gồm một số và một ký tự đặc biệt</small>
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Xác nhận mật khẩu</label>
                        <input type="password" id="confirm-password" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Vai trò</label>
                        <select id="role" required class="border rounded-lg px-4 py-2">
                            <option value="customerAccount">Tài khoản cho khách hàng</option>
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" id="submit-form-btn" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200">
                Lưu tài khoản
            </button>
    `;
    creatForm(content, async function (container) {
        const roleSelect = container.querySelector('#role');
        roleOptions.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option.id;
            opt.textContent = option.name;
            roleSelect.appendChild(opt);
        });
        const accountForm = container.querySelector('#account-form');
        accountForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const accountData = {
                username: accountForm.email.value,
                password: accountForm.password.value,
                role: accountForm.role.value == 'customerAccount' ? null : { id: accountForm.role.value }
            };
            await updateAccount(selectedAccount.idAccount, accountData);
            container.classList.add("hidden");
            loadAccountsTable(await getAllAccountByEmail("", ""));
        });
    });
}

function showAddAccountForm(roleOptions) {
    const content = `
            <h2 id="form-title" class="text-2xl font-semibold text-center mb-8"></h2>

            <div class="form-section mb-8">
                <h3 class="text-xl font-medium mb-4">Thông tin cá nhân</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Tên</label>
                        <input type="text" id="fullName" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">CCCD</label>
                        <input type="text" id="cccd" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Ngày sinh</label>
                        <input type="date" id="birthdate" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Giới tính</label>
                        <select id="sex" required class="border rounded-lg px-4 py-2">
                            <option value="" disabled selected>Chọn</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section mb-8">
                <h3 class="text-xl font-medium mb-4">Thông tin liên hệ</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Địa chỉ</label>
                        <input type="text" id="address" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Điện thoại di động</label>
                        <input type="tel" id="phone" required class="border rounded-lg px-4 py-2" />
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Địa chỉ email</label>
                        <input type="email" id="email" required class="border rounded-lg px-4 py-2" />
                    </div>
                </div>
            </div>

            <div class="form-section mb-8">
                <h3 class="text-xl font-medium mb-4">Thông tin bảo mật</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Mật khẩu</label>
                        <input type="password" id="password" required class="border rounded-lg px-4 py-2" />
                        <small class="mt-1 text-gray-500">Mật khẩu phải có ít nhất 8 ký tự và bao gồm một số và một ký tự đặc biệt</small>
                    </div>
                    <div class="flex flex-col">
                        <label class="mb-1 font-medium">Xác nhận mật khẩu</label>
                        <input type="password" id="confirm-password" required class="border rounded-lg px-4 py-2" />
                    </div>
                </div>
            </div>

            <div class="form-section mb-8">
                <h3 class="text-xl font-medium mb-4">Vai trò</h3>
                <div class="flex flex-col">
                    <select id="role" required class="border rounded-lg px-4 py-2">
                        <option value="customerAccount">Tài khoản cho khách hàng</option>
                    </select>
                </div>
            </div>

            <button type="submit" id="submit-form-btn" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200">
                Lưu tài khoản
            </button>
    `;
    creatForm(content, async function (container) {
        const roleSelect = container.querySelector('#role');
        roleOptions.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option.id;
            opt.textContent = option.name;
            roleSelect.appendChild(opt);
        });
        const accountForm = container.querySelector('#account-form');
        accountForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const accountData = getAccountFromForm(e);
            await createAccount(accountData);
            container.classList.add("hidden");
            loadAccountsTable(await getAllAccountByEmail("", ""));
        });
    });




}
function creatForm(content, optionFunction) {
    const container = document.getElementById("account-form-container");
    container.innerHTML = `
        <form id="account-form" class="w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl">
            ${content}
        </form>
    `;
    container.classList.remove("hidden");
    container.addEventListener("click", (e) => {
        if (e.target === container) {
            container.classList.add("hidden");
        }
    });
    optionFunction(container);
}




function fillForm(account) {
    const form = document.getElementById("account-form");

    form["email"].value = account.email || "";
    form["password"].value = account.password || "";
    form["role"].value = account?.role?.id || "";
    form["fullName"].value = account?.user?.fullName || "";
    form["phone"].value = account?.user?.phone || "";
    form["cardNumber"].value = account?.user?.cardNumber || "";
    form["address"].value = account?.user?.address || "";
    form["sex"].value = account?.user?.sex || "";
    form["dayOfBirth"].value = account?.user?.dayOfBirth || "";
    form["userType"].value = account?.user?.userType || "";
}
function fillEditAccountForm(account) {
    let valueRole = 'customerAccount';
    if (account.role != null) {
        valueRole = account.role.id;
    }
    const form = document.getElementById("account-form");
    form["email"].value = account.username || "";
    // form["password"].value = account.password || "";
    form["role"].value = valueRole;
}

// Lấy dữ liệu từ form
function getAccountFromForm(e) {
    const f = e.target.elements;
    let role = null;
    if (f["role"].value !== "customerAccount") {
        role = { id: f["role"].value }
    }
    return {
        username: f["email"].value,
        password: f["password"].value,
        role: role,
        user: {
            fullName: f["fullName"].value,
            phone: f["phone"].value,
            email: f["email"].value,
            cardNumber: f["cccd"].value,
            address: f["address"].value,
            sex: f["sex"].value,
            dayOfBirth: f["birthdate"].value,
        }
    };
}

// Load danh sách tài khoản
function loadAccountsTable(accounts) {
    const table = document.getElementById("account-table-body");
    table.innerHTML = '';
    accounts.forEach(account => {
        const row = document.createElement("tr");
        if (account.role != null) {
            row.className = "bg-red-100 hover:bg-amber-100";
        } else {
            row.className = "bg-blue-100 hover:bg-amber-100";
        }
        row.setAttribute("account", JSON.stringify(account));

        row.innerHTML = `
            <td class="border px-2 py-1">${account.idAccount || ""}</td>
            <td class="border px-2 py-1">${account.username || ""}</td>
            <td class="border px-2 py-1">${account.password || ""}</td>
            <td class="border px-2 py-1">${account.createdAt || ""}</td>
            <td class="border px-2 py-1">${account?.role?.name || "Khách hàng"}</td>
        `;

        row.addEventListener("click", () => {
            table.querySelectorAll("tr").forEach(r => {
                r.classList.remove("bg-amber-300");
                r.classList.add("bg-gray-100");
            });
            selectedAccount = JSON.parse(row.getAttribute("account"));
            row.classList.remove("bg-gray-100");
            row.classList.add("bg-amber-300");
        });

        table.appendChild(row);
    });
}
