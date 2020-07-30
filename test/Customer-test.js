import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

// import BookingRepo from '../src/Booking-repo'
// import Repo from '../src/Repo'
// import RoomRepo from '../src/Room-repo'
// import Room from '../src/Room'
// import CustomerRepo from '../src/Customer-repo'
import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
import User from '../src/User'


//delete unused imports

describe('Customer', () => {

  let customer1;
  before(() => {
    customer1 = new Customer(sampleUserData[0]);
  });

  it('should have a id that is 1', () => {
    expect(customer1.id).to.eql(1);
  });

  it('should have a name that is Leroy', () => {
    expect(customer1.name).to.eql('Leroy Jenkins');
  });
})
