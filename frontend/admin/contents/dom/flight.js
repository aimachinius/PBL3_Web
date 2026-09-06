import {
    getFlightById,
    addFlight,
    updateFlight,
    deleteFlight,
    getAllFlights,
    getFlightSeatsByFlightId,
    getFlightInformation
} from '../../../APIs/flight.js';

import {
    getAllLocation
} from '../../../APIs/location.js'

import {
    getAllPlanes,
    getPlaneById,
    addPlane,
    updatePlane,
    deletePlane
} from '../../../APIs/plane.js';


let selectedFlight;
let allFlights = []; // Lưu tất cả chuyến bay
let currentFilter = 'all'; // Bộ lọc hiện tại: 'all', 'upcoming', 'past'

export default async function loadFlightJS() {
    selectedFlight = null;
    let locationList = await getAllLocation(); // <-- lấy dữ liệu

    populateLocationSelect("from", locationList);
    populateLocationSelect("to", locationList);
    planesSelect("mayBay", await getAllPlanes());

    const addBtn = document.getElementById("add-flight-btn");
    const editBtn = document.getElementById("edit-flight-btn");
    const removeBtn = document.getElementById("remove-flight-btn");
    const viewFlightBtn = document.getElementById("view-flight-btn");
    const formContainer = document.getElementById("plane-form-container");
    const flightForm = document.getElementById("plane-form");
    const viewSeatMapBtn = document.getElementById("view-seat-map-btn");

    // Thêm event listeners cho các nút lọc
    const filterAllBtn = document.getElementById("filter-all-btn");
    const filterUpcomingBtn = document.getElementById("filter-upcoming-btn");
    const filterPastBtn = document.getElementById("filter-past-btn");

    filterAllBtn.addEventListener("click", () => {
        currentFilter = 'all';
        updateFilterButtons();
        loadFlightsTable(filterFlights(allFlights));
    });

    filterUpcomingBtn.addEventListener("click", () => {
        currentFilter = 'upcoming';
        updateFilterButtons();
        loadFlightsTable(filterFlights(allFlights));
    });

    filterPastBtn.addEventListener("click", () => {
        currentFilter = 'past';
        updateFilterButtons();
        loadFlightsTable(filterFlights(allFlights));
    });

    addBtn.addEventListener("click", () => {
        selectedFlight = null;
        showForm("Thêm chuyến bay", "Lưu chuyến bay");
        clearForm();
    });

    editBtn.addEventListener("click", () => {
        if (!selectedFlight) return;
        showForm("Chỉnh sửa chuyến bay", "Hoàn tất chỉnh sửa");
        fillForm(selectedFlight);
    });

    //show sơ đồ ghế
    viewSeatMapBtn.addEventListener("click", async () => {
        console.log(selectedFlight);
        if (!selectedFlight) return;
        showSeatMap(await getFlightSeatsByFlightId(selectedFlight.idFlight));
    });

    removeBtn.addEventListener("click", async () => {
        if (!selectedFlight) return;
        await deleteFlight(selectedFlight.idFlight);
        selectedFlight = null;
        allFlights = await getAllFlights();
        loadFlightsTable(filterFlights(allFlights));
    });

    flightForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const flightData = getFlightFromForm(e);

        if (selectedFlight) {
            await updateFlight(selectedFlight.idFlight, flightData);
        } else {
            await addFlight(flightData);
        }
        selectedFlight = null;
        formContainer.classList.add("hidden");
        allFlights = await getAllFlights();
        loadFlightsTable(filterFlights(allFlights));
    });

    formContainer.addEventListener("click", (e) => {
        if (!flightForm.contains(e.target)) {
            formContainer.classList.add("hidden");
        }
    });

    viewFlightBtn.addEventListener("click", async () => {
        if (!selectedFlight) return;
        await showFlight(selectedFlight);
    });

    const viewFlightContainer = document.getElementById("view-flight-container");
    const viewFlightContent = document.getElementById("view-flight-content");
    viewFlightContainer.addEventListener("click", (e) => {
        if (!viewFlightContent.contains(e.target)) {
            viewFlightContainer.classList.add("hidden");
        }
    });

    //tat xem sơ đồ ghế
    const seat_map_view_container = document.getElementById('view-map-seat-container');
    const seat_map_parent_container = document.getElementById('view-map-seat-content-container');
    seat_map_view_container.addEventListener('click', (e) => {
        if (!seat_map_parent_container.contains(e.target)) {
            seat_map_view_container.classList.add("hidden");
        }
    });

    // Load dữ liệu ban đầu
    allFlights = await getAllFlights();
    updateFilterButtons();
    loadFlightsTable(filterFlights(allFlights));
}

