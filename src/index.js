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
import deleteBooking from './DeleteBooking';
import domUpdates from './DomUpdates';
import fetchAllData from './FetchAllData';
import fetchAllCustomerData from './FetchAllCustomerData';
import fetchAllBookingData from './FetchAllBookingData';
import postNewBooking from './PostNewBooking';


let searchDate
let currentUser = new User()
const hotelData = {
  customers: [],
  rooms: [],
  bookings: []
}
let hasAllDataLoaded = false
let hasBookingDataLoaded = false
let mostRecentDate;
let todayDate = new Date()
todayDate = todayDate.getFullYear()+'/'+(todayDate.getMonth()+1)+'/'+todayDate.getDate();

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


// fetchAllBookingData()
//   .then(data => {
//     bookings = data
//     hasBookingDataLoaded = true
//   })
//   .then(() => console.log(bookings))
  // .then(() => {bookings = bookings.map(booking => new Booking(booking))})
  // .then(() => {bookings = new AllBookings(Bookings)})

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
// window.addEventListener('click', clickHandler);



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
  let bookingsToday = bookingsByDate(mostRecentDate)
  displayElement('manager-dashboard')
  displayBookings(bookingsToday, 'bookings-today')
  displayTodayStats(bookingsToday)
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
  let customerBookings = hotelData.bookings.getBookingsByUser(currentUser.id)
  displayElement('customer-dashboard');
  displayBookings(customerBookings, 'my-bookings');
  displayUserCosts(customerBookings);
}

function displayBookings(bookings, className) {
  // bookings.sort((a, b) => {
  //   if(a.date < b.date) {
  //     return 1
  //   } else if(a.date > b.date) {
  //     return -1
  //   } return 0
  // })
  document.querySelector(`.${className}`).innerHTML = '<h3>Your Bookings</h3>'
  bookings.forEach(booking => {
    let singleBooking = `
      <article class="booking">
        <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
        <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
        <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelData.rooms.allRooms)}</span></p>
      </article>
    `
    document.querySelector(`.${className}`).insertAdjacentHTML('beforeEnd', singleBooking)
  });
}

function displayUserCosts(customerBookings) {
  let customerTotal = currentUser.getBookingsCost(customerBookings, hotelData.rooms)
  customerTotal = parseFloat(customerTotal.toFixed(2))
  document.querySelector('.customer-total').innerText = customerTotal;
  document.querySelector('.customer-points').innerText = Math.floor(customerTotal * 100);
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


function filterRoomsByDate() { // not good srp
  searchDate = document.querySelector('.room-search-date').value
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
  const roomsOnDate = filterRoomsByDate()
  displayElement('room-filter-buttons')
  displayElement('available-rooms')
  displayRooms(roomsOnDate)
}

function displayRooms(rooms) {
  const availableRooms = document.querySelector('.available-rooms')
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
    filterRoomsByDate()
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
  console.log('room booked')
  // wtf to i display after booking? Go back to my page?
  const roomNumber = event.target.closest('.room').dataset.id
  const booking = {
    userID: currentUser.id,
    date: searchDate,
    roomNumber: parseInt(roomNumber),
    roomServiceCharges: []
  }
  console.log('booking', booking)
  hotelData.bookings.bookings.unshift(new Booking(booking))
  // postNewBooking(booking)
  // updateBookings
}
