import { expect } from 'chai';
import constSampleBookingData from './sampleData/constSampleBookings'
import letSampleBookingData from './sampleData/letSampleBookings'
import sampleRoomData from './sampleData/sampleRooms'
import sampleUserData from './sampleData/sampleUsers'
import User from '../src/User'

describe('User', () => {

  let user;
  before(() => {
    user = new User();
  })

  it('should have an id set to null by default', () => {
    expect(user.id).to.eql(null);
  })

  it('should have a name set to null', () => {
    expect(user.name).to.eql(null);
  })
})
