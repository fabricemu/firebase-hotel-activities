const addRoom = (e) => {
    e.preventDefault(); // Prevent form submission
    const roomTitle = document.getElementById("roomTitle").value;
    const roomNumber = document.getElementById("roomNumber").value;
    const roomSize = document.getElementById("roomSize").value;
    const room_type = document.getElementById("room_type").value;
    db.collection("Rooms").add({
      roomTitle: roomTitle,
      roomNumber: roomNumber,
      roomSize: roomSize,
      room_type: room_type
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  document.getElementById("add_room").addEventListener("click", addRoom);
    
 