// Hàm lọc chuyến bay theo trạng thái
function filterFlights(flights) {
    const now = new Date();

    switch (currentFilter) {
        case 'upcoming':
            return flights.filter(flight => {
                const flightDateTime = new Date(`${flight.departureDate}T${flight.departureTime}`);
                return flightDateTime > now;
            });
        case 'past':
            return flights.filter(flight => {
                const flightDateTime = new Date(`${flight.departureDate}T${flight.departureTime}`);
                return flightDateTime <= now;
            });
        case 'all':
        default:
            return flights;
    }
}

// Hàm cập nhật trạng thái nút lọc
function updateFilterButtons() {
    const filterAllBtn = document.getElementById("filter-all-btn");
    const filterUpcomingBtn = document.getElementById("filter-upcoming-btn");
    const filterPastBtn = document.getElementById("filter-past-btn");

    // Reset tất cả nút về trạng thái mặc định
    [filterAllBtn, filterUpcomingBtn, filterPastBtn].forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-200", "text-gray-700");
    });

    // Highlight nút được chọn
    switch (currentFilter) {
        case 'all':
            filterAllBtn.classList.remove("bg-gray-200", "text-gray-700");
            filterAllBtn.classList.add("bg-blue-600", "text-white");
            break;
        case 'upcoming':
            filterUpcomingBtn.classList.remove("bg-gray-200", "text-gray-700");
            filterUpcomingBtn.classList.add("bg-blue-600", "text-white");
            break;
        case 'past':
            filterPastBtn.classList.remove("bg-gray-200", "text-gray-700");
            filterPastBtn.classList.add("bg-blue-600", "text-white");
            break;
    }
}

// Hàm kiểm tra chuyến bay đã bay hay chưa
function isFlightPast(flight) {
    const departure = new Date(`${flight.departureDate}T${flight.departureTime}`);
    const landing = new Date(departure.getTime() + flight.durationMinutes * 60000);
    return new Date() > landing;
}

function isFlightInProgress(flight) {
    const now = new Date();
    const departure = new Date(`${flight.departureDate}T${flight.departureTime}`);
    const landing = new Date(departure.getTime() + flight.durationMinutes * 60000);
    return now >= departure && now <= landing;
}


async function showFlight(flight) {
    const viewFlightContainer = document.getElementById("view-flight-container");
    const viewFlightContent = document.getElementById("view-flight-content");
    const ticketsList = document.getElementById("tickets-list");

    viewFlightContainer.classList.remove("hidden");
    // viewFlightContent.innerHTML = '';
    // Điền thông tin máy bay
    viewFlightContainer.querySelector("#mayBay").textContent = flight.plane?.namePlane;

    // Điền thông tin điểm đi/đến
    viewFlightContainer.querySelector("#from").textContent = flight.fromLocation.name;
    viewFlightContainer.querySelector("#to").textContent = flight.toLocation.name;

    // Điền thông tin thời gian bay
    const departureDate = new Date(flight.departureDate);
    viewFlightContainer.querySelector("#departureDate").textContent = departureDate.toLocaleString('vi-VN');

    // Điền thông tin thời lượng và giá vé
    viewFlightContainer.querySelector("#durationMinutes").textContent = flight.durationMinutes;
    viewFlightContainer.querySelector("#commonFare").textContent = flight.commonFare.toLocaleString('vi-VN') + ' VND';
    viewFlightContainer.querySelector("#vipFare").textContent = flight.vipFare.toLocaleString('vi-VN') + ' VND';

    // Thống kê số ghế
    const flightInformation = await getFlightInformation(flight.idFlight);

    console.log("flightInformation: ", flightInformation);

    // Đếm số vé đã đặt theo loại
    const bookedEconomyTickets = flightInformation.bookedTickets.filter(ticket => (ticket.ticketType === "ECONOMY" && ticket.flight.idFlight === flight.idFlight)
        || (ticket.returnTicket && ticket.returnTicket.flight.idFlight === flight.idFlight && ticket.returnTicket.ticketType === "ECONOMY")
    );

    const bookedBusinessTickets = flightInformation.bookedTickets.filter(ticket => (ticket.ticketType === "BUSINESS" && ticket.flight.idFlight === flight.idFlight)
        || (ticket.returnTicket && ticket.returnTicket.flight.idFlight === flight.idFlight && ticket.returnTicket.ticketType === "BUSINESS")
    );
    flightInformation.bookedEconomyTickets = bookedEconomyTickets;
    flightInformation.bookedBusinessTickets = bookedBusinessTickets;

    viewFlightContainer.querySelector("#vip-booked").textContent = flightInformation.bookedBusinessTickets.length;
    viewFlightContainer.querySelector("#vip-available").textContent = flightInformation.businessSeatNumber - flightInformation.bookedBusinessTickets.length;
    viewFlightContainer.querySelector("#economy-booked").textContent = flightInformation.bookedEconomyTickets.length;
    viewFlightContainer.querySelector("#economy-available").textContent = flightInformation.economySeatNumber - flightInformation.bookedEconomyTickets.length;

    //show danh sách vé
    ticketsList.innerHTML = flightInformation.bookedTickets.map(ticket => {
        return `
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
    `;
    }).join('');
}

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

