import {
    getAllPlanes,
    getPlaneById,
    addPlane,
    updatePlane,
    deletePlane
} from '../../../APIs/plane.js';

let selectedPlane;



const planeFormContainer = document.getElementById("plane-form-container");
export default async function loadPlane() {
    selectedPlane = null;
    const addPlaneBtn = document.getElementById("add-plane-btn");
    const editPlaneBtn = document.getElementById("edit-plane-btn");
    const planeFormContainer = document.getElementById("plane-form-container");
    const planeForm = document.getElementById('plane-form');

    // Lắng nghe sự kiện click vào nút "Thêm máy bay"
    addPlaneBtn.addEventListener("click", function () {
        selectedPlane = null;
        // Toggle trạng thái ẩn/hiện của form nhập liệu
        planeFormContainer.querySelector('#form-title').innerHTML = 'Thêm Máy Bay';
        planeFormContainer.querySelector('#submit-form-btn').innerHTML = 'Lưu máy bay'

        planeFormContainer.querySelector('#namePlane').value = '';
        planeFormContainer.querySelector('#status').value = '';
        planeFormContainer.querySelector('#flightHours').value = '';

        planeFormContainer.classList.toggle("hidden");
    });
    //set edit btn
    editPlaneBtn.addEventListener('click', function () {
        if (selectedPlane == null) return;
        planeFormContainer.querySelector('#form-title').innerHTML = 'Chỉnh sửa thông tin máy bay';
        planeFormContainer.querySelector('#submit-form-btn').innerHTML = 'Hoàn tất chỉnh sửa';


        planeFormContainer.querySelector('#namePlane').value = selectedPlane.namePlane;
        planeFormContainer.querySelector('#status').value = selectedPlane.status;
        planeFormContainer.querySelector('#flightHours').value = selectedPlane.flightHours;

        planeFormContainer.classList.toggle("hidden");
    })

    planeForm.addEventListener('submit', function (e) {
        handelCUSubmit(e);
        planeFormContainer.classList.toggle("hidden");

    });



    const seatMapParentContainer = document.getElementById('seat-map-parent-container');
    planeFormContainer.addEventListener("click", function (event) {
        if (!planeForm.contains(event.target) && !seatMapParentContainer.contains(event.target)) {
            planeFormContainer.classList.add("hidden");
        }
    });

    loadPlanForTable(await getAllPlanes());

    //set remove btn
    document.getElementById('remove-plane-btn').addEventListener('click', async () => {
        if (selectedPlane == null) return;
        await deletePlane(selectedPlane.idPlane);
        loadPlanForTable(await getAllPlanes());
        selectedPlane = null;
    })

    // todo: set create seat map
    document.getElementById('generate-seat-map-btn').addEventListener('click', setCreateSeatMap);

    setActionCreateSeatMap();
}

// set nut bâm chọn ghế
let selectedSeatBtn = 'no-seat';
function setActionCreateSeatMap() {

    const borderColor = 'border-black';
    const borderColorSelected = 'border-amber-500';
    const vipSeat = document.getElementById('vip-seat');
    const economySeat = document.getElementById('economy-seat');
    const noSeat = document.getElementById('no-seat');
    noSeat.classList.remove(borderColor);
    noSeat.classList.add(borderColorSelected);

    let restartSeatBtn = () => {
        vipSeat.classList.remove(borderColorSelected);
        vipSeat.classList.add(borderColor);
        economySeat.classList.remove(borderColorSelected);
        economySeat.classList.add(borderColor);
        noSeat.classList.remove(borderColorSelected);
        noSeat.classList.add(borderColor);
    };

    vipSeat.addEventListener('click', () => {
        selectedSeatBtn = 'vip-seat';
        restartSeatBtn();
        vipSeat.classList.remove(borderColor);
        vipSeat.classList.add(borderColorSelected);
        console.log(selectedSeatBtn);
    });
    economySeat.addEventListener('click', () => {
        selectedSeatBtn = 'economy-seat';
        restartSeatBtn();
        economySeat.classList.remove(borderColor);
        economySeat.classList.add(borderColorSelected);
        console.log(selectedSeatBtn);
    });
    noSeat.addEventListener('click', () => {
        selectedSeatBtn = 'no-seat';
        restartSeatBtn();
        noSeat.classList.remove(borderColor);
        noSeat.classList.add(borderColorSelected);
        console.log(selectedSeatBtn);
    });


}

