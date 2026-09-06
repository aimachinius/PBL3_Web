import { findByCustomerId, findByFromDate, getTicketsByBookingId } from '../../../APIs/booking.js';

let selectedBooking;

export default async function loadBookedView() {
    selectedBooking = null;

    const searchBtn = document.getElementById("search-btn");
    const searchCustomerIdInput = document.getElementById("search-customer-id");
    const fromDateInput = document.getElementById("from-date");
    const toDateInput = document.getElementById("to-date");

    fromDateInput.addEventListener('change', function () {
        toDateInput.min = fromDateInput.value;
        if (toDateInput.value && toDateInput.value < fromDateInput.value) {
            toDateInput.value = '';
        }
    });
    const closeDetailBtn = document.getElementById("close-detail-btn");
    const bookingDetailContainer = document.getElementById("booking-detail-container");

    // Xử lý tìm kiếm
    searchBtn.addEventListener("click", async () => {
        // const customerId = searchCustomerIdInput.value;
        const fromDate = fromDateInput.value;
        const toDate = toDateInput.value;

        let bookings = [];
        // if (customerId) {
        //     bookings = await findByCustomerId(customerId);
        // } else if (fromDate && toDate) {
        bookings = await findByFromDate(fromDate, toDate);
        // }

        loadBookingsTable(bookings);
    });

    // Xử lý đóng form chi tiết
    closeDetailBtn.addEventListener("click", () => {
        bookingDetailContainer.classList.add("hidden");
    });

    // Xử lý click ngoài form chi tiết
    bookingDetailContainer.addEventListener("click", (e) => {
        if (e.target === bookingDetailContainer) {
            bookingDetailContainer.classList.add("hidden");
        }
    });

    // Load dữ liệu ban đầu
    loadBookingsTable([]);
}

// Load danh sách đơn đặt vé vào bảng
function loadBookingsTable(bookings) {
    const table = document.getElementById("booking-table-body");
    table.innerHTML = '';

    bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.className = "bg-blue-100 hover:bg-amber-100";
        row.setAttribute("booking", JSON.stringify(booking));

        row.innerHTML = `
            <td class="border px-2 py-1">${booking.id || ""}</td>
            <td class="border px-2 py-1">${booking.customerWhoBought?.fullName || ""}</td>
            <td class="border px-2 py-1">${formatDate(booking.paymentDate) || ""}</td>
            <td class="border px-2 py-1">${booking.paymentMethod || ""}</td>
            <td class="border px-2 py-1">${formatPrice(booking.totalPrice) || ""}</td>
        `;

        row.addEventListener("click", () => {
            table.querySelectorAll("tr").forEach(r => {
                r.classList.remove("bg-amber-300");
                r.classList.add("bg-blue-100");
            });
            selectedBooking = JSON.parse(row.getAttribute("booking"));
            row.classList.remove("bg-blue-100");
            row.classList.add("bg-amber-300");
            showBookingDetail(selectedBooking);
        });

        table.appendChild(row);
    });
}

