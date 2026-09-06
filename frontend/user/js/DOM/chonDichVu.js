import { createBooking } from "../../../APIs/booking.js";
window.addEventListener('load', async () => {
    createViewFlights();
    createViewCustomers();
    updateTotalPrice();
    document.getElementById('bt-thanh-toan').addEventListener('click', tranferToThanhToan);
})
function tranferToThanhToan() {
    window.location.href = 'thanhToan.html';
}
// async function handleThanhToan() {
//     const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
//     const customerData = JSON.parse(sessionStorage.getItem('customerData'));
//     const bookingData = {
//         paymentMethod: "CREDIT_CARD",
//         departureFlightId: customerSelectedFight.departureFlightASeat.flight.idFlight,
//         departureTicketType: customerSelectedFight.departureFlightASeat.TicketType,
//         tickets: customerData.map(user => ({
//             seatId: user.departureSeat,
//             user: {
//                 fullName: user.fullName,
//                 phone: user.phone,
//                 email: user.email,
//                 cardNumber: user.cardNumber,
//                 address: user.address,
//                 sex: (user.sex === "") ? null : user.sex,
//                 dayOfBirth: user.dayOfBirth,
//             },
//             returnTicket: {
//                 seatId: user.returnSeat
//             }
//         }))
//     };

//     if (customerSelectedFight.returnFlightASeat) {
//         bookingData.returnFlightId = customerSelectedFight.returnFlightASeat.flight.idFlight;
//         bookingData.returnTicketType = customerSelectedFight.returnFlightASeat.TicketType;
//     }
//     // sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
//     console.log(bookingData);
//     const response = await createBooking(bookingData);
//     alert('Đặt vé thành công');
//     window.location.href = 'timChuyenBay.html';

// }

function createViewFlights() {
    const parentNode = document.body.querySelector('.section');
    const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
    parentNode.appendChild(createViewFlight(customerSelectedFight.departureFlightASeat.flight, customerSelectedFight.departureFlightASeat.styleSeat));
    if (customerSelectedFight.returnFlightASeat != null) {
        parentNode.appendChild(createViewFlight(customerSelectedFight.returnFlightASeat.flight, customerSelectedFight.returnFlightASeat.styleSeat));
    }
}
function createViewFlight(flight, styleSeat) {
    const viewFlistBox = document.createElement('div');
    viewFlistBox.className = 'section-content';

    // Tính thời gian bay
    const departure = new Date(`${flight.departureDate}T${flight.departureTime}`);
    const durationMs = flight.durationMinutes * 60000;
    const arrival = new Date(departure.getTime() + durationMs);
    const hours = Math.floor(flight.durationMinutes / 60);
    const minutes = flight.durationMinutes % 60;

    // Format ngày bay (ví dụ: Thứ Bảy, 10 tháng 5, 2025)
    const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = departure.toLocaleDateString('vi-VN', dayOptions);

    // Format giờ đến
    const arrivalTime = arrival.toTimeString().slice(0, 5);

    viewFlistBox.innerHTML = `
        <div class="flight-info">
            <div>
                <div class="flight-route">${flight.fromLocation.name} đến ${flight.toLocation.name}</div>
                <div class="flight-date">${formattedDate}</div>
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
        </div>
        <div class="flight-details">
            <div class="flight-detail-item">
               | Thời gian bay ${hours}h ${minutes}phút
            </div>
            <div class="flight-detail-item">
               | VN${flight.idFlight} Khai thác bởi ${flight.plane.namePlane}
            </div>
            <div class="flight-detail-item">
               | Bay thẳng
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
            <div>
                ${styleSeat === 'common' ? '<div style="font-weight: 500;">Phổ thông</div>' : ''}
                ${styleSeat === 'vip' ? '<div style="font-weight: 500;">Thương gia</div>' : ''}                     
            </div>
        </div>
    `;

    return viewFlistBox;
}
function createViewCustomers() {
    const parentNode = document.getElementById('section-customers');
    const customers = JSON.parse(sessionStorage.getItem('customerData'));
    customers.forEach(element => {
        parentNode.appendChild(createViewCustomer(element))
    });

}

