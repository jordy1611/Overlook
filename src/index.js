import './css/base.scss';
import './css/style.scss';
// import './images/person walking on path.jpg';
// import './images/The Rock.jpg';
import User from './User';
import Customer from './Customer'
import AllCustomers from './AllCustomers';
import Room from './Room';
import RoomRepo from './Room-repo';
import Booking from './Booking';
import BookingRepo from './Booking-repo';
import Manager from './Manager';
// import loginUser from './loginUser'
import deleteBooking from './DeleteBooking';
import domUpdates from './DomUpdates';
import fetchAllData from './FetchAllData';
import fetchAllCustomerData from './FetchAllCustomerData';
import fetchAllBookingData from './FetchAllBookingData';
import postNewBooking from './PostNewBooking';

let user = new User()
const hotelData = {
  customers: [],
  rooms: [],
  bookings: []
}
let bookings = []
let hasCustomerDataLoaded = false
let hasBookingDataLoaded = false

fetchAllData()
  .then((data) => {
    hotelData.customers = data.customerData;
    hotelData.rooms = data.roomData;
    hotelData.bookings = data.bookingData;
  })
  .then(() => {
    hotelData.customers = hotelData.customers.map(customer => new Customer(customer))
    // hotelData.rooms = hotelData.rooms.map(room => new Room(room))
    // hotelData.bookings = hotelData.bookings.map(booking => new Booking(booking))
  })
  .then(() => {
    hotelData.customers = new AllCustomers(hotelData.customers)
    // hotelData.rooms = new AllRooms(hotelData.rooms)
    // hotelData.bookings = new AllBookings(hotelData.bookings)
  })
  .then(() => {console.log(hotelData)})

// fetchAllCustomerData()
//   .then(data => {
//     customers = data
//     hasCustomerDataLoaded = true
//   })
//   .then(() => {customers = customers.map(customer => new Customer(customer))})
//   .then(() => {customers = new AllCustomers(customers)})
//
// fetchAllBookingData()
//   .then(data => {
//     bookings = data
//     hasBookingDataLoaded = true
//   })
//   .then(() => console.log(bookings))
  // .then(() => {bookings = bookings.map(booking => new Booking(booking))})
  // .then(() => {bookings = new AllBookings(Bookings)})


window.addEventListener('click', clickHandler)
// window.addEventListener('click', clickHandler);




function clickHandler(event) {
  if (event.target.classList.contains('login-button')) {
    event.preventDefault();
    loginUser();
  }
}

function loginUser() {
  const userName = document.querySelector('.username-input').value
  const password = document.querySelector('.password-input').value
  console.log(password)
  login(userName, password);
}

function login(userName, password) {
  if (userName === 'manager' && password === 'overlook2020') {
    loginAsManager()
  } else if (userName.slice(0, 8) === 'customer' && password === 'overlook2020') {
    loginAsCustomer()
  } else {
    alert('We are terribley sorry to tell you that either the username or password entered is incorrect.')
  }
}

function loginAsManager() {
  manager = new Manager('manager', 'Manager')
  // new Manager
}

function loginAsCustomer() {
  customer = 'customer'
  // new Customer
}
