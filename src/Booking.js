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
