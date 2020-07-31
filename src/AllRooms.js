/*Array of room objects, may have child classes(rooms available, booked rooms)
property is array of rooms
methods, filter on rooms based on ind room properties
return % of rooms occupied today, return revenue of array?*/
// {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4}
class AllRooms {
  constructor(allRooms) {
    this.allRooms = allRooms
  }

  filterRoomsByType(roomType) {
    return this.allRooms.filter(room => room.roomType === roomType)
  }
}

export default AllRooms
