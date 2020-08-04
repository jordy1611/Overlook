let domUpdates = {
  // initial properties here,



  //methods here,
  displayBookRoomPage() {
    hideElement('customer-dashboard')
    displayElement('customer-search-dashboard')
  },

  hideCustomerSearchPage() {
    hideElement('room-filter-buttons')
    hideElement('available-rooms')
    hideElement('customer-search-dashboard')
  },

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

  
}

function displayUserPage() {
  hideElement('login-form')
  document.querySelector('.header-prompt').innerText = `Welcome ${currentUser.getFirstName()}!`
  if (currentUser instanceof Manager) {
    displayManagerPage()
  } else if(currentUser instanceof Customer) {
    displayCustomerPage()
  }
}
