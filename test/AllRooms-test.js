import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'

// import BookingRepo from '../src/Booking-repo'
// import Repo from '../src/Repo'
import AllRooms from '../src/AllRooms'
// import Room from '../src/Room'
// import CustomerRepo from '../src/Customer-repo'
// import Customer from '../src/Customer'
// import TodayBookingRepo from '../src/TodayBooking-repo';
// import UserBookingRepo from '../src/UserBooking-repo';
// import User from '../src/User'
// import Manager from '../src/Manager'

//delete unused imports

describe('AllRooms', () => {

  let hotel, suites, juniorSuites;
  before(() => {
    hotel = new AllRooms(sampleRoomData)
    suites = [{
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
    },
    {
      number: 10,
      roomType: 'suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 1,
      costPerNight: 497.64
    },
    {
      number: 24,
      roomType: 'suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 327.24
    }]

    juniorSuites = [{
      number: 6,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.02
    },
    {
      number: 8,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 261.26
    },
    {
      number: 17,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 328.15
    },
    {
      number: 18,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 2,
      costPerNight: 496.41
    }]


  })

  it('should have an array of all rooms in the hotel', () => {
    expect(hotel.allRooms).to.eql(sampleRoomData);
    expect(hotel.allRooms[1]).to.eql(sampleRoomData[1]);
  })

  it('should return an array of rooms filtered by room type', () => {
    expect(hotel.filterRoomsByType('suite')).to.eql(suites)
    expect(hotel.filterRoomsByType('junior suite')).to.eql(juniorSuites)
  })
})