async function handelCUSubmit(e) {
    e.preventDefault(); // Ngăn submit reload trang
    const tempplane = getPlaneFromForm(e);
    console.log(tempplane);

    if (selectedPlane != null) {

        selectedPlane.namePlane = tempplane.namePlane;
        selectedPlane.status = tempplane.status;
        selectedPlane.seatCount = tempplane.seatCount;
        selectedPlane.flightHours = tempplane.flightHours;
        await updatePlane(selectedPlane);
        selectedPlane = null;
    }
    else {
        const plane = getPlaneFromForm(e);
        await addPlane(plane);
    }
    loadPlanForTable(await getAllPlanes());
    console.log(selectedPlane);
}

function setCreateSeatMap() {

    const vipSeatCount = document.getElementById('vip-seat-count');
    const economySeatCount = document.getElementById('economy-seat-count');
    const totalSeatCount = document.getElementById('total-seat-count');

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



    const rowNumber = document.getElementById('num-rows');
    const rowSeat = document.getElementById('seats-per-row');

    for (let i = 0; i < rowSeat.value; i++) {
        const row = document.createElement('div');
        row.className = "text-center font-semibold";
        row.innerHTML = String.fromCharCode(65 + i);
        seat_map_row.appendChild(row);
    }
    vipSeatCount.innerHTML = 0;
    economySeatCount.innerHTML = rowSeat.value * rowNumber.value;
    totalSeatCount.innerHTML = economySeatCount.innerHTML;


    for (let i = 0; i < rowNumber.value; i++) {
        const row = document.createElement('div');
        row.className = "flex mt-3 w-full";
        row.innerHTML = `
                <div class="w-10 text-center font-semibold">${i + 1}</div> 
                <div id="seat-map-row-${i}" class="flex justify-around flex-1 w-full">
                </div>`;
        seat_map.appendChild(row);
        const current_row_seat = row.querySelector(`#seat-map-row-${i}`);
        for (let j = 0; j < rowSeat.value; j++) {
            const seat = document.createElement('div');
            seat.className = "text-center font-semibold bg-blue-500 hover:bg-white text-white px-4 py-2 rounded-md";
            seat.setAttribute('seat', 'economy-seat');
            seat.setAttribute('seat-number', `${i}${String.fromCharCode(65 + j)}`);
            seat.addEventListener('click', () => {

                seat.setAttribute('seat', selectedSeatBtn);

                if (selectedSeatBtn == 'vip-seat') {
                    seat.className = "text-center font-semibold bg-yellow-500 hover:bg-white text-white px-4 py-2 rounded-md";
                }
                else if (selectedSeatBtn == 'economy-seat') {
                    seat.className = "text-center font-semibold bg-blue-400 hover:bg-white text-white px-4 py-2 rounded-md";
                }
                else if (selectedSeatBtn == 'no-seat') {
                    seat.className = "text-center font-semibold bg-amber-100 hover:bg-white text-white px-4 py-2 rounded-md";
                }
                let _vipSeatCount = 0;
                let _economySeatCount = 0;
                seat_map.querySelectorAll('[seat]').forEach(seat => {
                    if (seat.getAttribute('seat') == 'vip-seat') {
                        _vipSeatCount++;
                    }
                    else if (seat.getAttribute('seat') == 'economy-seat') {
                        _economySeatCount++;
                    }
                });
                vipSeatCount.innerHTML = _vipSeatCount;
                economySeatCount.innerHTML = _economySeatCount;
                totalSeatCount.innerHTML = _vipSeatCount + _economySeatCount;
            });

            // seat.innerHTML = '<button class="bg-blue-500 text-white px-4 py-2 rounded-md"></button>';
            current_row_seat.appendChild(seat);
        }
    }
}


