const user = JSON.parse(sessionStorage.getItem("user"));
const fetchBookedRooms = () => {
    const bookedRoomsList = document.getElementById("bookedRoomsList");

    db.collection("Rooms").where("reservedBy", "==", user.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const roomData = doc.data();
                const roomId = doc.id;
                const roomElement = document.createElement("div");
                roomElement.innerHTML = `
                    <p>Room Number: ${roomData.roomTitle}</p>
                    <p>Room Number: ${roomData.roomNumber}</p>
                    <p>Room Type: ${roomData.room_type}</p>
                    <p>Room Number: ${roomData.roomSize}</p>
                    <button onclick="cancelBooking('${roomId}')">Cancel Booking</button>
                `;
                bookedRoomsList.appendChild(roomElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching booked rooms:", error);
        });
}
fetchBookedRooms()

const cancelBooking = (roomId) => {
    db.collection("Rooms").doc(roomId).update({
        reservedBy: firebase.db.FieldValue.delete()
    })
    .then(() => {
        alert("Booking cancelled successfully");
        // Remove the cancelled room from the list
        document.getElementById(roomId).remove();
    })
    .catch((error) => {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking. Please try again.");
    });
};

const bookAnotherRoom = () => {
    window.location.href = "home.html";
};
