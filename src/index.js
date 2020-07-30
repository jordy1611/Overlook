import './css/base.scss';
import './css/style.scss';
// import './images/person walking on path.jpg';
// import './images/The Rock.jpg';
import User from './User';
import Customer from './Customer'
import CustomerRepo from './Customer-repo';
import Room from './Room';
import RoomRepo from './Room-repo';
import Booking from './Booking';
import BookingRepo from './Booking-repo';
import TodayBookingRepo from './TodayBooking-repo';
import UserBookingRepo from './UserBooking-repo';
import Manager from './Manager';
import deleteBooking from './DeleteBooking';
import domUpdates from './DomUpdates';
import fetchAllData from './FetchAllData';
import postNewBooking from './PostNewBooking';

window.addEventListener('click', clickHandler);
window.addEventListener('load', console.log('LOAD!'));

function clickHandler(event) {
  if (event.target.classList.contains('login-button')) {
    event.preventDefault();
    loginUser();
  }
}

function loginUser() {
  console.log('ayyyyyyy')
}

function validatePassword() {

}

function createCurrentUser() {

}
