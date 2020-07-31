import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

// import BookingRepo from '../src/Booking-repo'
import Booking from '../src/Booking'
// import RoomRepo from '../src/Room-repo'
// import Room from '../src/Room'
// import CustomerRepo from '../src/Customer-repo'
// import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
// import User from '../src/User'
// import Manager from '../src/Manager'
//delete unused imports

describe('Booking', () => {
  let booking;
  before(() => {
    booking = new Booking(constSampleBookingData[0])
  })

  it('should take in a unique id, user ID, date, room number, and an empty array of room service charges', () => {
    expect(booking.id).to.eql('5fwrgu4i7k55hl6sz');
    expect(booking.userID).to.eql(1);
    expect(booking.date).to.eql('2020/07/22');
    expect(booking.roomNumber).to.eql(15);
    expect(booking.roomServiceCharges).to.eql([]);
  })
})
