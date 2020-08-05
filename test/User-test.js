import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import roomsAvailableOnDate from './sampleData/roomsAvailableOnDate'
import User from '../src/User'
import AllRooms from '../src/AllRooms'
import AllBookings from '../src/AllBookings'
import Booking from '../src/Booking'

describe('User', () => {

  let user, customer, manager, allRooms, allBookings, bookings, date;
  before(() => {
    user = new User();
    customer = new User(sampleUserData[1])
    manager = new User('manager', 'Manager Manager')
    allRooms = new AllRooms(sampleRoomData)
    bookings = constSampleBookingData.map(booking => new Booking(booking))
    allBookings = new AllBookings(bookings)
    date = "2020/02/03"
  })

  it('should have an id set to 0 by default', () => {
    expect(user.id).to.eql(0);
  })

  it('should have a name set to no name', () => {
    expect(user.name).to.eql('no name');
  })

  it('should get the first name of itself', () => {
    expect(user.getFirstName()).to.eql('no')
  })

  it('should return an array of available rooms on a give date', () => {
    expect(user.getAvailableRoomsByDate(date, allRooms, allBookings)).to.eql(roomsAvailableOnDate)
  })

  it('should return the total cost of all of a customer\'s bookings', () => {
    expect(customer.getBookingsCost(bookings, allRooms)).to.eql(8628.65)
  })
})
