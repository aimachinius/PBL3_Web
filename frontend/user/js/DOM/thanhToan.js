
import { createBooking } from '../../../APIs/booking.js';
let selectedPaymentMethod = 'CREDIT_CARD';
let selectedPaymentName = 'Thẻ tín dụng';

// Dữ liệu mẫu để demo
const sampleData = {
    customerSelectedFight: {
        departureFlightASeat: {
            flight: {
                idFlight: "VN123",
                fromLocation: { nameCode: "HAN", name: "Hà Nội" },
                toLocation: { nameCode: "SGN", name: "TP. Hồ Chí Minh" },
                departureDate: "2024-12-25",
                departureTime: "08:30:00",
                durationMinutes: 120,
                commonFare: 1296000,
                vipFare: 2500000,
                plane: { namePlane: "Boeing 787" }
            },
            TicketType: "ECONOMY"
        },
        returnFlightASeat: null
    },
    customerData: [
        {
            fullName: "Nguyễn Văn A",
            phone: "0987654321",
            email: "nguyenvana@email.com",
            cardNumber: "123456789012",
            dayOfBirth: "1990-01-15",
            sex: "MALE",
            address: "Hà Nội",
            departureSeat: "12A"
        }
    ]
};

// Khởi tạo trang khi load
window.addEventListener('load', async () => {
    try {
        // Kiểm tra và lưu dữ liệu mẫu nếu chưa có
        if (!sessionStorage.getItem('customerSelectedFight') || !sessionStorage.getItem('customerData')) {
            sessionStorage.setItem('customerSelectedFight', JSON.stringify(sampleData.customerSelectedFight));
            sessionStorage.setItem('customerData', JSON.stringify(sampleData.customerData));
        }

        createFlightInfoHeader();
        createViewFlights();
        createViewCustomers();
        updateTotalPrice();
    } catch (error) {
        console.error('Lỗi khi khởi tạo trang:', error);
        showNotification('Không thể tải dữ liệu chuyến bay. Vui lòng thử lại!', 'error');
    }
});

// Tạo header thông tin chuyến bay
function createFlightInfoHeader() {
    const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));
    const headerElement = document.getElementById('flight-info-header');

    if (!customerSelectedFight || !customerData) {
        headerElement.innerHTML = '<div style="text-align: center; color: #666;">Không có dữ liệu chuyến bay</div>';
        return;
    }

    const flight = customerSelectedFight.departureFlightASeat.flight;
    const departure = new Date(`${flight.departureDate}T${flight.departureTime}`);
    const dayOptions = { weekday: 'short', day: 'numeric', month: 'long' };
    const formattedDate = departure.toLocaleDateString('vi-VN', dayOptions);

    // Tính tổng giá
    let totalPrice = 0;
    if (customerSelectedFight.departureFlightASeat.TicketType === 'ECONOMY') {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.commonFare;
    } else {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.vipFare;
    }

    if (customerSelectedFight.returnFlightASeat != null) {
        if (customerSelectedFight.returnFlightASeat.TicketType === 'ECONOMY') {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.commonFare;
        } else {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.vipFare;
        }
    }

    const finalPrice = (totalPrice * customerData.length).toLocaleString('vi-VN');

    headerElement.innerHTML = `
        <div class="route">
            <div class="city">
                <div class="city-code">${flight.fromLocation.nameCode}</div>
                <div class="city-name">${flight.fromLocation.name}</div>
            </div>
            <div class="arrow">✈️</div>
            <div class="city">
                <div class="city-code">${flight.toLocation.nameCode}</div>
                <div class="city-name">${flight.toLocation.name}</div>
            </div>
        </div>
        <div class="flight-details">
            <div>Chuyến ${customerSelectedFight.returnFlightASeat ? 'khứ hồi' : 'đi'}<br>${formattedDate}</div>
            <div>Hành khách<br>${customerData.length} người</div>
        </div>
        <div class="price">₫${finalPrice}</div>
    `;
}

