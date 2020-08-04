import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import Booking from '../src/Booking'
import AllRooms from '../src/AllRooms'

describe('Booking', () => {
  let booking, hotel;
  before(() => {
    booking = new Booking(constSampleBookingData[0])
    hotel = new AllRooms(sampleRoomData)
  })

  it('should take in a unique id, user ID, date, room number, and an empty array of room service charges', () => {
    expect(booking.id).to.eql('5fwrgu4i7k55hl6sz');
    expect(booking.userID).to.eql(1);
    expect(booking.date).to.eql('2020/07/22');
    expect(booking.roomNumber).to.eql(15);
    expect(booking.roomServiceCharges).to.eql([]);
  })

  it('should return it\'s own cost', () => {
    expect(booking.getCost(sampleRoomData)).to.eql(294.56)
  })
})
