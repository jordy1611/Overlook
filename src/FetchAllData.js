function fetchAllData() {
  let customerData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(data => {
      return data.users;
    })
    .catch(err => console.log(err.message))

  let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(data => {
      return data.rooms;
    })
    .catch(err => console.log(err.message))

  let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .then(data => {
      return data.bookings;
    })
    .catch(err => console.log(err.message))

  return Promise.all([customerData, roomData, bookingData])
    .then(data => {
      let allData = {}
      allData.customerData = data[0];
      allData.roomData = data[1];
      allData.bookingData = data[2];
      return allData;
    })
}

export default fetchAllData;