// Tạo view chuyến bay
function createViewFlights() {
    const parentNode = document.getElementById('flight-details-section');
    const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));

    if (!customerSelectedFight) {
        parentNode.innerHTML = '<div class="section-content">Không có dữ liệu chuyến bay</div>';
        return;
    }

    // Xóa nội dung cũ
    parentNode.innerHTML = '';

    parentNode.appendChild(createViewFlight(
        customerSelectedFight.departureFlightASeat.flight,
        customerSelectedFight.departureFlightASeat.TicketType,
        'Chuyến đi'
    ));

    if (customerSelectedFight.returnFlightASeat != null) {
        parentNode.appendChild(createViewFlight(
            customerSelectedFight.returnFlightASeat.flight,
            customerSelectedFight.returnFlightASeat.TicketType,
            'Chuyến về'
        ));
    }
}

function createViewFlight(flight, ticketType, flightLabel = '') {
    const viewFlightBox = document.createElement('div');
    viewFlightBox.className = 'section-content';

    // Tính thời gian bay
    const departure = new Date(`${flight.departureDate}T${flight.departureTime}`);
    const durationMs = flight.durationMinutes * 60000;
    const arrival = new Date(departure.getTime() + durationMs);
    const hours = Math.floor(flight.durationMinutes / 60);
    const minutes = flight.durationMinutes % 60;

    // Format ngày bay
    const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = departure.toLocaleDateString('vi-VN', dayOptions);

    // Format giờ đến
    const arrivalTime = arrival.toTimeString().slice(0, 5);

    viewFlightBox.innerHTML = `
        ${flightLabel ? `<div style="font-weight: bold; color: #007bff; margin-bottom: 10px;">${flightLabel}</div>` : ''}
        <div class="flight-info-content">
            <div>
                <div class="flight-route">${flight.fromLocation.name} → ${flight.toLocation.name}</div>
                <div class="flight-date">${formattedDate}</div>
            </div>
        </div>
        <div class="flight-times">
            <div class="departure">
                <div class="time">${flight.departureTime.slice(0, 5)}</div>
                <div class="airport-code">${flight.fromLocation.nameCode}</div>
                <div class="airport-terminal">Nhà ga 1</div>
            </div>
            <div class="flight-dotted-line"></div>
            <div class="arrival">
                <div class="time">${arrivalTime}</div>
                <div class="airport-code">${flight.toLocation.nameCode}</div>
                <div class="airport-terminal">Nhà ga 1</div>
            </div>
        </div>
        <div class="flight-details-list">
            <div>⏱️ Thời gian bay: ${hours}h ${minutes}phút</div>
            <div>✈️ VN${flight.idFlight} - ${flight.plane.namePlane}</div>
            <div>🛫 Bay thẳng</div>
            <div>🎫 Hạng vé: ${ticketType === 'ECONOMY' ? 'Phổ thông' : 'Thương gia'}</div>
        </div>
    `;

    return viewFlightBox;
}

// Tạo view khách hàng
function createViewCustomers() {
    const parentNode = document.getElementById('section-customers');
    const customers = JSON.parse(sessionStorage.getItem('customerData'));

    if (!customers) {
        parentNode.innerHTML = '<div class="section-content">Không có dữ liệu hành khách</div>';
        return;
    }

    // Xóa nội dung cũ
    parentNode.innerHTML = '';

    customers.forEach((customer, index) => {
        parentNode.appendChild(createViewCustomer(customer, index + 1));
    });
}

