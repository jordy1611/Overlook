import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import User from '../src/User'
import Manager from '../src/Manager'

describe('Manager', () => {

  let manager;
  before(() => {
    manager = new Manager();
  });

  it('should have a id that is manager', () => {
    expect(manager.id).to.eql('manager');
  });

  it('should have a name that is Manager', () => {
    expect(manager.name).to.eql('Manager Manager');
  });
})
