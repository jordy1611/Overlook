let domUpdates = {

  // initial properties here,



  //methods here,
  displayElement(className) {
    document.querySelector(`.${className}`).classList.remove('hidden')
  },

  hideElement(className) {
    document.querySelector(`.${className}`).classList.add('hidden')
  },


  /// customer main display
  displayBookRoomPage() {
    this.hideElement('customer-dashboard')
    this.displayElement('customer-search-dashboard')
  },

  hideCustomerSearchPage() {
    this.hideElement('room-filter-buttons')
    this.hideElement('available-rooms')
    this.hideElement('customer-search-dashboard')
  },

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


}
//
//   displayRooms(className, rooms) {
//     const availableRooms = document.querySelector(`.${className}`);
//     availableRooms.innerHTML = '<h3>Available Rooms</h3>'
//     rooms.forEach(room => {
//       const bidet = room.bidet ? 'Bidet' : 'No Bidet'
//       const singleRoom = `
//       <article class="room" data-id="${room.number}">
//         <button class="book-button" aria-label="Book this room" alt="Book this room button">Book!</button>
//         <p class="room-type">${room.roomType}</p>
//         <p class="bed-size">bed size: ${room.bedSize}</p>
//         <p class="num-beds">beds: ${room.numBeds}</p>
//         <p class="bidet">${bidet}</p>
//         <p class="room-number">room# ${room.number}</p>
//         <p class="cost">$${room.costPerNight}</p>
//       </article>
//       `
//       availableRooms.insertAdjacentHTML('beforeEnd', singleRoom)
//     })
//   },
//
//
// }
//
// function displayUserPage() {
//   hideElement('login-form')
//   document.querySelector('.header-prompt').innerText = `Welcome ${currentUser.getFirstName()}!`
//   if (currentUser instanceof Manager) {
//     displayManagerPage()
//   } else if(currentUser instanceof Customer) {
//     displayCustomerPage()
//   }
// }

export default domUpdates;
