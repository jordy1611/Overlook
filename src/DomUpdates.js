let domUpdates = {
  searchDate: null,
  // initial properties here,



  //methods here,

 // used by multiple
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

  /// customer main display
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

/// customer search

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
  this.searchDate = document.querySelector('.room-search-date').value
  this.searchDate = this.searchDate.replace(/-/g, '/')
  if(this.searchDate.length === 10) {
    const roomsOnDate = user.getAvailableRoomsByDate(this.searchDate, hotelRooms, hotelBookings)
    if(roomsOnDate.length > 0) {
      this.displayElement('room-filter-buttons') //here down is good
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
  const allRooms = user.getAvailableRoomsByDate(this.searchDate, hotelRooms, hotelBookings)
  const filteredRooms = allRooms.filter(room => room.roomType === roomType)
  domUpdates.displayRooms('available-rooms', filteredRooms)
},

}

export default domUpdates;
