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
        planeFormContainer.querySelector('#seatCount').value = '';

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
        planeFormContainer.querySelector('#seatCount').value = selectedPlane.seatCount;

        planeFormContainer.classList.toggle("hidden");
    })

    planeForm.addEventListener('submit', function (e) {
        handelCUSubmit(e);
        planeFormContainer.classList.toggle("hidden");

    });



    planeFormContainer.addEventListener("click", function (event) {
        if (!planeForm.contains(event.target)) {
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

}

async function handelCUSubmit(e) {
    e.preventDefault(); // Ngăn submit reload trang
    const tempplane = getPlaneFromForm(e);

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



function getPlaneFromForm(e) {
    const f = e.target.elements;
    return {
        idPlane: null,
        namePlane: f["namePlane"].value.trim(),
        status: f["status"].value,
        flightHours: parseInt(f["flightHours"].value, 0),
        seatCount: parseInt(f["seatCount"].value, 0),
        seat: []
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
            <td class="border px-2 py-1">${element.seatCount}</td>
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