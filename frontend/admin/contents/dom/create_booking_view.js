export default function loadCreateBookingView() {
    // Khởi tạo các biến
    const bookingForm = document.getElementById('bookingForm');
    const roundTripCheckbox = document.getElementById('roundTrip');
    const ngayVeInput = document.getElementById('ngayve');
    const searchFlightsBtn = document.getElementById('searchFlights');
    const addPassengerBtn = document.getElementById('addPassenger');
    const passengerList = document.getElementById('passengerList');
    const seatSelection = document.getElementById('seatSelection');
    const returnSeatSection = document.getElementById('returnSeatSection');
    const returnSeatSelection = document.getElementById('returnSeatSelection');

    // Xử lý hiển thị/ẩn ngày về
    roundTripCheckbox.addEventListener('change', function () {
        ngayVeInput.disabled = !this.checked;
        if (!this.checked) {
            ngayVeInput.value = '';
        }
    });

    // Xử lý tìm chuyến bay
    searchFlightsBtn.addEventListener('click', async function () {
        const diemKhoiHanh = document.getElementById('diemkhoihanh').value;
        const diemDen = document.getElementById('diemden').value;
        const ngayDi = document.getElementById('ngaydi').value;
        const ngayVe = ngayVeInput.value;
        const nguoiLon = document.getElementById('nguoilon').value;
        const treEmTuHaiTuoi = document.getElementById('treemtuhaituoi').value;
        const treEmDuoiHaiTuoi = document.getElementById('treemduoihaituoi').value;

        if (!diemKhoiHanh || !diemDen || !ngayDi) {
            alert('Vui lòng điền đầy đủ thông tin tìm chuyến bay');
            return;
        }

        if (roundTripCheckbox.checked && !ngayVe) {
            alert('Vui lòng chọn ngày về cho chuyến khứ hồi');
            return;
        }

        try {
            // TODO: Gọi API tìm chuyến bay
            console.log('Tìm chuyến bay với thông tin:', {
                diemKhoiHanh,
                diemDen,
                ngayDi,
                ngayVe,
                nguoiLon,
                treEmTuHaiTuoi,
                treEmDuoiHaiTuoi
            });
        } catch (error) {
            console.error('Lỗi khi tìm chuyến bay:', error);
            alert('Có lỗi xảy ra khi tìm chuyến bay');
        }
    });

    // Thêm hành khách mới
    addPassengerBtn.addEventListener('click', function () {
        const passengerDiv = document.createElement('div');
        passengerDiv.className = 'bg-gray-50 p-4 rounded';
        passengerDiv.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Họ và tên</label>
                    <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input type="tel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">CMND/CCCD</label>
                    <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
            </div>
            <button type="button" class="mt-2 text-red-500 hover:text-red-700" onclick="this.parentElement.remove()">
                Xóa hành khách
            </button>
        `;
        passengerList.appendChild(passengerDiv);
    });

    // Tạo sơ đồ ghế ngồi
    function createSeatMap(container, rows = 10) {
        container.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < 6; j++) {
                const seat = document.createElement('button');
                seat.type = 'button';
                seat.className = 'p-2 border rounded hover:bg-blue-100';
                seat.textContent = `${String.fromCharCode(65 + j)}${i + 1}`;
                seat.addEventListener('click', function () {
                    this.classList.toggle('bg-blue-500');
                    this.classList.toggle('text-white');
                });
                container.appendChild(seat);
            }
        }
    }

    // Khởi tạo sơ đồ ghế
    createSeatMap(seatSelection);
    createSeatMap(returnSeatSelection);

    // Xử lý submit form
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // TODO: Xử lý logic gửi dữ liệu booking
        console.log('Form submitted');
    });

    // TODO: Thêm logic lấy danh sách sân bay từ API
    // TODO: Thêm logic kiểm tra ghế đã được đặt
    // TODO: Thêm logic tính giá tiền
}
