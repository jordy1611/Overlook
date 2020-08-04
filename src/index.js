import './css/base.scss';
import User from './User';
import Customer from './Customer'
import AllCustomers from './AllCustomers';
import AllRooms from './AllRooms';
import Booking from './Booking';
import AllBookings from './AllBookings';
import Manager from './Manager';
import deleteBookingFetch from './DeleteBooking';
import domUpdates from './DomUpdates';
import fetchAllData from './FetchAllData';
import fetchAllCustomerData from './FetchAllCustomerData';
import fetchAllBookingData from './FetchAllBookingData';
import postNewBooking from './PostNewBooking';


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

function clickHandler(event) { // divide
  if (event.target.classList.contains('login-button') && hasAllDataLoaded) {
    login();
  } else if(event.target.classList.contains('book-room-button')) {
    domUpdates.displayBookRoomPage();
  } else if(event.target.classList.contains('return-customer-page-button')) {
    displayCustomerPage();
    domUpdates.hideCustomerSearchPage();
  } else if(event.target.classList.contains('search-room-button')) {
    domUpdates.searchDate = getSearchDate('room-search-date')
    domUpdates.displayCustomerSearch(currentUser, hotelData.rooms, hotelData.bookings)
  } else if(event.target.closest('.room-filter-buttons')) {
    searchRoomsByType(event)
  } else if(event.target.classList.contains('book-button')) {
    bookRoom(event)
  } else if(event.target.classList.contains('search-customers-button')) {
    displayManagerSearchPage()
  } else if(event.target.classList.contains('return-manager-page-button')) {
    displayManagerPage()
  } else if(event.target.classList.contains('book-customer-room-button')) {
    domUpdates.searchDate = getSearchDate('manager-room-search-date')
    domUpdates.displayManagerRoomSearch(currentCustomer, hotelData.rooms, hotelData.bookings)
  } else if(event.target.classList.contains('delete-booking-button')) {
    removeBooking(event)
  }
}

function login() {
  const userName = document.querySelector('.username-input').value
  const password = document.querySelector('.password-input').value
  if (userName === 'manager') {
    loginAsManager()
    displayUserPage()
  } else if (userName.slice(0, 8) === 'customer' && parseInt(userName.slice(8)) <= 50 && typeof parseInt(userName.slice(8)) === 'number') { //helper function for criteria? May need typeof === 'number'
    loginAsCustomer(parseInt(userName.slice(8)))
    displayUserPage()
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
  domUpdates.hideElement('login-form')
  document.querySelector('.header-prompt').innerText = `Welcome ${currentUser.getFirstName()}!`
  if (currentUser instanceof Manager) {
    displayManagerPage()
  } else if(currentUser instanceof Customer) {
    displayCustomerPage()
  }
}

function displayManagerPage() {
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
      let bookingsToday = hotelData.bookings.getBookingsByDate(todayDate)
      domUpdates.displayManagerMainPage(currentUser, bookingsToday, hotelData.rooms)
    })
}

function displayCustomerPage() {
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
      let customerBookings = hotelData.bookings.getBookingsByUser(currentUser.id)
      customerBookings = sortBookingsByDate(customerBookings)
      const customerTotal = getCustomerTotalSpent(currentUser, customerBookings)
      domUpdates.displayMainCustomerPage(customerBookings, customerTotal, hotelData.rooms.allRooms)
    })
}

function getCustomerTotalSpent(customer, userBookings) {
  let customerTotal = customer.getBookingsCost(userBookings, hotelData.rooms)
  customerTotal = parseFloat(customerTotal.toFixed(2))
  return customerTotal
}

function filterRoomsByDate(searchDate) { //going away
  let allRoomsAvailable
  if(searchDate.length === 10) {
    searchDate = searchDate.replace(/-/g, '/')
    allRoomsAvailable = getAvailableRoomsByDate(searchDate)
    return allRoomsAvailable
  }
}


function getAvailableRoomsByDate(date) {
  let dayBookings = hotelData.bookings.getBookingsByDate(date)
  let availableRooms = hotelData.rooms.allRooms.map(room => room) //push?
  dayBookings.forEach(booking => {
    availableRooms = availableRooms.filter(room => {
      return room.number !== booking.roomNumber
    })
  })
  return availableRooms
}

function searchRoomsByType() {
  if (event.target.classList.contains('all-rooms-button')) {
    domUpdates.displayCustomerSearch(currentUser, hotelData.rooms, hotelData.bookings)
  } else if(event.target.classList.contains('residential-suite-button')) {
    domUpdates.filterRoomsByType('residential suite', currentUser, hotelData.rooms, hotelData.bookings)
  } else if(event.target.classList.contains('junior-suite-button')) {
    domUpdates.filterRoomsByType('junior suite', currentUser, hotelData.rooms, hotelData.bookings)
  } else if(event.target.classList.contains('suite-button')) {
    domUpdates.filterRoomsByType('suite', currentUser, hotelData.rooms, hotelData.bookings)
  } else if(event.target.classList.contains('single-room-button')) {
    domUpdates.filterRoomsByType('single room', currentUser, hotelData.rooms, hotelData.bookings)
  }
}

function bookRoom(event, className) {
  const roomNumber = event.target.closest('.room').dataset.id
  const booking = {
    userID: currentCustomer.id,
    date: '2020/11/16',  //getSearchDate(className)
    roomNumber: parseInt(roomNumber)
  }
  hotelData.bookings.bookings.unshift(new Booking(booking))
  postNewBooking(booking)
}

function displayManagerSearchPage() {
  currentCustomer = getSearchedCustomer()
  if (currentCustomer !== undefined) {
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
        let dateBookings = hotelData.bookings.getBookingsByUser(currentCustomer.id) //turn into one function
        dateBookings = sortBookingsByDate(dateBookings)
        const customerBookings = hotelData.bookings.getBookingsByUser(currentCustomer.id)
        const totalSpent = getCustomerTotalSpent(currentCustomer, customerBookings)
        domUpdates.displayManagerSearchPage(dateBookings, currentCustomer, totalSpent, hotelData.rooms)
      })
  }
}

function getSearchedCustomer() {
  const searchName = document.querySelector('.search-customer-input').value
  const searchCustomer = hotelData.customers.customers.find(customer => {
    return customer.name === searchName
  })
  return searchCustomer || undefined
}

function removeBooking(event) {
  const bookingID = event.target.closest('.booking').dataset.id
  const bookingToDelete = hotelData.bookings.bookings.find(booking => {
    return booking.id === parseInt(bookingID)
  }) || null
  if (bookingToDelete !== null && bookingToDelete.date >= todayDate) {
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

function getSearchDate(className) {
  let searchDate = document.querySelector(`.${className}`).value
  return searchDate.replace(/-/g, '/')
}
