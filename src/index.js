import './css/base.scss';
import './css/style.scss';
// import './images/person walking on path.jpg';
// import './images/The Rock.jpg';
import User from './User';
import Customer from './Customer'
import AllCustomers from './AllCustomers';
// import Room from './Room';
import AllRooms from './AllRooms';
import Booking from './Booking';
import AllBookings from './AllBookings';
import Manager from './Manager';
// import loginUser from './loginUser'
import deleteBookingFetch from './DeleteBooking';
import domUpdates from './DomUpdates';
import fetchAllData from './FetchAllData';
import fetchAllCustomerData from './FetchAllCustomerData';
import fetchAllBookingData from './FetchAllBookingData';
import postNewBooking from './PostNewBooking';



let searchDate
let currentUser = new User()
let currentCustomer
const hotelData = {
  customers: [],
  rooms: [],
  bookings: []
}
let hasAllDataLoaded = false
let hasBookingDataLoaded = false
let mostRecentDate;
let todayDate = new Date()
todayDate = todayDate.getFullYear()+'/0'+(todayDate.getMonth()+1)+'/0'+todayDate.getDate();

fetchAllData()
  .then((data) => {
    hotelData.customers = data.customerData;
    hotelData.rooms = data.roomData;
    hotelData.bookings = data.bookingData;
  })
  .then(() => {
    hotelData.customers = hotelData.customers.map(customer => new Customer(customer))
    hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))
  })
  .then(() => {
    hotelData.customers = new AllCustomers(hotelData.customers)
    hotelData.rooms = new AllRooms(hotelData.rooms)
    hotelData.bookings = new AllBookings(hotelData.bookings)
    hasAllDataLoaded = true;
    getMostRecentDate()
    // onLoadTest()
  })
  // .then(() => {onLoadTest()})


fetchAllBookingData()
  .then(data => {
    hotelData.bookings = data
  })
  .then(() => {hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))})
  .then(() => {
    hotelData.bookings = new AllBookings(hotelData.bookings)
    hasBookingDataLoaded = true
    console.log('ind booking fetch', hotelData.bookings)
  })

  function getMostRecentDate() {
    let sortedBookings = hotelData.bookings.bookings.sort((a, b) => {
      if(b.date > a.date ) {
        return 1
      } if (b.date < a.date) {
        return -1
      }
      return 0
    })
    mostRecentDate = sortedBookings[0].date;
  }

window.addEventListener('click', clickHandler)

function clickHandler(event) {
  if (event.target.classList.contains('login-button') && hasAllDataLoaded) {
    event.preventDefault();
    login();
  } else if(event.target.classList.contains('book-room-button')) {
    displayBookRoomPage();
  } else if(event.target.classList.contains('return-customer-page-button')) {
    displayCustomerPage();
    hideCustomerSearchPage();
  } else if(event.target.classList.contains('search-room-button')) {
    displaySearchDom()
  } else if(event.target.closest('.room-filter-buttons')) {
    searchRoomsByType(event)
  } else if(event.target.classList.contains('book-button')) {
    bookRoom(event)
    // displayCustomerPage()
  } else if(event.target.classList.contains('search-customers-button')) {
    displayManagerSearchPage()
  } else if(event.target.classList.contains('return-manager-page-button')) {
    displayManagerPage()
  } else if(event.target.classList.contains('book-customer-room-button')) {
    displayRoomSearch()
  } else if(event.target.classList.contains('delete-booking-button')) {
    removeBooking(event)
  }
}

function login() {
  const userName = document.querySelector('.username-input').value
  const password = document.querySelector('.password-input').value
  loginUser(userName, password)
  displayUserPage() //this is still happenning on bad login, should be fuxed with password tho
}

function loginUser(userName, password) {
  if (userName === 'manager') {
    loginAsManager()
  } else if (userName.slice(0, 8) === 'customer' && parseInt(userName.slice(8)) <= 50) { //helper function for criteria? May need typeof === 'number'
    loginAsCustomer(parseInt(userName.slice(8))) // can add a sad path with the value of this
  } else {
    alert('We are terribley sorry to tell you that either the username or password entered is incorrect.')
  }
}

function loginAsManager() {
  currentUser = new Manager()
}

function loginAsCustomer(id) {
  currentUser = new Customer(hotelData.customers.findCustomerById(id))
  currentCustomer = currentUser;
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

function displayManagerPage() {
  //get new bookimgs, followings is in a then statement
  fetchAllBookingData()
    .then(data => {
      hotelData.bookings = data
    })
    .then(() => {hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))})
    .then(() => {
      hotelData.bookings = new AllBookings(hotelData.bookings)
      hasBookingDataLoaded = true
      console.log('ind booking fetch', hotelData.bookings)
    })
    .then(() => {
      let bookingsToday = bookingsByDate(todayDate)
      displayElement('manager-dashboard')
      hideElement('manager-customer-view-dashboard')
      displayBookingsManager(bookingsToday, 'bookings-today')
      displayTodayStats(bookingsToday)
    })
}

