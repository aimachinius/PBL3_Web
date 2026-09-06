import {

    getFlightSeatsByFlightId,

} from '../../../APIs/flight.js';

window.addEventListener("load", init)
let selectingCustomer = null;
const customers = JSON.parse(sessionStorage.getItem('customerData'));
const customerSelectedFight = JSON.parse(sessionStorage.getItem('customerSelectedFight'));
let currentWorkSpace = "departure";
let currentTypeTicket = '';
let currentSeatMap = [];

window.addEventChooseCustomer = function (customerId) {
    const customer = customers.find(customer => customer.idCustomer == customerId);
    selectingCustomer = customer;
    console.log(selectingCustomer);
    const tableCustomer = document.getElementById('table-customer');
    tableCustomer.querySelectorAll('.bg-blue-300').forEach(card => {
        card.classList.remove('bg-blue-300');
    });
    const cardCustomer = document.getElementById(`customer-${customerId}`);
    cardCustomer.classList.add('bg-blue-300');
}
async function changeWorkSpace(workSpace) {

    if (customerSelectedFight.returnFlightASeat != null) {

        document.getElementById("title-work-space")
            .innerHTML = `<div class="w-full p-5">
                    <div class="font-bold text-lg">${workSpace == 'departure' ? 'Chuyến bay đi ->' : '<- Chuyến bay về'}</div>
                </div>`;
    }

    currentWorkSpace = workSpace;
    if (workSpace == 'departure') {
        currentTypeTicket = customerSelectedFight.departureFlightASeat.TicketType;
        currentSeatMap = await getFlightSeatsByFlightId(customerSelectedFight.departureFlightASeat.flight.idFlight);
    }
    else if (workSpace == 'return' && customerSelectedFight.returnFlightASeat != null) {
        currentTypeTicket = customerSelectedFight.returnFlightASeat.TicketType;
        currentSeatMap = await getFlightSeatsByFlightId(customerSelectedFight.returnFlightASeat.flight.idFlight);
    }
    showSeatMap(currentSeatMap);
    initTableCustomer(customers);
}

window.changeWorkSpace = changeWorkSpace;


async function init() {
    // const customerSelectedFight = {
    //     "departureFlightASeat": {
    //         "flight": {
    //             "idFlight": 14,
    //             "planeId": 11,
    //             "departureDate": "2025-06-20",
    //             "departureTime": "16:03:00",
    //             "durationMinutes": 120,
    //             "commonFare": 12000,
    //             "vipFare": 1200000,
    //             "fromLocation": {
    //                 "id": 1,
    //                 "name": "Noi Bai International Airport",
    //                 "nameCode": "HAN"
    //             },
    //             "toLocation": {
    //                 "id": 3,
    //                 "name": "Da Nang International Airport",
    //                 "nameCode": "DAD"
    //             },
    //             "createdAt": null,
    //             "bookedEconomyCustomerNumber": 0,
    //             "bookedVipCustomerNumber": 0,
    //             "economySeats": 0,
    //             "vipSeats": 0,
    //             "plane": {
    //                 "idPlane": 11,
    //                 "namePlane": "YYY",
    //                 "status": "ACTIVE",
    //                 "flightHours": 1200,
    //                 "seatCount": 0
    //             },
    //             "availableEconomyTicket": 36,
    //             "availableBusinessTicket": 2
    //         },
    //         "TicketType": "ECONOMY"
    //     },
    //     "returnFlightASeat": null
    // }
    // const customers_ = [
    //     {
    //         "fullName": "Nguyễn Văn Lợi",
    //         "phone": "0324-323-2132",
    //         "email": "miduyen792001@gmail.com",
    //         "cardNumber": "",
    //         "address": "",
    //         "sex": "MALE",
    //         "dayOfBirth": "2025-06-26",
    //         "userType": "CUSTOMER"
    //     },
    //     {
    //         "fullName": "Nguyễn Thanh Thu",
    //         "phone": "0324-323-2132",
    //         "email": "miduyen792001@gmail.com",
    //         "cardNumber": "",
    //         "address": "",
    //         "sex": "FEMALE",
    //         "dayOfBirth": "2025-06-19",
    //         "userType": "CUSTOMER"
    //     }
    // ];
    // sessionStorage.setItem('customerData', JSON.stringify(customers_));
    // sessionStorage.setItem('customerSelectedFight', JSON.stringify(customerSelectedFight));

    selectingCustomer = customers[0];
    changeWorkSpace('departure')

    if (customerSelectedFight.returnFlightASeat == null) {
        document.querySelectorAll('.change-work-space-button')?.forEach(btn => btn.classList.add('hidden'))
    }
}
function initTableCustomer(customers) {
    const tableCustomer = document.getElementById('table-customer');
    tableCustomer.innerHTML = '';
    let index = 0;
    customers.forEach(customer => {
        customer.idCustomer = index++;
        let seatChosen = customer.departureSeat;
        if (currentWorkSpace == 'return')
            seatChosen = customer.returnSeat;
        tableCustomer.innerHTML += `
        <div class="w-full p-2 ${customer.idCustomer == selectingCustomer?.idCustomer ? 'bg-blue-300' : ''}" id="customer-${customer.idCustomer}" onclick="addEventChooseCustomer(${customer.idCustomer})">
                    <div class="font-bold">${customer.fullName}</div>
                    <div class="text-sm">${seatChosen == null ? 'Chưa chọn chỗ' : seatChosen}</div>
                </div>
        `;
    });
}

