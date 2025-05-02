
window.addEventListener('load', () => {
    initTilte();
    createForms();
});
setHandleSumitForm();


function initTilte() {
    const searchFormData = JSON.parse(sessionStorage.getItem('search-form-data'));
    if (!searchFormData) return;

    const { isRoundTrip, beginLocation, endLocation, departureDate, returnDate, adultNumber, childNumber, infantNumber } = searchFormData;

    const totalPassengers = Number(adultNumber) + Number(childNumber) + Number(infantNumber);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric'
        });
    };

    const flightInfo = document.querySelector('.flight-info');
    flightInfo.innerHTML = `
      <div class="flight-route">
        <div class="route-item">
          <div class="city-code">${beginLocation.nameCode}</div>
          <div class="city-name">${beginLocation.name}</div>
        </div>
        <div class="route-item">
          <div class="city-code">${endLocation.nameCode}</div>
          <div class="city-name">${endLocation.name}</div>
        </div>
      </div>
      
      <div class="flight-date">
        <div class="date-label">Chuyến đi</div>
        <div class="date-value">${formatDate(departureDate)}</div>
      </div>
      
      ${isRoundTrip ? `
      <div class="flight-date">
        <div class="date-label">Chuyến về</div>
        <div class="date-value">${formatDate(returnDate)}</div>
      </div>` : ''}
      
      <div class="passengers">
        <span class="passenger-label">Hành khách</span>
        <span class="passenger-count">${totalPassengers}</span>
      </div>
      
      <div class="booking-info">THÔNG TIN ĐẶT CHỖ</div>
    `;

}
function createFormForPerson(title, formNumber) {

    const parentNode = document.querySelector('.customer-form')
    for (i = 1; i <= formNumber; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'container-form';
        newDiv.innerHTML = `

    <h2 class="section-title">${title + ' ' + i}</h2>  

      <div class="form-row">
        <label class="form-label required">Họ và tên (như trong CCCD/hộ chiếu)</label>
        <input name="fullName" type="text" class="form-input" placeholder="Nhập tên đệm và tên">
      </div>      
      <div class="form-row">
        <label class="form-label required">Ngày sinh</label>
        <input name="birthDate" type="date" class="form-input" placeholder="dd/mm/yyyy">
        <div class="date-format">Định dạng là Ngày / Tháng / Năm</div>
      </div>
    `
        parentNode.appendChild(newDiv)
    }
}
function createForms() {
    const searchFormData = JSON.parse(sessionStorage.getItem('search-form-data'));
    const { adultNumber, childNumber, infantNumber } = searchFormData;
    createFormForPerson('Người lớn', adultNumber);
    createFormForPerson('Trẻ em',childNumber);
    createFormForPerson('Trẻ em dưới hai tuổi',infantNumber);
}

function setHandleSumitForm(){
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); 
  
    const customerForms = document.querySelectorAll('.customer-form .container-form');
    const customerData = [];
  
    customerForms.forEach(form => {
      const fullName = form.querySelector('input[name="fullName"]')?.value || '';
      const birthDate = form.querySelector('input[name="birthDate"]')?.value || '';
      customerData.push({ fullName, birthDate });
    });
  
    const email = document.querySelector('input[type="email"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    // const agreed = document.querySelector('#emergency-contact').checked;
  
    const contactInfo = {
      email,
      phone,
      // agreed
    };
  
    sessionStorage.setItem('customerData', JSON.stringify(customerData));
    sessionStorage.setItem('contactInfo', JSON.stringify(contactInfo));
  
    alert('Dữ liệu đã được lưu vào sessionStorage!');
    window.location.href = 'chonDichVu.html';
  });
}



