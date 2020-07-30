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
// import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
import User from '../src/User'
import Manager from '../src/Manager'

//delete unused imports

describe('Manager', () => {

  let manager;
  before(() => {
    manager = new Manager('manager', 'Manager');
  });

  it('should have a id that is manager', () => {
    expect(manager.id).to.eql('manager');
  });

  it('should have a name that is Manager', () => {
    expect(manager.name).to.eql('Manager');
  });
})