function bookingsByDate(date) {
  return hotelData.bookings.getBookingsByDate(date)
}
function displayTodayStats(bookingsToday) {
  const totalToday = currentUser.getBookingsCost(bookingsToday, hotelData.rooms)
  document.querySelector('.revenue-today').innerText = totalToday.toFixed(2)
  document.querySelector('.rooms-booked').innerText = (bookingsToday.length / hotelData.rooms.allRooms.length).toFixed(2);
}

function displayCustomerPage() {
  // get new bookings, following is in a then statement
  fetchAllBookingData()
    .then(data => {
      hotelData.bookings = data
    })
    .then(() => {hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))})
    .then(() => {
      hotelData.bookings = new AllBookings(hotelData.bookings)
      hasBookingDataLoaded = true
      console.log('ind booking fetch', hotelData.bookings)
    })
    .then(() => {
      let customerBookings = getCustomerBookings(currentUser)
      customerBookings = sortBookingsByDate(customerBookings)
      displayElement('customer-dashboard');
      displayCustomerBookings(customerBookings, 'my-bookings');
      displayUserCosts(customerBookings);
      hideElement('room-filter-buttons')
      hideElement('available-rooms')
      hideElement('customer-search-dashboard')
    })
}

function getCustomerBookings(user) {
  return hotelData.bookings.getBookingsByUser(user.id)
}

function displayBookingsManager(bookings, className) { // manager can't delete now
  document.querySelector(`.${className}`).innerHTML = '<h3>Customer Bookings</h3>'
  bookings.forEach(booking => {
    let singleBooking = `
      <article class="booking" data-id="${booking.id}">
        <button class="delete-booking-button">Delete</button>
        <p tabindex=0><span class="booking-userID">UserID: ${booking.userID}</span></p>
        <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
        <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
        <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelData.rooms.allRooms)}</span></p>
      </article>
    `
    document.querySelector(`.${className}`).insertAdjacentHTML('beforeEnd', singleBooking)
  });
}

function displayCustomerBookings(bookings, className) { // manager can't delete now
  document.querySelector('.my-bookings').innerHTML = '<h3>My Bookings</h3>'
  bookings.forEach(booking => {
    let singleBooking = `
      <article class="booking" data-id="${booking.id}">
        <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
        <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
        <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelData.rooms.allRooms)}</span></p>
      </article>
    `
    document.querySelector('.my-bookings').insertAdjacentHTML('beforeEnd', singleBooking)
  });
}

function displayUserCosts(customerBookings) {
  const customerTotal = getCustomerTotalSpent(currentUser, customerBookings)
  // let customerTotal = currentUser.getBookingsCost(customerBookings, hotelData.rooms)
  // customerTotal = parseFloat(customerTotal.toFixed(2))
  document.querySelector('.customer-total').innerText = customerTotal;
  document.querySelector('.customer-points').innerText = Math.floor(customerTotal * 100);
}

function getCustomerTotalSpent(customer, userBookings) {
  let customerTotal = customer.getBookingsCost(userBookings, hotelData.rooms)
  customerTotal = parseFloat(customerTotal.toFixed(2))
  return customerTotal
}

function displayElement(className) {
  document.querySelector(`.${className}`).classList.remove('hidden')
}

function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hidden')
}

function displayBookRoomPage() {
  hideElement('customer-dashboard')
  displayElement('customer-search-dashboard')
}

function hideCustomerSearchPage() {
  hideElement('room-filter-buttons')
  hideElement('available-rooms')
  hideElement('customer-search-dashboard')
}


function filterRoomsByDate(searchDate) { // not good srp
  // searchDate = document.querySelector('.room-search-date').value
  let allRoomsAvailable
  if(searchDate.length === 10) {
    searchDate = searchDate.replace(/-/g, '/')
    allRoomsAvailable = getAvailableRooms(searchDate) //just pass in function on line 207
    // displaySearchDom(allRoomsAvailable)
    return allRoomsAvailable
  }
}


function getAvailableRooms(date) {
  let dayBookings = bookingsByDate(date)
  let availableRooms = hotelData.rooms.allRooms.map(room => room) //push?
  dayBookings.forEach(booking => {
    availableRooms = availableRooms.filter(room => {
      return room.number !== booking.roomNumber
    })
  })
  return availableRooms
}

function displaySearchDom() {
  searchDate = document.querySelector('.room-search-date').value
  searchDate = searchDate.replace(/-/g, '/')
  if(searchDate.length === 10) {
      // searchDate = searchDate.replace(/-/g, '/')
    const roomsOnDate = filterRoomsByDate(searchDate)
    if(roomsOnDate.length > 0) {
      displayElement('room-filter-buttons')
      displayElement('available-rooms')
      // const availableRooms = document.querySelector('.available-rooms')
      displayRooms('available-rooms', roomsOnDate)
    } else {
      const alertMessage = `We are so sorry to inform you that the OverLook hotel is entirely booked on ${searchDate}.
      We greatly appreciate your patience and apologize for the inconvenience.
      You can call the front desk at 1-800-123-3456 to be placed on a wait list for the date of ${searchDate}.
      Please look at another date to book a room.
      Thank you!`
      alert(`${alertMessage}`)
    }
  }
}

