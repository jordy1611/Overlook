import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

// import BookingRepo from '../src/Booking-repo'
// import Repo from '../src/Repo'
// import RoomRepo from '../src/Room-repo'
// import Room from '../src/Room'
import CustomerRepo from '../src/Customer-repo'
import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
// import User from '../src/User'
// import Manager from '../src/Manager'

//delete unused imports

describe('CustomerRepo', () => {
  let customer0, customer1, customer2, customer3, customer4, customers,
  customerRepo;
  before(() => {
    customer0 = new Customer(sampleUserData[0]);
    customer1 = new Customer(sampleUserData[1]);
    customer2 = new Customer(sampleUserData[2]);
    customer3 = new Customer(sampleUserData[3]);
    customer4 = new Customer(sampleUserData[4]);
    customers = [customer0, customer1, customer2, customer3, customer4];
    customerRepo = new CustomerRepo(customers)
  });

  it('should have an array of customer objects', () => {
    expect(customerRepo.customers.length).to.eql(5);
    expect(customerRepo.customers[0].name).to.eql('Leroy Jenkins');
  })
})
