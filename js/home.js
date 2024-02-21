const user = JSON.parse(sessionStorage.getItem("user"));

// auth.onAuthStateChanged((user) => {
//     if (!user.emailVerified) {
//         window.location.href = "login.html";
//     }
// })
document.addEventListener("DOMContentLoaded", () => {
    db.collection("Rooms").where("status", "!=", "taken").get()
        .then((roomData) => {
            roomData.forEach((doc) => {
                const room = doc.data()
                const roomDiv = document.createElement("div");
                roomDiv.classList.add("room");
                roomDiv.innerHTML = `
                <div class="room-price">${room.roomTitle}</div>
                <div class="room-title">${room.roomNumber}</div>
                <div class="room-type">${room.roomSize}</div>
                
                <div class="room-price">${room.room_type}</div>
                <button class="reserve-btn" data-room-id="${doc.id}">Reserve</button>
                
            `;
                roomList.appendChild(roomDiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching rooms: ", error);
        })

    // Handle reservation button click
    roomList.addEventListener("click", function (event) {
        if (event.target.classList.contains("reserve-btn")) {
            const roomId = event.target.getAttribute("data-room-id");
            reserveRoom(roomId);
        }
    });
    const reserveRoom = (roomId) => {
        const roomData = db.collection("Rooms").doc(roomId);
        roomData.update({
            status: 'taken',
            reservedBy: user.uid
        })
            .then(() => {
                console.log(`Room ${roomId} reserved`);
                const reservedRoom = document.querySelector(`[data-room-id="${roomId}"]`);
                if (reservedRoom) {
                    reservedRoom.closest(".room").classList.add("room-reserved");
                    reservedRoom.textContent = "Reserved";
                    reservedRoom.disabled = true;
                }
            })
    }

})
const fetchBookedRoomsCount = () => {
    const badge = document.getElementById("badge");

    db.collection("Rooms").where("reservedBy", "==", user.uid)
        .get()
        .then((querySnapshot) => {
            badge.textContent = querySnapshot.size;
        })
        .catch((error) => {
            console.error("Error fetching booked rooms count:", error);
        });
}
fetchBookedRoomsCount()
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "login.html";
});
