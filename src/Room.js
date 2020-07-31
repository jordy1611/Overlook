/*individual room, makes room card for user display
properties number, type, bidet, bedsize, numbeds, cost
method maybe one which returns if it has property to make filtering easier?
  like roomIs('residential suite') returns tru*/
class Room {
  constructor({number, roomType, bidet, numBeds, costPerNight}) {
    this.number = number;
    this.roomType = roomType;
    this.bidet = bidet;
    this.numBeds = numBeds;
    this.costPerNight = costPerNight;
  }
}

export default Room
// {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4}
