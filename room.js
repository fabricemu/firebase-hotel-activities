const addroom = document.getElementById("addroom")
addroom.addEventListener("click",() =>{
    const roomTitle=document.getElementById("roomTitle").value;
    const roomNumber=document.getElementById("roomNumber").value;
    const roomSize=document.getElementById("roomSize").value;
    const room_type=document.getElementById("room_type").value;
   console.log(roomNumber+roomSize+roomTitle+room_type)
   
      try { 
    
        db.collection("Rooms").add({
            room_title:roomTitle ,
            room_number:roomNumber,
            room_size:roomSize ,
            room_type:room_type ,
           
          })
          alert("Room added")
    }
    catch (error) {
        console.error("Error adding room:", error);
    }


})
    
 