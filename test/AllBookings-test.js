import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import AllBookings from '../src/AllBookings'
import Booking from '../src/Booking'

describe('AllBookings', () => {
  let bookings, hotelBookings, user1Bookings, user2Bookings;
  before(() => {
    bookings = constSampleBookingData.map(booking => new Booking(booking))
    hotelBookings = new AllBookings(bookings)
    user1Bookings = [{
        id: '5fwrgu4i7k55hl6sz',
        userID: 1,
        date: '2020/07/22',
        roomNumber: 15,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t5',
        userID: 1,
        date: '2020/08/09',
        roomNumber: 24,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t6',
        userID: 1,
        date: '2020/01/10',
        roomNumber: 12,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t7',
        userID: 1,
        date: '2020/02/16',
        roomNumber: 7,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2020/02/05',
        roomNumber: 12,
        roomServiceCharges: []
      }
    ]

    user2Bookings = [{
        id: '5fwrgu4i7k55hl6ti',
        userID: 10,
        date: '2020/01/22',
        roomNumber: 11,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tj',
        userID: 10,
        date: '2020/01/17',
        roomNumber: 7,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tk',
        userID: 10,
        date: '2020/09/11',
        roomNumber: 20,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tl',
        userID: 10,
        date: '2020/09/10',
        roomNumber: 8,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tm',
        userID: 10,
        date: '2020/12/16',
        roomNumber: 19,
        roomServiceCharges: []
      }]
  });

  it('should have an array of all booking objects. Past, present and future', () => {
    expect(hotelBookings.bookings.length).to.eql(28);
    expect(hotelBookings.bookings[0]).to.eql({
      id: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2020/07/22',
      roomNumber: 15,
      roomServiceCharges: []
    });
    expect(hotelBookings.bookings[10]).to.eql({
      id: '5fwrgu4i7k55hl6te',
      userID: 2,
      date: '2020/01/19',
      roomNumber: 8,
      roomServiceCharges: []
    });
  });

  it('should return a filtered array of bookings based on a userID', () => {
    expect(hotelBookings.getBookingsByUser(1)).to.eql(user1Bookings)
    expect(hotelBookings.getBookingsByUser(10)).to.eql(user2Bookings)
  });

  it('should return a filtered array of bookings based on a date', () => {
    expect(hotelBookings.getBookingsByDate('2020/02/03')).to.eql(
      [{
        id: '5fwrgu4i7k55hl6tg',
        userID: 3,
        date: '2020/02/03',
        roomNumber: 17,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tq',
        userID: 23,
        date: '2020/02/03',
        roomNumber: 12,
        roomServiceCharges: []
      }]
    )
    expect(hotelBookings.getBookingsByDate('2020/11/16')).to.eql(
      [{
        id: '5fwrgu4i7k55hl6tt',
        userID: 3,
        date: '2020/11/16',
        roomNumber: 5,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tu',
        userID: 2,
        date: '2020/11/16',
        roomNumber: 9,
        roomServiceCharges: []
      }]
    )
  });
})
