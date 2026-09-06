import { login } from '../APIs/auth.js';

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');

    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}
window.togglePassword = togglePassword;

// Handle form submission
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const memberId = document.getElementById('member-id').value;
    const password = document.getElementById('password').value;
    const keeplogin = document.getElementById('keep-login').checked;

    if (!memberId || !password) {
        alert('Vui lòng nhập đủ thông tin!');
        return;
    }
    const res = await login(memberId, password, keeplogin);
    console.log(res);
    if (res.status === 200) {
        alert('Đăng nhập thành công!');
        window.location.href = '/admin/';
    } else {

        alert('Đăng nhập thất bại!');
        faildLoginNotification(res);
    }

    // Here you would normally send the data to your server
})

function faildLoginNotification(response) {
    const code = response.data.code;
    document.querySelectorAll('[notice]').forEach(div => div.innerHTML = '')
    if (code == 'PASSWORD_INCORRECT') {
        document.querySelector('[notice="password"]').innerHTML = 'Mật khẩu không chính xác';
    } else if (code == 'EMAIL_NOT_FOUND') {
        document.querySelector('[notice="username"]').innerHTML = 'Tài khoảng chưa tồn tại';
    }

}

// {
//     "data": {
//         "code": "PASSWORD_INCORRECT",
//         "message": "Password is incorrect"
//     },
//     "status": 401,
//     "statusText": "",
//     "headers": {
//         "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
//         "content-type": "application/json",
//         "expires": "0",
//         "pragma": "no-cache"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         },
//         "withCredentials": true,
//         "method": "post",
//         "url": "http://localhost:8080/login",
//         "data": "{\"account\":{\"username\":\"hoi@gmail.com\",\"password\":\"fdf\"},\"keepLoggedIn\":true}",
//         "allowAbsoluteUrls": true
//     },
//     "request": {}
// }
