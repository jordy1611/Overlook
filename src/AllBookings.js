class AllBookings {
  constructor(bookings) {
    this.bookings = bookings
  }

  getBookingsByUser(id) {
    return this.bookings.filter(booking => booking.userID === id)
  }

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }
}

export default AllBookings
