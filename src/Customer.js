import User from '../src/User'
/*only 1
porperty isManager = true (for if statements?)
methods return todays revenue
methods search user repo by user name, delete booking
*/
class Customer extends User{
  constructor({id, name}) {
    super(id, name);
  }
}


export default Customer
