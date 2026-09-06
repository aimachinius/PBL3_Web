import { findFlight } from "../../../APIs/flight.js";

const searchFormData = JSON.parse(sessionStorage.getItem('search-form-data'));
let allFlights = [];

function renderRouteInfo(data, direction) {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  let date, beginLocation, endLocation;

  if (direction === 'departure') {
    date = new Date(data.departureDate);
    beginLocation = data.beginLocation;
    endLocation = data.endLocation;
  } else if (direction === 'return') {
    date = new Date(data.returnDate);
    beginLocation = data.endLocation;
    endLocation = data.beginLocation;
  }

  const formattedDate = `${days[date.getDay()]}, ${date.getDate()} Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  const passengerCount = Number(data.adultNumber);

  document.querySelector('.route').textContent = `${beginLocation.name} (${beginLocation.nameCode}) → ${endLocation.name} (${endLocation.nameCode})`;
  document.querySelector('.details div').textContent = `${formattedDate} | ${passengerCount} Hành khách`;
}

window.addEventListener('load', async () => {
  if (searchFormData) {
    renderRouteInfo(searchFormData, 'departure');
  }

  await loadDataForCard(searchFormData.beginLocation.id, searchFormData.endLocation.id, searchFormData.departureDate);

  document.getElementById('sortOption').addEventListener('change', () => {
    const selected = document.getElementById('sortOption').value;
    const sorted = sortFlights(allFlights, selected);
    renderFlights(sorted);
  });

  let departureFlightASeat = await selectFlight();
  let returnFlightASeat = null;

  if (searchFormData.isRoundTrip) {
    window.scrollTo(0, 0);
    renderRouteInfo(searchFormData, 'return');
    await loadDataForCard(searchFormData.endLocation.id, searchFormData.beginLocation.id, searchFormData.returnDate);
    returnFlightASeat = await selectFlight();
  }

  sessionStorage.setItem('customerSelectedFight', JSON.stringify({ departureFlightASeat, returnFlightASeat }));
  window.location.href = 'nhapThongTin.html';
});

let waitingTicket = null;

function selectFlight() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (waitingTicket != null) {
        clearInterval(interval);
        resolve(waitingTicket);
        waitingTicket = null;
      }
    }, 200);
  });
}

async function loadDataForCard(fromLocationId, toLocationId, departureDate, sortOption = "priceAsc") {
  const data = await findFlight(fromLocationId, toLocationId, departureDate);
  allFlights = data;
  const sortedData = sortFlights(data, sortOption);
  renderFlights(sortedData);
}

function sortFlights(flights, option) {
  const sorted = [...flights];
  switch (option) {
    case "priceAsc":
      sorted.sort((a, b) => a.commonFare - b.commonFare);
      break;
    case "priceAscVip":
      sorted.sort((a, b) => a.vipFare - b.vipFare);
      break;
    case "departureTime":
      sorted.sort((a, b) => new Date(`1970-01-01T${a.departureTime}`) - new Date(`1970-01-01T${b.departureTime}`));
      break;
    case "duration":
      sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
      break;
  }
  return sorted;
}

function renderFlights(flightData) {
  const container = document.querySelector('.flight-list');
  container.innerHTML = '';

  flightData.forEach(f => {
    const fullDateTimeString = `${f.departureDate}T${f.departureTime}`;
    const departure = new Date(fullDateTimeString);
    const arrival = new Date(departure.getTime() + f.durationMinutes * 60000);

    const card = document.createElement('div');
    card.dataset.flight = JSON.stringify(f);
    card.className = 'flight-card';
    card.innerHTML = `
      <div class="flight-info">
        <div class="airline-logo">${f.plane.namePlane}</div>
        <div class="flight-times">
          <div class="time">${f.departureTime}</div>
          <div class="airport">${f.fromLocation.nameCode}</div>
        </div>
        <div class="flight-times">
          <div class="time">${arrival.toTimeString().split(' ')[0]}</div>
          <div class="airport">${f.toLocation.nameCode}</div>
        </div>
      </div>
      <div class="duration">
        <div class="direct">Bay thẳng</div>
      </div>
      <div class="button-card-1" stylebutton="buttonCard" TicketType="ECONOMY">
        <div class="price">
          <div class="seat-left">${f.availableEconomyTicket} ghế còn lại</div>
          <p>PHỔ THÔNG</p>
          <div class="price-amount">${f.commonFare}</div>
          <p>VND</p>
        </div>
      </div>
      <div class="button-card-2" stylebutton="buttonCard" TicketType="BUSINESS">
        <div class="price">
          <div class="seat-left">${f.availableBusinessTicket} ghế còn lại</div>
          <p>THƯƠNG GIA</p>
          <div class="price-amount">${f.vipFare}</div>
          <p>VND</p>
        </div>
      </div>
    `;

    if (searchFormData.adultNumber > f.availableEconomyTicket) {
      const btn = card.querySelector('.button-card-1');
      btn.style.backgroundColor = 'gray';
      btn.style.color = 'black';
      btn.style.cursor = 'not-allowed';
      btn.setAttribute('disabled', 'disabled');
    }

    if (searchFormData.adultNumber > f.availableBusinessTicket) {
      const btn = card.querySelector('.button-card-2');
      btn.style.backgroundColor = 'gray';
      btn.style.color = 'black';
      btn.style.cursor = 'not-allowed';
      btn.setAttribute('disabled', 'disabled');
    }

    container.appendChild(card);


    document.querySelectorAll('[stylebutton="buttonCard"]').forEach(btCard => {
      if (btCard.getAttribute("disabled") === "disabled") return;
      btCard.addEventListener('click', () => {
        waitingTicket = {
          flight: JSON.parse(card.dataset.flight),
          TicketType: btCard.getAttribute("TicketType")
        };
      }, { once: true });
    });

  });
}
