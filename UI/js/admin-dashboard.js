/**
 * Meet up modal
 */
// Get the  create-meetup-modal modal
const createMeetupModal = document.getElementById('create-meetup-modal');

// Get the button that opens the modal
const createMeetupbtn = document.getElementById('create-meetup');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
createMeetupbtn.addEventListener('click', () => {
  createMeetupModal.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  createMeetupModal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === createMeetupModal) {
    createMeetupModal.style.display = 'none';
  }
});


// Get the delete-meetup-modal modal
const deleteMeetupModal = document.getElementById('delete-meetup-modal');

// Get the button that opens the modal
const deleteMeetupbtn = document.getElementById('delete-meetup');

// Get the <span> element that closes the modal
const close = document.getElementsByClassName('close')[1];

// When the user clicks on the button, open the modal
deleteMeetupbtn.addEventListener('click', () => {
  deleteMeetupModal.style.display = 'block';
});

// When the user clicks on <span> (x), close the modal
close.addEventListener('click', () => {
  deleteMeetupModal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === deleteMeetupModal) {
    deleteMeetupModal.style.display = 'none';
  }
});
