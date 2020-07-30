function fetchAllBookingData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(data => {
      return data.bookings
    })
    .catch(err => console.log(err.message))
}

export default fetchAllBookingData
