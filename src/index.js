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


let currentUser = new User()
const hotelData = {
  customers: [],
  rooms: [],
  bookings: []
}
let hasAllDataLoaded = false
let hasBookingDataLoaded = false

function onLoadTest() {
  currentUser = hotelData.customers.customers[7]
  // console.log(hotelData.bookings.getBookingsByUser(currentUser.id))
}

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
    console.log(hotelData)
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


window.addEventListener('click', clickHandler)
// window.addEventListener('click', clickHandler);



function clickHandler(event) {
  if (event.target.classList.contains('login-button') && hasAllDataLoaded) {
    event.preventDefault();
    login();
  }
}

function login() {
  const userName = document.querySelector('.username-input').value
  const password = document.querySelector('.password-input').value
  loginUser(userName, password)
  displayUserPage()
}

function loginUser(userName, password) {
  if (userName === 'manager') {
    loginAsManager()
  } else if (userName.slice(0, 8) === 'customer' && parseInt(userName.slice(8)) <= 50) {
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
    console.log('manager display')
  } else if(currentUser instanceof Customer) {
    // console.log('customer display')
    displayCustomerPage()
  }
}

function displayCustomerPage() {
  let customerBookings = hotelData.bookings.getBookingsByUser(currentUser.id)
  displayElement('user-dashboard');
  displayCustomerBookings(customerBookings);
  displayUserCosts(customerBookings);
}

function displayCustomerBookings(customerBookings) {
  customerBookings.forEach(booking => {
    let singleBooking = `
      <article class="booking">
        <p tabindex=0><span class="booking-date">Date: ${booking.date}</span></p>
        <p tabindex=0><span class="booking-room">Room Number: ${booking.roomNumber}</span></p>
        <p tabindex=0><span class="booking-cost">Cost: ${booking.getCost(hotelData.rooms.allRooms)}</span></p>
      </article>
    `
    document.querySelector('.my-bookings').insertAdjacentHTML('beforeEnd', singleBooking)
  });
}

function displayUserCosts(customerBookings) {
  const customerTotal = currentUser.getBookingsCost(customerBookings, hotelData.rooms)
  document.querySelector('.customer-total').innerText = customerTotal;
  document.querySelector('.customer-points').innerText = customerTotal * 100;

}

function displayElement(className) {
  document.querySelector(`.${className}`).classList.remove('hidden')
}

function hideElement(className) {
  document.querySelector(`.${className}`).classList.add('hidden')
}
