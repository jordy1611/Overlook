unction fetchAllRoomData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .then(data => {
      return data.rooms
    })
    .catch(err => console.log(err.message))
}

export default fetchAllRoomData