function showSeatMap(flight_seats) {
    const SeatNumber = { bookedBusiness: 0, bookedEconomy: 0, notBookedBusiness: 0, notBookedEconomy: 0 };
    //show sơ đồ ghế
    const seat_map = document.getElementById('seat-map-container');
    const view_map_seat_container = document.getElementById('view-map-seat-container');
    view_map_seat_container.classList.remove('hidden');
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

                if (seatObject.seatStatus != 'NOT_BOOKED') {
                    if (seatObject.seat.seatType == 'BUSINESS') {
                        seat.className = "seat seat-booked-business";
                        SeatNumber.bookedBusiness++;
                    }// booked cho vip
                    else {
                        seat.className = "seat seat-booked-economy";
                        SeatNumber.bookedEconomy++;
                    } // booked cho economy-class

                }
                else {
                    if (seatObject.seat.seatType == 'BUSINESS') {
                        seat.className = "seat seat-not-booked-business";
                        SeatNumber.notBookedBusiness++;
                    } //  cho vip
                    else {
                        SeatNumber.notBookedEconomy++;
                        seat.className = "seat seat-not-booked-economy"
                    }; // cho economy-class
                }

            }
            current_row_seat.appendChild(seat);
        }
    }
    const inforSeatmapDiv = document.getElementById('infor-Seat-map-Div');
    inforSeatmapDiv.innerHTML = `
    <div class="flex flex-col items-center w-full bg-amber-50 rounded-xl mt-4 p-4">
                    <div class="flex gap-4">
                        <div class="text-sm">
                            Thương gia đã chọn: <span class="font-semibold">${SeatNumber.bookedBusiness}</span>
                        </div>
                       <div class="text-sm">
                            Phổ thông đã chọn: <span class="font-semibold">${SeatNumber.bookedEconomy}</span>
                        </div>
                       <div class="text-sm">
                            Thương gia trống: <span class="font-semibold">${SeatNumber.notBookedBusiness}</span>
                        </div>
                        <div class="text-sm">
                            Phổ thông trống: <span class="font-semibold">${SeatNumber.notBookedEconomy}</span>
                        </div>
                        <div class="text-sm">
                            Tổng số ghế: <span class="font-semibold">${SeatNumber.bookedBusiness + SeatNumber.bookedEconomy + SeatNumber.notBookedBusiness + SeatNumber.notBookedEconomy}</span>
                        </div>
                    </div>
                </div>
    `
    document.getElementById('view-map-seat-content-container').appendChild(inforSeatmapDiv);
}

function getSeatByNumber(flight_seats, seatNumber) {
    const result = flight_seats.find(
        flight_seat => flight_seat.seat.seatNumber === seatNumber
    );
    return result ? result : null;
}

function planesSelect(selectId, planes) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="" disabled selected>Chọn máy bay</option>`;
    planes.forEach(plane => {
        const opt = document.createElement("option");
        opt.value = plane.idPlane;
        opt.textContent = plane.namePlane;
        select.appendChild(opt);
    });
}

function populateLocationSelect(selectId, locations) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="" disabled selected>Chọn địa điểm</option>`;
    locations.forEach(loc => {
        const opt = document.createElement("option");
        opt.value = JSON.stringify(loc);
        opt.textContent = loc.name;
        select.appendChild(opt);
    });
}

function showForm(title, buttonLabel) {
    const container = document.getElementById("plane-form-container");

    container.querySelector('#form-title').textContent = title;
    container.querySelector('#submit-form-btn').textContent = buttonLabel;
    const inputPlaneDiv = container.querySelector('#box-input-plane');
    if (title == "Chỉnh sửa chuyến bay") {
        inputPlaneDiv.classList.add('hidden')
    }
    else {
        inputPlaneDiv.classList.remove('hidden')
    }
    container.classList.remove("hidden");
}

function clearForm() {
    const form = document.getElementById("plane-form");
    form.reset();
}

