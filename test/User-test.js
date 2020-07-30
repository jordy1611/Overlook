import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

// import BookingRepo from '../src/Booking-repo'
// import Booking from '../src/Repo'
// import RoomRepo from '../src/Room-repo'
// import Room from '../src/Room'
// import CustomerRepo from '../src/Customer-repo'
// import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
import User from '../src/User'
// import Manager from '../src/Manager'

//delete unused imports

describe('User', () => {

  let user;
  before(() => {
    user = new User();
  })

  it('should have an id set to null by default', () => {
    expect(user.id).to.eql(null);
  })

  it('should have a name set to null', () => {
    expect(user.name).to.eql(null);
  })
})
