import { getCurrentUser, changePassword } from '../../../APIs/auth.js'
import { updateUser } from '../../../APIs/user.js'

export default async function loadProfileView() {
    const account = await getCurrentUser()

    const userFields = ['fullName', 'phone', 'email', 'cardNumber', 'address', 'sex', 'dayOfBirth'];

    document.getElementById("edit-user-info-btn").addEventListener("click", () => {
        userFields.forEach(id => {
            const el = document.getElementById(id);
            el.disabled = false;
            el.classList.remove("bg-gray-100");
        });
        document.getElementById("save-user-info-btn").classList.remove("hidden");
        document.getElementById("edit-user-info-btn").classList.add("hidden");
    });

    document.getElementById("save-user-info-btn").addEventListener("click", async () => {
        let isValid = true;

        userFields.forEach(id => {
            const el = document.getElementById(id);
            const value = el.value.trim();

            // Kiểm tra rỗng
            if (!value) {
                isValid = false;
                el.classList.add("border-red-500");
                el.classList.add("ring-2", "ring-red-300");
            } else {
                el.classList.remove("border-red-500");
                el.classList.remove("ring-2", "ring-red-300");
            }
        });

        if (!isValid) {
            window.showNotification("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        const upUser = {};

        // Nếu hợp lệ, tiếp tục xử lý
        userFields.forEach(id => {
            const el = document.getElementById(id);
            el.disabled = true;
            el.classList.add("bg-gray-100");
            upUser[id] = el.value;

        });

        document.getElementById("save-user-info-btn").classList.add("hidden");
        document.getElementById("edit-user-info-btn").classList.remove("hidden");



        await updateUser(account.user.idUser, upUser);
        location.reload();
        window.setContent('profileBtn');

        // TODO: Gửi dữ liệu lên server tại đây nếu cần
    });

    const accountFields = ['currentPassword', 'password', 'confirmPassword'];
    document.getElementById("edit-account-btn").addEventListener("click", () => {
        accountFields.forEach(id => {
            const el = document.getElementById(id);
            el.disabled = false;
            el.classList.remove("bg-gray-100");
        });
        document.getElementById("save-account-btn").classList.remove("hidden");
        document.getElementById("edit-account-btn").classList.add("hidden");
    });

    document.getElementById("save-account-btn").addEventListener("click", async () => {
        // Kiểm tra mật khẩu mới có khớp không
        const pw = document.getElementById("password").value;
        const confirmPw = document.getElementById("confirmPassword").value;
        const oldPassword = document.getElementById('currentPassword').value
        if (pw !== confirmPw) {
            window.showNotification('Mật khẩu mới và xác nhận mật khẩu không khớp')
            return;
        }

        // Gửi dữ liệu đổi mật khẩu ở đây
        accountFields.forEach(id => {
            const el = document.getElementById(id);
            el.disabled = true;
            el.classList.add("bg-gray-100");
        });
        document.getElementById("save-account-btn").classList.add("hidden");
        document.getElementById("edit-account-btn").classList.remove("hidden");

        try {
            const response = await changePassword(oldPassword, pw);
            window.showNotification(response.data);
        } catch (error) {
            console.log(error);
            window.showNotification(error.response.data.message);
        }

    });
    console.log(account)
    fillContent(account);
}
function fillContent(account) {
    const userFields = ['fullName', 'phone', 'email', 'cardNumber', 'address', 'sex'];
    userFields.forEach(id => {
        const el = document.getElementById(id);
        el.value = account.user[id];
    });
    const isoDate = new Date(account.user['dayOfBirth']);
    const formatted = isoDate.toISOString().split('T')[0]; // lấy yyyy-MM-dd

    document.getElementById('dayOfBirth').value = formatted;
    document.getElementById('username').value = account.username
    document.getElementById('role-name').value = account.role.name;
    const permissionsDiv = document.getElementById('permissions');
    let innerHTMLContent = '';

    account.role.permissions.forEach(permission => {
        innerHTMLContent += `
        <label class="border-2 border-blue-600 bg-blue-200 text-blue-800 rounded-xl p-1 mx-1"> 
            ${permission}
        </label>
    `;
    });
    permissionsDiv.innerHTML = innerHTMLContent;

}