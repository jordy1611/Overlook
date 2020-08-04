const chai = require('chai');
import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import domUpdates from '../src/domUpdates'
// import AllBookings from '../src/allBookings'
// import Booking from '../src/Booking'
// import AllRooms from '../src/AllRooms'
// import AllCustomers from '../src/AllCustomers'
// import Customer from '../src/Customer'
// import User from '../src/User'
// import Manager from '../src/Manager'
const spies = require('chai-spies');
chai.use(spies);

describe.only('DOM Updates', () => {
  let rooms, bookings, customerTotal, user;
  before(() => {
    rooms = sampleRoomData;
    bookings = [constSampleBookingData[0], constSampleBookingData[1], constSampleBookingData[2]]
    customerTotal = 1000
  })
  beforeEach(() => {
    global.document = {};
    chai.spy.on(domUpdates, "hideElement", () => {})
    chai.spy.on(domUpdates, "displayElement", () => {})
    chai.spy.on(domUpdates, "displayRooms", () => {})
    chai.spy.on(domUpdates, "displayCustomerBookings", () => {})
    chai.spy.on(domUpdates, "displayMainCustomerPage", () => {})
    chai.spy.on(domUpdates, "displayCustomerCosts", () => {})
    chai.spy.on(domUpdates, "displayBookRoomPage", () => {})
    chai.spy.on(domUpdates, "hideCustomerSearchPage", () => {})
    chai.spy.on(domUpdates, "displayCustomerSearch", () => {})
    chai.spy.on(domUpdates, "displayManagerMainPage", () => {})
    chai.spy.on(domUpdates, "displayManagerSearchPage", () => {})
    chai.spy.on(domUpdates, "displayManagerRoomSearch", () => {})
  })

  afterEach(() => {
    chai.spy.restore(domUpdates);
  });

  it('should hide an element when called', () => {
    domUpdates.hideElement('room-filter-buttons')

    expect(domUpdates.hideElement).to.have.been.called.with('room-filter-buttons');
  })

  it('should display an element when called', () => {
    domUpdates.hideElement('customer-search-dashboard')

    expect(domUpdates.hideElement).to.have.been.called.with('customer-search-dashboard');
  })

  it('should display rooms when given a classname and array of rooms', () => {
    domUpdates.displayRooms('available-rooms', rooms)

    expect(domUpdates.displayRooms).to.have.been.called.with('available-rooms', rooms);
  })

  it('should display customer bookings when given an array of bookings, rooms and array a class name', () => {
    domUpdates.displayCustomerBookings(bookings, 'my-bookings', rooms)

    expect(domUpdates.displayCustomerBookings).to.have.been.called.with(bookings, 'my-bookings', rooms);
  })

  it('should call displayCustomerCosts when given bookings and a customerTotal', () => {
    domUpdates.displayCustomerCosts(bookings, customerTotal)

    expect(domUpdates.displayCustomerCosts).to.have.been.called.with(bookings, customerTotal)
  })

  it('should display the page to book rooms', () => {
    domUpdates.displayBookRoomPage()

    expect(domUpdates.displayBookRoomPage).to.have.been.called(1)
  })

  it('should hide the customer search page', () => {
    domUpdates.hideCustomerSearchPage()

    expect(domUpdates.hideCustomerSearchPage).to.have.been.called(1)
  })

  it('should display a customer\'s search when given a user, array of rooms and an array of bookings', () => {
    displayCustomerSearch(user, rooms, bookings)

    expect(domUpdates.displayCustomerSearch).to.have.been.called.with(user, rooms, bookings)
  })



})