function displayRooms(className, rooms) {
  // const availableRooms = document.querySelector('.available-rooms') //going to have to delcare a step higher
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

}

function searchRoomsByType() {
  if (event.target.classList.contains('all-rooms-button')) {
    displaySearchDom()
  } else if(event.target.classList.contains('residential-suite-button')) {
    filterRoomsByType('residential suite')
  } else if(event.target.classList.contains('junior-suite-button')) {
    filterRoomsByType('junior suite')
  } else if(event.target.classList.contains('suite-button')) {
    filterRoomsByType('suite')
  } else if(event.target.classList.contains('single-room-button')) {
    filterRoomsByType('single room')
  }
}

function filterRoomsByType(roomType) {
  const allRooms = filterRoomsByDate()
  const filteredRooms = allRooms.filter(room => room.roomType === roomType)
  displayRooms(filteredRooms)
}

function bookRoom(event) {
  const roomNumber = event.target.closest('.room').dataset.id
  const booking = {
    userID: currentCustomer.id,
    date: searchDate,
    roomNumber: parseInt(roomNumber)
  }
  console.log(hotelData.bookings.bookings)
  hotelData.bookings.bookings.unshift(new Booking(booking))
  console.log(hotelData.bookings.bookings)
  postNewBooking(booking)
}

function displayManagerSearchPage() {

  currentCustomer = getSearchedCustomer()
  if (currentCustomer !== undefined) {
    // fetch bookings, all of the following is in a .then
    fetchAllBookingData()
      .then(data => {
        hotelData.bookings = data
      })
      .then(() => {hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))})
      .then(() => {
        hotelData.bookings = new AllBookings(hotelData.bookings)
        hasBookingDataLoaded = true
      })
      .then(() => {
        let customerBookings = hotelData.bookings.getBookingsByUser(currentCustomer.id) //turn into one function
        customerBookings = sortBookingsByDate(customerBookings)

        displayBookingsManager(customerBookings, 'manager-user-bookings')
        hideElement('manager-dashboard')
        hideElement('return-customer-manager-page')
        hideElement('manager-available-rooms')
        displayElement('manager-customer-view-dashboard')
        displayElement('manager-customer-view')
        displayElement('return-manager-dashboard')
        displayElement('manager-user-bookings')
        displayUserSearchCard(currentCustomer)
      })
  }
}

function displayUserSearchCard(currentCustomer) {
  const customerBookings = getCustomerBookings(currentCustomer)
  let totalSpent = getCustomerTotalSpent(currentCustomer, customerBookings)
  document.querySelector('.customer-info').innerText = `${currentCustomer.name} Total:$${totalSpent}`
}

function getSearchedCustomer() {
  const searchName = document.querySelector('.search-customer-input').value
  const searchCustomer = hotelData.customers.customers.find(customer => {
    return customer.name === searchName
  })
  return searchCustomer || undefined
}

function displayRoomSearch() {
  searchDate = document.querySelector('.manager-room-search-date').value
  searchDate = searchDate.replace(/-/g, '/')
  const roomsOnDate = filterRoomsByDate(searchDate)
  // roomsOnDate = roomsOnDate.sort((a, b) => {
  //   if(b.date > a.date ) {
  //     return 1
  //   } if (b.date < a.date) {
  //     return -1
  //   }
  displayElement('manager-available-rooms')
  hideElement('manager-user-bookings')
  displayRooms('manager-available-rooms', roomsOnDate)

}

function removeBooking(event) {
  const bookingID = event.target.closest('.booking').dataset.id
  const bookingToDelete = hotelData.bookings.bookings.find(booking => {
    return booking.id === parseInt(bookingID)
  }) || null
  if (bookingToDelete !== null && bookingToDelete.date >= todayDate) {
    console.log('DELETE')
    const index = hotelData.bookings.bookings.indexOf(bookingToDelete)
     hotelData.bookings.bookings.splice(index, 1)
     deleteBookingFetch(bookingToDelete)
     alert('Booking Deleted')
     displayManagerPage()
  }
}

function deleteBookingData(event) {
  const bookingID = event.target.closest('.booking').dataset.id
  const bookingToDelete = hotelData.bookings.bookings.find(booking => {
    return booking.id === parseInt(bookingID)
  }) || null
  if (bookingToDelete !== null && bookingToDelete.date >= todayDate) {
    console.log('DELETE')
    const index = hotelData.bookings.bookings.indexOf(bookingToDelete)
     hotelData.bookings.bookings.splice(index, 1)
     deleteBookingFetch(bookingToDelete)
     alert('Booking Deleted')
     displayManagerPage()

  }
}


function sortBookingsByDate(bookings) {
  return bookings.sort((a, b) => {
    if(b.date > a.date ) {
      return 1
    } if (b.date < a.date) {
      return -1
    }
    return 0
  })
}
