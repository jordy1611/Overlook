let domUpdates = {
  searchDate: null,


  displayElement(className) {
    document.querySelector(`.${className}`).classList.remove('hidden')
  },

  hideElement(className) {
    document.querySelector(`.${className}`).classList.add('hidden')
  },

  displayRooms(className, rooms) {
    const availableRooms = document.querySelector(`.${className}`);
    availableRooms.innerHTML = '<h3>Available Rooms</h3>'
    rooms.forEach(room => {
      const bidet = room.bidet ? 'Bidet' : 'No Bidet'
      const singleRoom = `
      <article class="room" data-id="${room.number}">
        <button class="book-button" aria-label="Book this room" alt="Book this room button">Book!</button>
        <p class="room-type">${room.roomType}</p>
        <p class="bed-size">bed size: ${room.bedSize}</p>
        <p class="num-beds">beds: ${room.numBeds}</p>
        <p class="bidet">${bidet}</p>
        <p class="room-number">room# ${room.number}</p>
        <p class="cost">$${room.costPerNight}</p>
      </article>
      `
      availableRooms.insertAdjacentHTML('beforeEnd', singleRoom)
    })
  },

  //// customer main display

  displayCustomerBookings(bookings, className, hotelRooms) { // manager can't delete now
    document.querySelector('.my-bookings').innerHTML = '<h3>My Bookings</h3>'
    bookings.forEach(booking => {
      let singleBooking = `
        <article class="booking" data-id="${booking.id}">
          <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
          <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
          <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelRooms)}</span></p>
        </article>
      `
      document.querySelector('.my-bookings').insertAdjacentHTML('beforeEnd', singleBooking)
    });
  },

  displayCustomerCosts(customerBookings, customerTotal) {
    document.querySelector('.customer-total').innerText = customerTotal;
    document.querySelector('.customer-points').innerText = Math.floor(customerTotal * 100);
  },

  displayMainCustomerPage(customerBookings, customerTotal, hotelRooms) {
    this.displayElement('customer-dashboard');
    this.displayCustomerBookings(customerBookings, 'my-bookings', hotelRooms);
    this.displayCustomerCosts(customerBookings, customerTotal);
    this.hideElement('room-filter-buttons')
    this.hideElement('available-rooms')
    this.hideElement('customer-search-dashboard')
  },

  //// customer search

  displayBookRoomPage() {
    this.hideElement('customer-dashboard')
    this.displayElement('customer-search-dashboard')
  },

  hideCustomerSearchPage() {
    this.hideElement('room-filter-buttons')
    this.hideElement('available-rooms')
    this.hideElement('customer-search-dashboard')
  },

  displayCustomerSearch(user, hotelRooms, hotelBookings) {
    if(this.searchDate.length === 10) {
      const roomsOnDate = user.getAvailableRoomsByDate(this.searchDate, hotelRooms, hotelBookings)
      if(roomsOnDate.length > 0) {
        this.displayElement('room-filter-buttons')
        this.displayElement('available-rooms')
        this.displayRooms('available-rooms', roomsOnDate)
      } else {
        const alertMessage = `We are so sorry to inform you that the OverLook hotel is entirely booked on ${this.searchDate}.
        We greatly appreciate your patience and apologize for the inconvenience.
        You can call the front desk at 1-800-123-3456 to be placed on a wait list for the date of ${this.searchDate}.
        Please look at another date to book a room.
        Thank you!`
        alert(`${alertMessage}`)
      }
    }
  },

  filterRoomsByType(roomType, user, hotelRooms, hotelBookings) {
      console.log(this.searchDate)
    const allRooms = user.getAvailableRoomsByDate(this.searchDate, hotelRooms, hotelBookings)
    const filteredRooms = allRooms.filter(room => room.roomType === roomType)
    domUpdates.displayRooms('available-rooms', filteredRooms)
  },

  //// main manager display

  displayTodayStats(user, bookingsToday, hotelRooms) {
    const totalToday = user.getBookingsCost(bookingsToday, hotelRooms)
    document.querySelector('.revenue-today').innerText = totalToday.toFixed(2)
    document.querySelector('.rooms-booked').innerText = (bookingsToday.length / hotelRooms.allRooms.length).toFixed(2);
  },

  displayBookingsManager(bookings, className, hotelRooms) {
    document.querySelector(`.${className}`).innerHTML = '<h3>Customer Bookings</h3>'
    bookings.forEach(booking => {
      let singleBooking = `
        <article class="booking" data-id="${booking.id}">
          <button class="delete-booking-button">Delete</button>
          <p tabindex=0><span class="booking-userID">UserID: ${booking.userID}</span></p>
          <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
          <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
          <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelRooms.allRooms)}</span></p>
        </article>
      `
      document.querySelector(`.${className}`).insertAdjacentHTML('beforeEnd', singleBooking)
    });
  },

  displayManagerMainPage(user, bookingsToday, hotelRooms) {
    this.displayElement('manager-dashboard')
    this.hideElement('manager-customer-view-dashboard')
    this.displayTodayStats(user, bookingsToday, hotelRooms)
    this.displayBookingsManager(bookingsToday, 'bookings-today', hotelRooms)
  },

  //// manager search dashboard

  displayManagerSearchPage(dateBookings, customer, totalSpent, hotelRooms) {
    this.displayBookingsManager(dateBookings, 'manager-user-bookings', hotelRooms)
    this.hideElement('manager-dashboard')
    this.hideElement('return-customer-manager-page')
    this.hideElement('manager-available-rooms')
    this.displayElement('manager-customer-view-dashboard')
    this.displayElement('manager-customer-view')
    this.displayElement('return-manager-dashboard')
    this.displayElement('manager-user-bookings')
    document.querySelector('.customer-info').innerText = `${customer.name} Total:$${totalSpent}`
  },

  displayManagerRoomSearch(customer, hotelRooms, hotelBookings) {
    const roomsOnDate = customer.getAvailableRoomsByDate(this.searchDate, hotelRooms, hotelBookings)
    this.displayElement('manager-available-rooms')
    this.hideElement('manager-user-bookings')
    this.displayRooms('manager-available-rooms', roomsOnDate)
  },

}

export default domUpdates;
