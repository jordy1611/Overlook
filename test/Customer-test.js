import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import AllBookings from '../src/AllBookings'
import Booking from '../src/Booking'
import AllRooms from '../src/AllRooms'
import Customer from '../src/Customer'
import User from '../src/User'

describe('Customer', () => {

  let customer1, allRooms, allBookings, bookings;
  before(() => {
    customer1 = new Customer(sampleUserData[0]);
    allRooms = new AllRooms(sampleRoomData);
    bookings = constSampleBookingData.map(booking => new Booking(booking));
  });

  it('should have a id that is 1', () => {
    expect(customer1.id).to.eql(1);
  });

  it('should have a name that is Leroy', () => {
    expect(customer1.name).to.eql('Leroy Jenkins');
  });

  it('should return a customer\'s first name', () => {
    expect(customer1.getFirstName()).to.eql('Leroy');
    // expect(customer4.getFirstName()).to.eql('Bruce')
  })

  it('should return the total cost of all of a customer\'s bookings', () => {
    expect(customer1.getBookingsCost(bookings, allRooms)).to.eql(8628.65)
  })
})
