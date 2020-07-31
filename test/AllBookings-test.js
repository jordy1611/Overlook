import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

import AllBookings from '../src/AllBookings'
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

describe('AllBookings', () => {
  let bookings, allBookings;
  before(() => {
    bookings = constSampleBookingData.map(booking => new Booking(booking))
    allBookings = new AllBookings(bookings)
  })

  it('should have an array of all booking objects. Past, present and future', () => {
    allBookings.test()
    expect(allBookings.bookings.length).to.eql(27);
    expect(allBookings.bookings[0]).to.eql({
      id: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2020/07/22',
      roomNumber: 15,
      roomServiceCharges: []
    });
    expect(allBookings.bookings[10]).to.eql({
      id: '5fwrgu4i7k55hl6te',
      userID: 2,
      date: '2020/01/19',
      roomNumber: 8,
      roomServiceCharges: []
    });
  })
})