function createViewCustomer(person, index) {
    const passengerInfo = document.createElement('div');
    passengerInfo.className = 'passenger-info';

    const genderText = person.sex === 'MALE' ? 'Nam' : (person.sex === 'FEMALE' ? 'Nữ' : 'Không xác định');

    passengerInfo.innerHTML = `
        <div class="passenger">
            <div class="passenger-name">👤 Hành khách ${index}: ${person.fullName}</div>
            <div class="passenger-contact">📅 Ngày sinh: ${person.dayOfBirth}</div>
            <div class="passenger-contact">👫 Giới tính: ${genderText}</div>
            ${person.phone ? `<div class="passenger-contact">📞 SĐT: ${person.phone}</div>` : ''}
            ${person.email ? `<div class="passenger-contact">📧 Email: ${person.email}</div>` : ''}
            ${person.cardNumber ? `<div class="passenger-contact">🆔 CCCD: ${person.cardNumber}</div>` : ''}
            ${person.address ? `<div class="passenger-contact">🏠 Địa chỉ: ${person.address}</div>` : ''}
            ${person.departureSeat ? `<div class="passenger-contact">💺 Ghế: ${person.departureSeat}</div>` : ''}
        </div>
    `;
    return passengerInfo;
}

// Cập nhật tổng giá
function updateTotalPrice() {
    const totalPriceView = document.getElementById('total-price');
    const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
    const customerData = JSON.parse(sessionStorage.getItem('customerData'));

    if (!customerSelectedFight || !customerData) {
        if (totalPriceView) totalPriceView.innerHTML = '0';
        return;
    }

    let totalPrice = 0;

    if (customerSelectedFight.departureFlightASeat.TicketType === 'ECONOMY') {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.commonFare;
    } else {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.vipFare;
    }

    if (customerSelectedFight.returnFlightASeat != null) {
        if (customerSelectedFight.returnFlightASeat.TicketType === 'ECONOMY') {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.commonFare;
        } else {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.vipFare;
        }
    }

    const customerNumber = customerData.length;
    const finalPrice = totalPrice * customerNumber;
    const formattedPrice = finalPrice.toLocaleString('vi-VN');

    if (totalPriceView) totalPriceView.innerHTML = formattedPrice;

    // Cập nhật giá trong modal
    const modalTotalPrice = document.getElementById('modal-total-price');
    if (modalTotalPrice) {
        modalTotalPrice.innerHTML = `₫${formattedPrice} VND`;
    }
}

