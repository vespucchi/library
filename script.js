const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

// MODAL
const modal = document.querySelector('dialog');
const openModal = document.querySelector('#add-book');
const closeModal = document.querySelector('#close-modal'); 

// "Show the dialog" button opens the dialog modally
openModal.addEventListener("click", () => {
    modal.showModal();
});
  
  // "Close" button closes the dialog
closeModal.addEventListener("click", () => {
    modal.close();
});