function showSeatMap(flight_seats) {
    //show sơ đồ ghế
    const seat_map = document.getElementById('seat-map-container');
    seat_map.innerHTML = '';

    const head_seat_map = document.createElement('div');
    head_seat_map.className = "flex w-full mb-4";
    head_seat_map.innerHTML = `
        <div class="w-10"></div>
    `;
    const seat_map_row = document.createElement('div');
    seat_map_row.className = "flex justify-around flex-1 w-full";
    head_seat_map.appendChild(seat_map_row);
    seat_map.appendChild(head_seat_map);

    //tìm số hàng lơn nhất và số ghế lớn nhất
    const seatNumbers = flight_seats.map(flight_seat => flight_seat.seat.seatNumber);

    // seatNumbers.sort((a, b) => {
    //     const [numA, charA] = [parseInt(a), a.match(/[A-Z]/i)[0]];
    //     const [numB, charB] = [parseInt(b), b.match(/[A-Z]/i)[0]];

    //     if (numA === numB) {
    //         return charA.localeCompare(charB); // so sánh chữ cái
    //     }
    //     return numA - numB; // so sánh số
    // });
    let maxNumber = 0;
    let maxLetter = '';

    seatNumbers.forEach(sn => {
        const number = parseInt(sn.match(/\d+/)[0]); // lấy phần số
        const letter = sn.match(/[A-Z]/i)[0];        // lấy phần chữ cái

        if (number > maxNumber) {
            maxNumber = number;
        }

        if (letter > maxLetter) {
            maxLetter = letter;
        }
    });
    const rowNumber = maxNumber;
    const rowSeat = maxLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

    for (let i = 0; i < rowSeat; i++) {
        const column = document.createElement('div');
        column.className = "text-center font-semibold";
        column.innerHTML = String.fromCharCode(65 + i);
        seat_map_row.appendChild(column);
    }

    for (let i = 0; i < rowNumber; i++) {
        const row = document.createElement('div');
        row.className = "flex mt-3 w-full";
        row.innerHTML = `
                <div class="w-10 text-center font-semibold">${i}</div> 
                <div id="seat-map-row-${i}" class="flex justify-around flex-1 w-full">
                </div>`;
        seat_map.appendChild(row);
        const current_row_seat = row.querySelector(`#seat-map-row-${i}`);
        for (let j = 0; j < rowSeat; j++) {
            const seat = document.createElement('div');
            seat.className = "seat seat-blocked invisible";

            const seatObject = getSeatByNumber(flight_seats, `${i}${String.fromCharCode(65 + j)}`);
            if (seatObject) {



                const customer = customers.find(customer => {
                    if (currentWorkSpace == 'return')
                        return customer.returnSeat == `${i}${String.fromCharCode(65 + j)}`

                    return customer.departureSeat == `${i}${String.fromCharCode(65 + j)}`
                });
                if (seatObject.seatStatus != 'NOT_BOOKED') {
                    seat.className = "seat seat-unavailable";
                }
                else if (currentTypeTicket != seatObject.seat.seatType) {
                    seat.className = "seat seat-blocked";
                }
                else if (customer) {
                    const words = customer.fullName.trim().split(" ");
                    const lastWord = words[words.length - 1];
                    const firstTwoChars = lastWord.slice(0, 2);
                    seat.className = "seat seat-selected";
                    seat.innerHTML = `<div class="text-sm">${firstTwoChars}</div>`;
                    seat.setAttribute("customerId", customer.idCustomer);
                    seat.addEventListener('click', () => {
                        const idCustomer = seat.getAttribute("customerId");
                        const wantRemoveSeatCustomer = customers.find(customer => customer.idCustomer == idCustomer);
                        if (currentWorkSpace == 'return')
                            wantRemoveSeatCustomer.returnSeat = null;
                        else
                            wantRemoveSeatCustomer.departureSeat = null;
                        initTableCustomer(customers);
                        showSeatMap(currentSeatMap);
                    });
                }
                else {
                    seat.className = "seat seat-free";
                    seat.addEventListener('click', () => {

                        if (selectingCustomer) {
                            if (currentWorkSpace == 'return')
                                selectingCustomer.returnSeat = `${i}${String.fromCharCode(65 + j)}`
                            else
                                selectingCustomer.departureSeat = `${i}${String.fromCharCode(65 + j)}`
                            initTableCustomer(customers);
                            showSeatMap(currentSeatMap);
                        }
                    });
                }

            }
            current_row_seat.appendChild(seat);
        }
    }
}
function getSeatByNumber(flight_seats, seatNumber) {
    const result = flight_seats.find(
        flight_seat => flight_seat.seat.seatNumber === seatNumber
    );
    return result ? result : null;
}
window.completeSelectSeat = function () {
    sessionStorage.setItem('customerData', JSON.stringify(customers));
    window.location.href = 'chonDichVu.html';
}