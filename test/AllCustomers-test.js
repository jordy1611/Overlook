import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import AllCustomers from '../src/AllCustomers'
import Customer from '../src/Customer'

describe('AllCustomers', () => {
  let customer0, customer1, customer2, customer3, customer4, customers,
  allCustomers;
  before(() => {
    customer0 = new Customer(sampleUserData[0]);
    customer1 = new Customer(sampleUserData[1]);
    customer2 = new Customer(sampleUserData[2]);
    customer3 = new Customer(sampleUserData[3]);
    customer4 = new Customer(sampleUserData[4]);
    customers = [customer0, customer1, customer2, customer3, customer4];
    allCustomers = new AllCustomers(customers)
  });

  it('should have an array of customer objects', () => {
    expect(allCustomers.customers.length).to.eql(5);
    expect(allCustomers.customers[0].name).to.eql('Leroy Jenkins');
  })

  it('should return a specific customer based on id', () => {
    expect(allCustomers.findCustomerById(1)).to.eql(customer0)
    expect(allCustomers.findCustomerById(10)).to.eql(customer3)
  })

  it('should return a specific customer based on name', () => {
    expect(allCustomers.findCustomerByName('Michael Jordan')).to.eql(customer4)
    expect(allCustomers.findCustomerByName('Chip Skylark')).to.eql(customer1)
  })
})
