window.addEventListener('load', () => {
    createViewFlights();
    createViewCustomers();

})

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
    const arrival = new Date(`${flight.arrivalDate}T${flight.estimatedArrivalTime}`);
    const diffMs = arrival - departure;
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    // Format ngày bay (ví dụ: Thứ Bảy, 10 tháng 5, 2025)
    const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = departure.toLocaleDateString('vi-VN', dayOptions);

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
                    <div class="time">${flight.estimatedArrivalTime.slice(0, 5)}</div>
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
    const customers = JSON.parse( sessionStorage.getItem('customerData'));
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
                         <div class="passenger-contact">${person.birthDate}</div>
                        <div class="passenger-contact">${person.personStyle}</div>
                    </div>
                </div>
                `;
    return passengeInfo;
}