// Hàm chọn phương thức thanh toán
function selectPayment(element) {
    // Bỏ chọn tất cả các phương thức
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Chọn phương thức hiện tại
    element.classList.add('selected');

    // Lưu thông tin phương thức đã chọn
    const methodMapping = {
        'credit-card': { method: 'CREDIT_CARD', name: 'Thẻ tín dụng' },
        'shopee-pay': { method: 'E_WALLET', name: 'ShopeePay' },
        'union-pay': { method: 'DEBIT_CARD', name: 'UnionPay card' },
        'bank-transfer': { method: 'BANK_TRANSFER', name: 'Chuyển khoản ngân hàng' }
    };

    const methodKey = element.getAttribute('data-method');
    const methodInfo = methodMapping[methodKey];

    if (methodInfo) {
        selectedPaymentMethod = methodInfo.method;
        selectedPaymentName = methodInfo.name;

        // Hiệu ứng animation khi chọn
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
}

// Hiển thị modal xác nhận
async function showConfirmModal() {
    const selectedMethodNameEl = document.getElementById('selectedMethodName');
    const modalOverlay = document.getElementById('confirmModal');

    if (selectedMethodNameEl) {
        selectedMethodNameEl.textContent = selectedPaymentName;
    }

    // Cập nhật lại tổng giá trong modal
    updateTotalPrice();

    if (modalOverlay) {
        modalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus vào nút xác nhận sau khi modal hiển thị
        setTimeout(() => {
            const confirmBtn = document.querySelector('.modal-btn-confirm');
            if (confirmBtn) confirmBtn.focus();
        }, 300);
    }
}

// Ẩn modal xác nhận
function hideConfirmModal() {
    const modalOverlay = document.getElementById('confirmModal');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Xác nhận thanh toán
function confirmPayment() {
    hideConfirmModal();
    handlePay(selectedPaymentMethod, selectedPaymentName);
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    // Xóa thông báo cũ nếu có
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'}; 
        color: white; 
        padding: 15px 20px; 
        border-radius: 8px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 4000; 
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;

    // Thêm CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>${type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);

    // Có thể click để đóng
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Hàm xử lý thanh toán tích hợp
async function handlePay(paymentMethod, paymentName) {
    try {
        const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
        const customerData = JSON.parse(sessionStorage.getItem('customerData'));

        if (!customerSelectedFight || !customerData) {
            showNotification('Không có dữ liệu đặt vé. Vui lòng thử lại!', 'error');
            return;
        }

        // Tạo booking data an toàn hơn
        const bookingData = {
            paymentMethod: paymentMethod,
            departureFlightId: customerSelectedFight.departureFlightASeat.flight.idFlight,
            departureTicketType: customerSelectedFight.departureFlightASeat.TicketType,
            tickets: customerData.map(user => {
                const ticket = {
                    seatId: user.departureSeat,
                    user: {
                        fullName: user.fullName || '',
                        phone: user.phone || '',
                        email: user.email || '',
                        cardNumber: user.cardNumber || '',
                        address: user.address || '',
                        sex: (user.sex === "" || !user.sex) ? null : user.sex,
                        dayOfBirth: user.dayOfBirth || null,
                    }
                };

                // Chỉ thêm returnTicket nếu có returnSeat
                if (user.returnSeat) {
                    ticket.returnTicket = {
                        seatId: user.returnSeat
                    };
                }

                return ticket;
            })
        };

        // Chỉ thêm thông tin chuyến về nếu có
        if (customerSelectedFight.returnFlightASeat) {
            bookingData.returnFlightId = customerSelectedFight.returnFlightASeat.flight.idFlight;
            bookingData.returnTicketType = customerSelectedFight.returnFlightASeat.TicketType;
        }

        console.log('Booking data:', bookingData);

        // Hiển thị loading với animation đẹp hơn
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'payment-loading';
        loadingOverlay.style.cssText = `
            position: fixed; 
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7); 
            display: flex; 
            align-items: center; 
            justify-content: center;
            z-index: 5000;
            backdrop-filter: blur(5px);
        `;

        loadingOverlay.innerHTML = `
            <div style="
                background: white; 
                padding: 40px; 
                border-radius: 16px; 
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 400px;
                width: 90%;
            ">
                <div style="
                    width: 50px; 
                    height: 50px; 
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #007bff; 
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 10px;">
                    Đang xử lý thanh toán
                </div>
                <div style="font-size: 14px; color: #666;">
                    Phương thức: ${paymentName}<br>
                    Vui lòng đợi trong giây lát...
                </div>
            </div>
        `;

        // Thêm CSS animation cho loading spinner
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(loadingOverlay);

        try {
            // Gọi API thanh toán thực
            const response = await createBooking(bookingData);
            console.log('API Response:', response);

            // Xóa loading overlay
            const loadingElement = document.getElementById('payment-loading');
            if (loadingElement) {
                document.body.removeChild(loadingElement);
            }

            // Hiển thị thông báo thành công
            showNotification(`Đặt vé thành công với phương thức ${paymentName}! 🎉`, 'success');

            // Xóa dữ liệu session sau khi đặt vé thành công
            sessionStorage.removeItem('customerSelectedFight');
            sessionStorage.removeItem('customerData');

            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                console.log('Chuyển hướng đến trang xác nhận...');
                window.location.href = 'timChuyenBay.html';
            }, 2000);

        } catch (apiError) {
            // Xóa loading overlay khi có lỗi
            const loadingElement = document.getElementById('payment-loading');
            if (loadingElement) {
                document.body.removeChild(loadingElement);
            }
            throw apiError;
        }

    } catch (error) {
        console.error('Lỗi khi thanh toán:', error);

        // Xác định thông báo lỗi phù hợp
        let errorMessage = 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!';

        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = `Lỗi: ${error.response.data.message}`;
        } else if (error.message) {
            errorMessage = `Lỗi: ${error.message}`;
        }

        showNotification(errorMessage, 'error');
    }
}