function fillForm(flight) {
    const form = document.getElementById("plane-form");

    form["mayBay"].value = flight.plane.idPlane;
    form["from"].value = JSON.stringify(flight.fromLocation);
    form["to"].value = JSON.stringify(flight.toLocation);

    // Ghép ngày và giờ để đổ vào datetime-local
    if (flight.departureDate && flight.departureTime) {
        const dateTimeStr = `${flight.departureDate}T${flight.departureTime.slice(0, 5)}`; // "yyyy-MM-ddTHH:mm"
        form["departureDate"].value = dateTimeStr;
    }

    form["durationMinutes"].value = flight.durationMinutes || "";
    form["commonFare"].value = flight.commonFare || "";
    form["vipFare"].value = flight.vipFare || "";
}

function getFlightFromForm(e) {
    const f = e.target.elements;
    const [datePart, rawTimePart] = f["departureDate"].value.split("T");
    const timePart = rawTimePart.length === 5 ? rawTimePart + ":00" : rawTimePart;
    return {
        plane: { idPlane: f["mayBay"].value },
        fromLocation: JSON.parse(f['from'].value),
        toLocation: JSON.parse(f['to'].value),
        departureDate: datePart,
        departureTime: timePart,
        durationMinutes: parseInt(f["durationMinutes"].value, 10),
        commonFare: parseInt(f["commonFare"].value, 10),
        vipFare: parseInt(f["vipFare"].value, 10)
    };
}

function loadFlightsTable(flights) {
    const table = document.getElementById("plane-table-body");
    table.innerHTML = '';

    flights.forEach(flight => {
        const row = document.createElement("tr");

        const isPast = isFlightPast(flight);
        const isFlying = isFlightInProgress(flight);

        if (isPast) {
            row.className = "bg-red-50 hover:bg-red-100 opacity-75";
        } else if (isFlying) {
            row.className = "bg-blue-50 hover:bg-blue-100";
        } else {
            row.className = "bg-gray-100 hover:bg-amber-100";
        }

        row.setAttribute("flight", JSON.stringify(flight));

        let statusBadge = '';
        if (isPast) {
            statusBadge = '<span class="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">Đã bay</span>';
        } else if (isFlying) {
            statusBadge = '<span class="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">Đang bay</span>';
        } else {
            statusBadge = '<span class="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">Chưa bay</span>';
        }


        row.innerHTML = `
            <td class="border px-2 py-1">
                <div>VN${flight.idFlight}</div>
                <div class="mt-1">${statusBadge}</div>
            </td>
            <td class="border px-2 py-1">${flight.plane?.namePlane || ""}</td>
            <td class="border px-2 py-1">${flight.fromLocation?.name || ""}</td>
            <td class="border px-2 py-1">${flight.toLocation?.name || ""}</td>
            <td class="border px-2 py-1">${flight.departureDate} | ${flight.departureTime}</td>
            <td class="border px-2 py-1">${flight.durationMinutes} phút</td>
            <td class="border px-2 py-1 ">${flight.vipFare.toLocaleString('vi-VN')}VND</td>
            <td class="border px-2 py-1">${flight.commonFare.toLocaleString('vi-VN')}VND</td>
        `;

        row.addEventListener("click", () => {
            table.querySelectorAll("tr").forEach(r => {
                r.classList.remove("bg-amber-300");
                // Khôi phục class gốc
                const flightData = JSON.parse(r.getAttribute("flight"));
                const isFlightPast_ = isFlightPast(flightData);
                r.className = isFlightPast_
                    ? "bg-red-50 hover:bg-amber-100 opacity-75"
                    : "bg-gray-100 hover:bg-amber-100";
            });
            selectedFlight = JSON.parse(row.getAttribute("flight"));
            row.classList.remove("bg-gray-100", "bg-red-50");
            row.classList.add("bg-amber-300");
        });

        table.appendChild(row);
    });

    // Cập nhật thống kê
    updateFlightStats(flights);
}

// Hàm cập nhật thống kê chuyến bay
function updateFlightStats(flights) {
    const now = new Date();
    const upcomingFlights = flights.filter(flight => {
        const flightDateTime = new Date(`${flight.departureDate}T${flight.departureTime}`);
        return flightDateTime > now;
    });
    const pastFlights = flights.filter(flight => {
        const flightDateTime = new Date(`${flight.departureDate}T${flight.departureTime}`);
        return flightDateTime <= now;
    });

    // Cập nhật số liệu trên các nút lọc
    document.getElementById("filter-all-btn").innerHTML = `Tất cả`;
    document.getElementById("filter-upcoming-btn").innerHTML = `Chưa bay`;
    document.getElementById("filter-past-btn").innerHTML = `Đã bay`;
}