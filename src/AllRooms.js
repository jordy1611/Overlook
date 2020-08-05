class AllRooms {
  constructor(allRooms) {
    this.allRooms = allRooms
  }

  filterRoomsByType(roomType) {
    return this.allRooms.filter(room => room.roomType === roomType)
  }

}

export default AllRooms