// Hàm xử lý thanh toán chính (được gọi từ modal)
async function handleThanhToan() {
    try {
        const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
        const customerData = JSON.parse(sessionStorage.getItem('customerData'));

        if (!customerSelectedFight || !customerData) {
            console.error('Không có dữ liệu cần thiết');
            return;
        }

        const bookingData = {
            paymentMethod: selectedPaymentMethod,
            departureFlightId: customerSelectedFight.departureFlightASeat.flight.idFlight,
            departureTicketType: customerSelectedFight.departureFlightASeat.TicketType,
            tickets: customerData.map(user => {
                const ticket = {
                    seatId: user.departureSeat,
                    user: {
                        fullName: user.fullName || '',
                        phone: user.phone || '',
                        email: user.email || '',
                        cardNumber: user.cardNumber || '',
                        address: user.address || '',
                        sex: (user.sex === "" || !user.sex) ? null : user.sex,
                        dayOfBirth: user.dayOfBirth || null,
                    }
                };

                // Chỉ thêm returnTicket nếu có returnSeat
                if (user.returnSeat) {
                    ticket.returnTicket = {
                        seatId: user.returnSeat
                    };
                }

                return ticket;
            })
        };

        if (customerSelectedFight.returnFlightASeat) {
            bookingData.returnFlightId = customerSelectedFight.returnFlightASeat.flight.idFlight;
            bookingData.returnTicketType = customerSelectedFight.returnFlightASeat.TicketType;
        }

        console.log('Booking data:', bookingData);

        const response = await createBooking(bookingData);
        console.log('Booking response:', response);

    } catch (error) {
        console.error('Lỗi trong handleThanhToan:', error);
    }
}

// Event listeners cho modal
document.addEventListener('DOMContentLoaded', function () {
    // Đóng modal khi click outside
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                hideConfirmModal();
            }
        });
    }

    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('confirmModal');
            if (modal && modal.classList.contains('show')) {
                hideConfirmModal();
            }
        }
    });

    // Xử lý form submission với Enter
    document.addEventListener('keydown', function (e) {
        const modal = document.getElementById('confirmModal');
        if (e.key === 'Enter' && modal && modal.classList.contains('show')) {
            e.preventDefault();
            confirmPayment();
        }
    });
});

// Xử lý lỗi toàn cục
window.addEventListener('error', function (event) {
    console.error("Lỗi JavaScript:");
    console.log("Message:", event.message);
    console.log("File:", event.filename);
    console.log("Line:", event.lineno);
    console.log("Column:", event.colno);
    console.log("Error Object:", event.error);

    showNotification('Đã xảy ra lỗi không mong muốn. Vui lòng tải lại trang.', 'error');
});

window.addEventListener('unhandledrejection', function (event) {
    console.error("Lỗi Promise không được bắt:");
    console.log("Reason:", event.reason);

    let errorMessage = 'Đã xảy ra lỗi trong quá trình xử lý.';

    if (event.reason && event.reason.response && event.reason.response.data && event.reason.response.data.message) {
        errorMessage = 'Lỗi: ' + event.reason.response.data.message;
    } else if (event.reason && event.reason.message) {
        errorMessage = 'Lỗi: ' + event.reason.message;
    }

    showNotification(errorMessage, 'error');
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

function formatDateTime(dateString, timeString) {
    const dateTime = new Date(`${dateString}T${timeString}`);
    return dateTime.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export functions nếu cần sử dụng ở module khác hoặc từ HTML
window.selectPayment = selectPayment;
window.showConfirmModal = showConfirmModal;
window.hideConfirmModal = hideConfirmModal;
window.confirmPayment = confirmPayment;

// Export module để sử dụng từ bên ngoài
window.paymentModule = {
    selectPayment,
    showConfirmModal,
    hideConfirmModal,
    confirmPayment,
    handlePay,
    updateTotalPrice,
    showNotification,
    handleThanhToan
};