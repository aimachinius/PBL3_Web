import loadPlane from '../contents/dom/plane.js';
import loadFlightJS from '../contents/dom/flight.js';
import loadAccountView from '../contents/dom/account_view.js';
import loadRoleView from '../contents/dom/roleView.js';
import loadUserView from '../contents/dom/user_view.js';
import loadCreateBookingView from '../contents/dom/create_booking_view.js';
import loadBookedView from '../contents/dom/booked_view.js';
import loadProfileView from '../contents/dom/profile_view.js'
import { logout } from '../../APIs/auth.js';
const barButtons = {
    planeBarBtn: {
        html: 'contents/plane.html',
        jsFunction: loadPlane
    },
    flightBarBtn: {
        html: 'contents/flight.html',
        jsFunction: loadFlightJS

    },
    accountBarBtn: {
        html: 'contents/accountView.html',
        jsFunction: loadAccountView,
    },
    roleBarBtn: {
        html: 'contents/roleView.html',
        jsFunction: loadRoleView,
    },
    userBarBtn: {
        html: 'contents/user_view.html',
        jsFunction: loadUserView,
    },
    createBookingBarBtn: {
        html: 'contents/create_booking_view.html',
        jsFunction: loadCreateBookingView,
    },
    viewBookedBarBtn: {
        html: 'contents/booked_view.html',
        jsFunction: loadBookedView,
    },
    profileBtn: {
        html: 'contents/profile_view.html',
        jsFunction: loadProfileView,
    }
}


async function setContent(key) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = await getHTMLFromFile(barButtons[key].html);
    //load js
    barButtons[key].jsFunction();

    document.querySelectorAll('[btn]').forEach(task => task.classList = 'px-6 py-2 flex items-center text-gray-400 hover:bg-gray-800'
    );
    document.querySelector(`[btn="${key}"]`).classList = 'border-l-2 border-amber-600 px-6 py-2 flex items-center bg-gradient-to-r from-gray-800 to-transparent'
}


async function getHTMLFromFile(filePath) {
    const data = await fetch(filePath);
    return await data.text();

}
window.addEventListener('load', () => {
    setContent('profileBtn');
})
window.setContent = setContent;

window.addEventListener('error', function (event) {
    console.error("Lỗi xảy ra:");
    console.log("Message:", event.message);
    console.log("File:", event.filename);
    console.log("Line:", event.lineno);
    console.log("Column:", event.colno);
    console.log("Error Object:", event.error);
});

window.addEventListener('unhandledrejection', function (event) {
    console.error("Lỗi Promise không được bắt:");
    console.log("Reason:", event.reason);
    if (event.reason.response?.data?.code === 'LOGIN_REQUIRED') {
        showNotification('Vui lòng đăng nhập lại', 'bg-red-500');
        setTimeout(() => {
            window.location.href = '/login/';
        }, 3000);
    }
    else {
        console.log("event.reason -----", event.reason);
        if (event.reason.response?.data != null) {
            showNotification(event.reason.response.data.message);
        } else if (event.reason.response != null) {
            showNotification(event.reason.response.data, 'bg-[#005a9e]');
        }
        else if (event.reason != null) {
            showNotification(event.reason);
        }

    }
});


function showNotification(message, colorCode) {
    if (colorCode == null) {
        colorCode = 'bg-[#005a9e]'
    }
    const container = document.getElementById('notification-container');
    const box = document.createElement('div');
    box.className = `
    ${colorCode}
    text-white
    px-6 py-4
    rounded-[10px]
    shadow-md
    mb-2.5
    text-base
    flex items-center
`;
    box.innerHTML = `
    <span>&#9432;<b>Thông báo</b></span> 
    <div class="ml-1">${message}</div>
    `;
    container.insertBefore(box, container.firstChild);
    setTimeout(() => {
        box.remove();
    }, 3000);
}
window.showNotification = showNotification;

async function logoutApp() {
    await logout();
    window.location.href = '/login/';
}
window.logoutApp = logoutApp;