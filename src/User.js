class User {
  constructor(id = null, name = null) {
    this.id = id
    this.name = name
  }

  getFirstName() {
    return this.name.split(' ')[0]
  }

  getBookingsCost(bookings, rooms) {
    let bookingsCost = 0;
    bookings.forEach(booking => {
      bookingsCost += booking.getCost(rooms.allRooms)
    })
    return bookingsCost;
  }
  getAvailableRoomsByDate(date, hotelRooms, hotelBookings) {  //not being tested
    let dayBookings = hotelBookings.getBookingsByDate(date)
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