// document.getElementById('generate-seat-map').addEventListener('click', function() {
//     const numRows = parseInt(document.getElementById('num-rows').value);
//     const seatsPerRow = parseInt(document.getElementById('seats-per-row').value);
//     const seatMap = document.getElementById('seat-map');

//     // Xóa sơ đồ cũ nếu có
//     seatMap.innerHTML = '';

//     // Đặt lại grid-template-rows
//     seatMap.style.display = 'grid';
//     seatMap.style.gridTemplateRows = `repeat(${numRows}, auto)`;
//     seatMap.style.gap = '8px';

//     for (let i = 0; i < numRows; i++) {
//         // Tạo 1 hàng ghế
//         const row = document.createElement('div');
//         row.style.display = 'grid';
//         row.style.gridTemplateColumns = `repeat(${seatsPerRow}, 40px)`; // mỗi ghế 40px
//         row.style.gap = '8px';

//         for (let j = 0; j < seatsPerRow; j++) {
//             const seat = document.createElement('div');
//             seat.classList.add('seat');
//             seat.style.width = '40px';
//             seat.style.height = '40px';
//             seat.style.backgroundColor = '#ddd';
//             seat.style.border = '1px solid #999';
//             seat.style.borderRadius = '6px';
//             seat.style.display = 'flex';
//             seat.style.alignItems = 'center';
//             seat.style.justifyContent = 'center';
//             seat.textContent = `${i+1}${String.fromCharCode(65 + j)}`; // Ví dụ 1A, 1B,...
//             row.appendChild(seat);
//         }

//         seatMap.appendChild(row);
//     }
// });


function getPlaneFromForm(e) {
    const f = e.target.elements;
    const seats = [];
    document.querySelectorAll('[seat]').forEach(seat => {
        let seatType = seat.getAttribute('seat');
        if (seatType == 'vip-seat') {
            seatType = 'BUSINESS';
        }
        else if (seatType == 'economy-seat') {
            seatType = 'ECONOMY';
        }
        else if (seatType == 'no-seat') {
            return;
        }
        const newSeat = {
            seatNumber: seat.getAttribute('seat-number'),
            seatType: seatType
        }
        seats.push(newSeat);
    });
    return {
        idPlane: null,
        namePlane: f["namePlane"].value.trim(),
        status: f["status"].value,
        flightHours: parseInt(f["flightHours"].value, 0),
        seats: seats
    };
}

/*
flightHours
: 
12000
idPlane
: 
1
key
: 
1
namePlane
: 
"Airbus A320"
seat
: 
[]
seatCount
: 
180
status
: 
"ACTIVE"
*/

function loadPlanForTable(planes) {
    const table = document.getElementById('plane-table-body');
    table.innerHTML = '';
    planes.forEach(element => {
        const newRow = document.createElement('tr');
        newRow.className = 'bg-gray-100  hover:bg-amber-100';
        newRow.setAttribute('plane', JSON.stringify(element));
        newRow.innerHTML = `
            <td class="border px-2 py-1">${element.namePlane}</td>
            <td class="border px-2 py-1">${element.status}</td>
            <td class="border px-2 py-1">${element.flightHours}</td>
            <td class="border px-2 py-1">${element.seats.length}</td>
        `
        newRow.addEventListener('click', () => {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                row.classList.remove('bg-amber-300');
                row.classList.add('bg-gray-100');
            });
            selectedPlane = JSON.parse(newRow.getAttribute('plane'));
            console.log(selectedPlane);
            newRow.classList.remove('bg-gray-100');
            newRow.classList.add('bg-amber-300');
        });

        table.appendChild(newRow);
    });
}