/*Individual user
properties => id & name imported, bookings =[], amount spent on rooms = 0
methods => get bookings(current and present)? get total spent on rooms
for the manager, return bookings and total amount spent
parent user class to customer and manager*/
class User {
  constructor(id = null, name = null) {
    this.id = id
    this.name = name
  }

  getFirstName() {
    return this.name.split(' ')[0]
  }

  getBookingsCost(bookings, rooms) {
// might have issues with single bookinfg
    let bookingsCost = 0;
    bookings.forEach(booking => {
      bookingsCost += booking.getCost(rooms.allRooms)
    })
    return bookingsCost;
  }
  getAvailableRoomsByDate(date, hotelRooms, hotelBookings) { //NO TEST YET
    let dayBookings = hotelBookings.getBookingsByDate(date)
    // let availableRooms = hotelData.rooms.allRooms.map(room => room)
    let availableRooms = hotelRooms.allRooms.map(room => room)
    dayBookings.forEach(booking => {
      availableRooms = availableRooms.filter(room => {
        return room.number !== booking.roomNumber
      })
    })
    return availableRooms
  }
}

export default User;