function createViewCustomer(person) {
    const passengeInfo = document.createElement('div');
    passengeInfo.className = 'passenger-info';
    passengeInfo.innerHTML = `
                <div class="passenger">
                    <div>
                        <div class="passenger-name">${person.fullName}</div>
                        <div class="passenger-contact">${person.dayOfBirth}</div>
                        <div class="passenger-contact">${person.sex === 'MALE' ? 'Nam' : 'Nữ'}</div>
                        ${person.phone ? `<div class="passenger-contact">SĐT: ${person.phone}</div>` : ''}
                        ${person.email ? `<div class="passenger-contact">Email: ${person.email}</div>` : ''}
                        ${person.cardNumber ? `<div class="passenger-contact">CCCD: ${person.cardNumber}</div>` : ''}
                    </div>
                </div>
                `;
    return passengeInfo;
}
function updateTotalPrice() {
    const totalPriceView = document.getElementById('total-price');
    const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
    let totalPrice = 0;
    if (customerSelectedFight.departureFlightASeat.TicketType === 'ECONOMY') {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.commonFare;
    }
    else {
        totalPrice += customerSelectedFight.departureFlightASeat.flight.vipFare;
    }
    if (customerSelectedFight.returnFlightASeat != null) {
        if (customerSelectedFight.returnFlightASeat.TicketType === 'ECONOMY') {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.commonFare;
        }
        else {
            totalPrice += customerSelectedFight.returnFlightASeat.flight.vipFare;
        }
    }
    const customerNumber = JSON.parse(sessionStorage.getItem('customerData')).length;

    const formattedPrice = (totalPrice * customerNumber).toLocaleString('vi-VN');
    totalPriceView.innerHTML = `${formattedPrice} VND`;
}

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
    alert('Lỗi: ' + event.reason?.response?.data?.message);
});



// {
//     "paymentMethod": "CREDIT_CARD",
//     "departureFlightId": 5,
//     "tickets": [
//         {
//             "user": {
//                 "fullName": "Nguyễn Văn Lợi",
//                 "phone": "0324-323-2132",
//                 "email": "miduyen792001@gmail.com",
//                 "cardNumber": "",
//                 "address": "",
//                 "sex": "MALE",
//                 "dayOfBirth": "2003-09-08"
//             }
//         },
//         {
//             "user": {
//                 "fullName": "Nguyễn Thanh Thu",
//                 "phone": "",
//                 "email": "",
//                 "cardNumber": "",
//                 "address": "",
//                 "sex": "FEMALE",
//                 "dayOfBirth": "2001-09-08"
//             }
//         }
//     ]
// }

// {
//     "paymentMethod": "CREDIT_CARD",
//     "departureFlightId": 5,
//     "departureTicketType": "ECONOMY",
//     "tickets": [
//         {
//             "user": {
//                 "fullName": "Nguyễn Văn C",
//                 "phone": "0123456789",
//                 "email": "nguyenvana@example.com",
//                 "cardNumber": "123456789",
//                 "address": "123 Đường ABC, Quận XYZ, TP.HCM",
//                 "sex": "MALE",
//                 "dayOfBirth": "1990-01-01",
//                 "userType": "CUSTOMER"
//             }
//         },
//         {
//             "user": {
//                 "fullName": "Trần Thị B",
//                 "phone": "0987654321",
//                 "email": "tranthib@example.com",
//                 "cardNumber": "987654321",
//                 "address": "456 Đường XYZ, Quận ABC, TP.HCM",
//                 "sex": "FEMALE",
//                 "dayOfBirth": "1992-02-02",
//                 "userType": "CUSTOMER"
//             }
//         }
//     ]
// }