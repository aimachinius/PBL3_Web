import { findByCustomerInformation, getTicketsByBookingId } from "../../../APIs/booking";
let bookings = null
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const searchType = document.getElementById('searchType');
    const searchInput = document.getElementById('searchInput');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const ticketDetailContainer = document.getElementById('ticket-detail-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const type = searchType.value;
        const value = searchInput.value.trim();

        let email = null;
        let phone = null;
        let cardNumber = null;

        switch (type) {
            case 'email':
                email = value;
                break;
            case 'phone':
                phone = value;
                break;
            case 'cccd':
                cardNumber = value;
                break;
        }

        bookings = await findByCustomerInformation(email, phone, cardNumber);
        displayResults(bookings);
    });

    // Xử lý đóng modal chi tiết
    closeDetailBtn.addEventListener('click', () => {
        ticketDetailContainer.classList.add('hidden');
    });

    // Xử lý click ngoài modal để đóng
    ticketDetailContainer.addEventListener('click', (e) => {
        if (e.target === ticketDetailContainer) {
            ticketDetailContainer.classList.add('hidden');
        }
    });
});

function displayResults(bookings) {
    const mainDiv = document.querySelector('main .max-w-4xl');

    // Xóa kết quả cũ nếu có
    const oldResults = document.querySelector('.booking-results');
    if (oldResults) {
        oldResults.remove();
    }

    if (!bookings || bookings.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'booking-results bg-white rounded-lg shadow-md p-6 text-center';
        noResults.innerHTML = `
            <p class="text-gray-600 text-lg">Không tìm thấy đơn đặt vé nào</p>
        `;
        mainDiv.appendChild(noResults);
        return;
    }

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'booking-results space-y-4';

    bookings.forEach(booking => {
        const bookingCard = document.createElement('div');
        bookingCard.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow';

        const customer = booking.customerWhoBought;
        const paymentDate = new Date(booking.paymentDate).toLocaleString('vi-VN');

        bookingCard.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Mã đặt vé: #${booking.id}</h3>
                    <p class="text-gray-600">Ngày thanh toán: ${paymentDate}</p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-bold text-blue-600">${booking.totalPrice.toLocaleString('vi-VN')} VNĐ</p>
                    <p class="text-sm text-gray-500">${booking.paymentMethod === 'CREDIT_CARD' ? 'Thẻ tín dụng' : 'Tiền mặt'}</p>
                </div>
            </div>
            <div class="border-t pt-4">
                <h4 class="font-medium text-gray-700 mb-2">Thông tin khách hàng:</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p><span class="text-gray-600">Họ tên:</span> ${customer.fullName}</p>
                        <p><span class="text-gray-600">Email:</span> ${customer.email}</p>
                    </div>
                    <div>
                        <p><span class="text-gray-600">Số điện thoại:</span> ${customer.phone}</p>
                        <p><span class="text-gray-600">CCCD:</span> ${customer.cardNumber || 'Chưa cập nhật'}</p>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-right">
                <button onclick="viewTickets(${booking.id})" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Xem chi tiết vé
                </button>
            </div>
        `;

        resultsDiv.appendChild(bookingCard);
    });

    mainDiv.appendChild(resultsDiv);
}

window.viewTickets = viewTickets;

// Hàm xử lý xem chi tiết vé
async function viewTickets(bookingId) {
    const container = document.getElementById('ticket-detail-container');
    const customerInfo = document.getElementById('customer-info');
    const paymentInfo = document.getElementById('payment-info');
    const ticketsList = document.getElementById('tickets-list');

    try {
        const tickets = await getTicketsByBookingId(bookingId);
        const booking = bookings.find(booking => booking.bookingId = bookingId);

        if (tickets && tickets.length > 0) {
            // Lấy thông tin booking từ ticket đầu tiên

            // Hiển thị thông tin khách hàng
            customerInfo.innerHTML = `
                <p><strong>Họ tên:</strong> ${booking.customerWhoBought.fullName}</p>
                <p><strong>Email:</strong> ${booking.customerWhoBought.email || 'Chưa cập nhật'}</p>
                <p><strong>Số điện thoại:</strong> ${booking.customerWhoBought.phone || 'Chưa cập nhật'}</p>
                <p><strong>Địa chỉ:</strong> ${booking.customerWhoBought.address || 'Chưa cập nhật'}</p>
            `;

            // Hiển thị thông tin thanh toán
            paymentInfo.innerHTML = `
            <p><strong>Ngày thanh toán:</strong> ${formatDate(booking.paymentDate)}</p>
            <p><strong>Phương thức thanh toán:</strong> ${booking.paymentMethod}</p>
            <p><strong>Số tiền thanh toán:</strong> ${formatPrice(booking.totalPrice)}</p>
            `;

            // Hiển thị danh sách vé
            ticketsList.innerHTML = tickets.map(ticket => `
                <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-semibold text-lg">Vé ${ticket.ticketType === 'ECONOMY' ? 'Phổ thông' : 'Thương gia'}</h4>
                            <p class="text-sm text-gray-600">Mã vé: ${ticket.idTicket}</p>
                        </div>
                        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                           Ghế: ${ticket.seatName || 'Chưa chọn ghế'}
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Hành khách:</span>
                            <span class="font-medium">${ticket.user.fullName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Chuyến bay:</span>
                            <span class="font-medium">VN${ticket.flight.idFlight}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Từ:</span>
                            <span class="font-medium">${ticket.flight.fromLocation.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Đến:</span>
                            <span class="font-medium">${ticket.flight.toLocation.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Ngày bay:</span>
                            <span class="font-medium">${formatDate(ticket.flight.departureDate)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Giờ bay:</span>
                            <span class="font-medium">${ticket.flight.departureTime.slice(0, 5)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Giá vé:</span>
                              <span class="font-medium text-green-600"> ${formatPrice(ticket.price + (ticket.returnTicket?.price || 0))}</span>
                        </div>
                    </div>

                    ${ticket.returnTicket ? `
                    <div class="mt-4 pt-4 border-t border-gray-200">
                      <div class="flex justify-between items-start mb-3">
                         <div>
                            <h4 class="font-semibold text-lg">Chuyến về - ${ticket.returnTicket.ticketType === 'ECONOMY' ? 'Phổ thông' : 'Thương gia'}</h4>
                        
                        </div>
                        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Ghế: ${ticket.returnTicket.seatName || 'Chưa chọn ghế'}
                        </div>
                    </div>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Chuyến bay:</span>
                                <span class="font-medium">VN${ticket.returnTicket.flight.idFlight}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Từ:</span>
                                <span class="font-medium">${ticket.returnTicket.flight.fromLocation.name}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Đến:</span>
                                <span class="font-medium">${ticket.returnTicket.flight.toLocation.name}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Ngày bay:</span>
                                <span class="font-medium">${formatDate(ticket.returnTicket.flight.departureDate)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Giờ bay:</span>
                                <span class="font-medium">${ticket.returnTicket.flight.departureTime.slice(0, 5)}</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `).join('');
        }

        // Hiển thị modal
        container.classList.remove('hidden');
    } catch (error) {
        console.error('Lỗi khi lấy thông tin vé:', error);
        alert('Có lỗi xảy ra khi lấy thông tin vé. Vui lòng thử lại sau.');
    }
}

// Format ngày tháng
function formatDate(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

// Format giá tiền
function formatPrice(price) {
    if (!price) return "";
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}


