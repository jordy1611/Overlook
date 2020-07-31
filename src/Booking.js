
/*Individual bookings
properties, id(wtf), userID, date, room number, roomservicecharges*/
class Booking {
  constructor({id, userID, date, roomNumber, roomServiceCharges}) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomServiceCharges = roomServiceCharges;
  }

  getCost(hotelRooms) {
    return hotelRooms.find(room => room.number === this.roomNumber).costPerNight
  }
}


export default Booking
// {"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2020/04/22","roomNumber":15,"roomServiceCharges":[]}