// ... existing code ...
// Hiển thị chi tiết đơn đặt vé
async function showBookingDetail(booking) {
    const container = document.getElementById("booking-detail-container");
    const customerInfo = document.getElementById("customer-info");
    const paymentInfo = document.getElementById("payment-info");
    const ticketsList = document.getElementById("tickets-list");

    // Hiển thị thông tin khách hàng
    customerInfo.innerHTML = `
        <p><strong>Họ tên:</strong> ${booking.customerWhoBought?.fullName || ""}</p>
        <p><strong>Email:</strong> ${booking.customerWhoBought?.email || ""}</p>
        <p><strong>Số điện thoại:</strong> ${booking.customerWhoBought?.phone || ""}</p>
        <p><strong>Địa chỉ:</strong> ${booking.customerWhoBought?.address || ""}</p>
    `;

    // Hiển thị thông tin thanh toán
    paymentInfo.innerHTML = `
        <p><strong>Ngày thanh toán:</strong> ${formatDate(booking.paymentDate) || ""}</p>
        <p><strong>Phương thức thanh toán:</strong> ${booking.paymentMethod || ""}</p>
        <p><strong>Tổng tiền:</strong> ${formatPrice(booking.totalPrice) || ""}</p>
    `;

    // Lấy danh sách vé
    const tickets = await getTicketsByBookingId(booking.id);

    // Hiển thị danh sách vé
    ticketsList.innerHTML = tickets.map(ticket => `
       <div class="bg-white  min-w-2xl rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
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

    container.classList.remove("hidden");
}
// ... existing code ...
// Format ngày tháng
function formatDate(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
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

/*
[
    {
        "idTicket": 1,
        "user": {
            "idUser": 12,
            "fullName": "Nguy?n Van C",
            "phone": "0123456789",
            "address": "123 Ðu?ng ABC, Qu?n XYZ, TP.HCM",
            "email": "nguyenvana@example.com",
            "dateOfBirth": "1990-01-01T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "123456789",
            "sex": "MALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": {
            "idReturnTicket": 1,
            "ticketId": 1,
            "flight": {
                "idFlight": 7,
                "planeId": 3,
                "departureDate": "2025-06-08",
                "departureTime": "16:54:00",
                "durationMinutes": 100,
                "commonFare": 323,
                "vipFare": 2321,
                "fromLocation": {
                    "id": 1,
                    "name": "Noi Bai International Airport",
                    "nameCode": "HAN"
                },
                "toLocation": {
                    "id": 16,
                    "name": "Pleiku Airport",
                    "nameCode": "PXU"
                },
                "createdAt": null,
                "bookedEconomyCustomerNumber": 0,
                "bookedVipCustomerNumber": 0,
                "economySeats": 0,
                "vipSeats": 0
            },
            "ticketType": "ECONOMY",
            "seatName": "2B",
            "price": null,
            "baggageId": 0
        },
        "bookingId": 0,
        "createdAt": 1748342712568,
        "seatName": "2A"
    },
    {
        "idTicket": 2,
        "user": {
            "idUser": 13,
            "fullName": "Tr?n Th? B",
            "phone": "0987654321",
            "address": "456 Ðu?ng XYZ, Qu?n ABC, TP.HCM",
            "email": "tranthib@example.com",
            "dateOfBirth": "1992-02-02T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "987654321",
            "sex": "FEMALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": {
            "idReturnTicket": 2,
            "ticketId": 2,
            "flight": {
                "idFlight": 7,
                "planeId": 3,
                "departureDate": "2025-06-08",
                "departureTime": "16:54:00",
                "durationMinutes": 100,
                "commonFare": 323,
                "vipFare": 2321,
                "fromLocation": {
                    "id": 1,
                    "name": "Noi Bai International Airport",
                    "nameCode": "HAN"
                },
                "toLocation": {
                    "id": 16,
                    "name": "Pleiku Airport",
                    "nameCode": "PXU"
                },
                "createdAt": null,
                "bookedEconomyCustomerNumber": 0,
                "bookedVipCustomerNumber": 0,
                "economySeats": 0,
                "vipSeats": 0
            },
            "ticketType": "ECONOMY",
            "seatName": "3B",
            "price": null,
            "baggageId": 0
        },
        "bookingId": 0,
        "createdAt": 1748342717832,
        "seatName": "1A"
    },
    {
        "idTicket": 3,
        "user": {
            "idUser": 12,
            "fullName": "Nguy?n Van C",
            "phone": "0123456789",
            "address": "123 Ðu?ng ABC, Qu?n XYZ, TP.HCM",
            "email": "nguyenvana@example.com",
            "dateOfBirth": "1990-01-01T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "123456789",
            "sex": "MALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748392734441,
        "seatName": null
    },
    {
        "idTicket": 4,
        "user": {
            "idUser": 13,
            "fullName": "Tr?n Th? B",
            "phone": "0987654321",
            "address": "456 Ðu?ng XYZ, Qu?n ABC, TP.HCM",
            "email": "tranthib@example.com",
            "dateOfBirth": "1992-02-02T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "987654321",
            "sex": "FEMALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748392734484,
        "seatName": null
    },
    {
        "idTicket": 5,
        "user": {
            "idUser": 12,
            "fullName": "Nguy?n Van C",
            "phone": "0123456789",
            "address": "123 Ðu?ng ABC, Qu?n XYZ, TP.HCM",
            "email": "nguyenvana@example.com",
            "dateOfBirth": "1990-01-01T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "123456789",
            "sex": "MALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748392825510,
        "seatName": null
    },
    {
        "idTicket": 6,
        "user": {
            "idUser": 13,
            "fullName": "Tr?n Th? B",
            "phone": "0987654321",
            "address": "456 Ðu?ng XYZ, Qu?n ABC, TP.HCM",
            "email": "tranthib@example.com",
            "dateOfBirth": "1992-02-02T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "987654321",
            "sex": "FEMALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748392825522,
        "seatName": null
    },
    {
        "idTicket": 7,
        "user": {
            "idUser": 16,
            "fullName": "Nguyên thanh h?u",
            "phone": "",
            "address": "",
            "email": "",
            "dateOfBirth": "2001-09-08T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "",
            "sex": "MALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748394675226,
        "seatName": null
    },
    {
        "idTicket": 8,
        "user": {
            "idUser": 16,
            "fullName": "Nguyên thanh h?u",
            "phone": "",
            "address": "",
            "email": "",
            "dateOfBirth": "2001-09-08T00:00:00.000+00:00",
            "userType": "CUSTOMER",
            "cardNumber": "",
            "sex": "MALE"
        },
        "flight": {
            "idFlight": 5,
            "planeId": 3,
            "departureDate": "2025-05-07",
            "departureTime": "16:54:00",
            "durationMinutes": 1000,
            "commonFare": 23232,
            "vipFare": 3232,
            "fromLocation": {
                "id": 1,
                "name": "Noi Bai International Airport",
                "nameCode": "HAN"
            },
            "toLocation": {
                "id": 6,
                "name": "Cam Ranh International Airport",
                "nameCode": "CXR"
            },
            "createdAt": null,
            "bookedEconomyCustomerNumber": 0,
            "bookedVipCustomerNumber": 0,
            "economySeats": 0,
            "vipSeats": 0
        },
        "ticketType": "ECONOMY",
        "price": 23232,
        "baggageId": 0,
        "returnTicket": null,
        "bookingId": 0,
        "createdAt": 1748394675250,
        "seatName": null
    }
]
*/