// Function to render rooms table
const renderRoomsTable = (rooms) => {
    const tableBody = document.querySelector('#roomsTable tbody');
    tableBody.innerHTML = ''; // Clear table body before rendering

    rooms.forEach(room => {
        const tr = document.createElement('tr');

        // Populate table row with room data
        tr.innerHTML = `
            <td>${room.roomTitle}</td>
            <td>${room.roomNumber}</td>
            <td>${room.roomSize}</td>
            <td>${room.room_type}</td>
            <td>
                <button class="edit-btn" data-room-id="${room.id}">Edit</button>
                <button class="delete-btn" data-room-id="${room.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
};

const fetchRooms = () => {
    db.collection('Rooms').get()
        .then((querySnapshot) => {
            const rooms = [];
            querySnapshot.forEach((doc) => {
                // Extract room data and add to rooms array
                const roomData = doc.data();
                const room = {
                    id: doc.id,
                    roomTitle: roomData.roomTitle,
                    roomNumber: roomData.roomNumber,
                    roomSize: roomData.roomSize,
                    room_type: roomData.room_type
                };
                rooms.push(room);
            });

            // Render rooms table with fetched data
            renderRoomsTable(rooms);
        })
        .catch((error) => {
            console.error('Error fetching rooms:', error);
            alert('Failed to fetch rooms. Please check the console for details.');
        });
};

// Function to show modal
const showModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
};

// Function to hide modal
const hideModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
};

// Function to add a room
const addRoom = (roomData) => {
    db.collection("Rooms").add(roomData)
        .then(() => {
            console.log("Room added successfully.");
            alert("Room added successfully.");
            hideModal('addRoomModal');
            fetchRooms(); // Refresh rooms table
        })
        .catch((error) => {
            console.error("Error adding room: ", error);
            alert("Failed to add room. Please check the console for details.");
        });
};

// Function to update a room
const updateRoom = (roomId, newData) => {
    db.collection("Rooms").doc(roomId).update(newData)
        .then(() => {
            console.log("Room updated successfully.");
            alert("Room updated successfully.");
            hideModal('updateRoomModal');
            fetchRooms(); // Refresh rooms table
        })
        .catch((error) => {
            console.error("Error updating room: ", error);
            alert("Failed to update room. Please check the console for details.");
        });
};

// Function to delete a room
const deleteRoom = (roomId) => {
    db.collection("Rooms").doc(roomId).delete()
        .then(() => {
            console.log("Room deleted successfully.");
            alert("Room deleted successfully.");
            fetchRooms(); // Refresh rooms table
        })
        .catch((error) => {
            console.error("Error deleting room: ", error);
            alert("Failed to delete room. Please check the console for details.");
        });
};

// Event listener for 'Add Room' form submission
document.getElementById('addRoomForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const roomData = {
        roomTitle: document.getElementById('roomTitle').value,
        roomNumber: document.getElementById('roomNumber').value,
        roomSize: document.getElementById('roomSize').value,
        room_type: document.getElementById('roomType').value
        // Add more fields as needed
    };
    addRoom(roomData);
});
document.getElementById('addNewRoomBtn').addEventListener('click', () => {
    showModal('addRoomModal');
});
// Event listener for 'Edit' buttons
// Event listener for 'Edit' buttons
document.getElementById('roomsTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const roomId = e.target.dataset.roomId;

        // Fetch the existing room data from Firestore
        db.collection("Rooms").doc(roomId).get()
            .then((doc) => {
                if (doc.exists) {
                    const roomData = doc.data();

                    // Populate the update form with existing room data
                    document.getElementById('updatedTitle').value = roomData.roomTitle;
                    document.getElementById('updatedRoomNumber').value = roomData.roomNumber;
                    document.getElementById('updatedRoomSize').value = roomData.roomSize;
                    document.getElementById('updatedRoomType').value = roomData.room_type;

                    // Show the update modal
                    showModal('updateRoomModal');
                } else {
                    console.log("No such document!");
                    alert("Room data not found.");
                }
            })
            .catch((error) => {
                console.error("Error getting room data:", error);
                alert("Failed to fetch room data. Please check the console for details.");
            });
    }
});


// Event listener for 'Delete' buttons
document.getElementById('roomsTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const roomId = e.target.dataset.roomId;
        if (confirm("Are you sure you want to delete this room?")) {
            deleteRoom(roomId);
        }
    }
});

// Call fetchRooms function to load rooms when the page loads
window.addEventListener('DOMContentLoaded', fetchRooms);
