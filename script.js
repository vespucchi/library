const myLibrary = [];
const newBook = document.querySelector('form');
const bookFeedback = document.querySelector('#add-book-message');

class Book {
  // the constructor...
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

newBook.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get('title').toLowerCase;
    const author = data.get('author').toLowerCase;
    const pages = data.get('pages');
    const read = data.get('read');

    const book = new Book(title, author, pages, read == 'on' ? true : false);

    let bookExists = checkIfBookExist(book, title, author);

    if(!bookExists) myLibrary.push(book);

    return eraseInputs(bookExists);
}

function checkIfBookExist(book, title, author) {
    let flag = false;

    myLibrary.forEach(book => {
        console.log(book['title'] === title && book['author'] === author);
        if(book['title'] === title && book['author'] === author) {
            return flag = true;
        }
    })

    return flag === true ? true : false;
}

function eraseInputs(status) {
    if(status) {
        bookFeedback.style.color = 'red';
        bookFeedback.textContent = 'This book already exists in your library!';
    } else {
        newBook.reset();

        bookFeedback.style.color = 'green';
        bookFeedback.textContent = 'Successfully added the book';
    }
}


// MODAL
const modal = document.querySelector('dialog');
const openModal = document.querySelector('#add-book');
const closeModal = document.querySelector('#close-modal');

// "Show the dialog" button opens the dialog modally
openModal.addEventListener("click", () => {
    newBook.reset()
    bookFeedback.textContent = '';
    modal.showModal();
});

// "Close" button closes the dialog
closeModal.addEventListener("click", () => {
    modal.close();
});
