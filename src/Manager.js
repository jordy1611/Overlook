import User from '../src/User'
/*only 1
porperty isManager = true (for if statements?)
methods return todays revenue
methods search user repo by user name, delete booking
*/
class Manager extends User{
  constructor() {
    super('manager', 'Manager');
  }
}


export default Manager
