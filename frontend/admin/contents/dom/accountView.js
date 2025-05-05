import {
    getFlightById,
    addFlight,
    updateFlight,
    deleteFlight,
    getAllFlights
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

export default async function loadAccountView() {
    selectedFlight = null;
    let locationList = await getAllLocation(); // <-- lấy dữ liệu

    populateLocationSelect("from", locationList);
    populateLocationSelect("to", locationList);
    planesSelect("mayBay", await getAllPlanes());

    const addBtn = document.getElementById("add-plane-btn");
    const editBtn = document.getElementById("edit-plane-btn");
    const removeBtn = document.getElementById("remove-plane-btn");
    const formContainer = document.getElementById("plane-form-container");
    const flightForm = document.getElementById("plane-form");

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

    removeBtn.addEventListener("click", async () => {
        if (!selectedFlight) return;
        await deleteFlight(selectedFlight.idFlight);
        selectedFlight = null;
        loadFlightsTable(await getAllFlights());
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
        loadFlightsTable(await getAllFlights());
    });

    formContainer.addEventListener("click", (e) => {
        if (!flightForm.contains(e.target)) {
            formContainer.classList.add("hidden");
        }
    });

    loadFlightsTable(await getAllFlights());
}

function planesSelect(selectId, planes) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="" disabled selected>Chọn máy bay</option>`;
    planes.forEach(plane => {
        const opt = document.createElement("option");
        opt.value = JSON.stringify(plane);
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
    container.classList.remove("hidden");
}

function clearForm() {
    const form = document.getElementById("plane-form");
    form.reset();
}

function fillForm(flight) {
    const form = document.getElementById("plane-form");

    form["mayBay"].value = JSON.stringify(flight.plane);
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
        plane: JSON.parse(f["mayBay"].value),
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
        row.className = "bg-gray-100 hover:bg-amber-100";
        row.setAttribute("flight", JSON.stringify(flight));

        row.innerHTML = `
            <td class="border px-2 py-1">${flight.plane?.namePlane || ""}</td>
            <td class="border px-2 py-1">${flight.fromLocation?.name || ""}</td>
            <td class="border px-2 py-1">${flight.toLocation?.name || ""}</td>
            <td class="border px-2 py-1">${flight.departureDate} | ${flight.departureTime}</td>
            <td class="border px-2 py-1">${flight.durationMinutes} phút</td>
            <td class="border px-2 py-1">${flight.vipFare}</td>
            <td class="border px-2 py-1">${flight.commonFare}</td>
            <td class="border px-2 py-1">${flight.boughtTicket?.length || 0}</td>
        `;

        row.addEventListener("click", () => {
            table.querySelectorAll("tr").forEach(r => {
                r.classList.remove("bg-amber-300");
                r.classList.add("bg-gray-100");
            });
            selectedFlight = JSON.parse(row.getAttribute("flight"));
            row.classList.remove("bg-gray-100");
            row.classList.add("bg-amber-300");
        });

        table.appendChild(row);
    });
}
