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

function updateBookList() {
    const myLibraryIndex = myLibrary.length - 1;
    const bookList = document.querySelector('.book-list');

    const newItem = document.createElement('div');
    newItem.classList.add('book-item');

    const newItemTitle = document.createElement('span');
    newItemTitle.classList.add('book-item-text');
    newItemTitle.textContent = myLibrary[myLibraryIndex].title;
    newItem.appendChild(newItemTitle);

    const newItemAuthor = document.createElement('span');
    newItemAuthor.classList.add('book-item-text');
    newItemAuthor.textContent = myLibrary[myLibraryIndex].author;
    newItem.appendChild(newItemAuthor);

    const newItemPages = document.createElement('span');
    newItemPages.classList.add('book-item-text');
    newItemPages.textContent = myLibrary[myLibraryIndex].pages;
    newItem.appendChild(newItemPages);

    const newItemBtnRead = document.createElement('button');
    if(myLibrary[myLibraryIndex].read === 'on') {
        newItemBtnRead.classList.add('book-item-btn', 'read');
        newItemBtnRead.textContent = 'Read';
    } else {
        newItemBtnRead.classList.add('book-item-btn', 'unread');
        newItemBtnRead.textContent = 'Unread';
    }
    newItem.appendChild(newItemBtnRead);

    const newItemBtnRemove = document.createElement('button');
    newItemBtnRemove.classList.add('book-item-btn', 'remove');
    newItemBtnRemove.textContent = 'Remove';
    newItem.appendChild(newItemBtnRemove);

    bookList.appendChild(newItem);
}

function addBookToLibrary(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const title = data.get('title');
    const author = data.get('author');
    const pages = data.get('pages');
    const read = data.get('read');

    const book = new Book(title, author, pages, read == 'on' ? true : false);

    let bookExists = checkIfBookExist(book, title, author);

    if(!bookExists) {
        myLibrary.push(book);
        console.log(myLibrary[0].title);
        updateBookList();
    }

    return eraseInputs(bookExists);
}

function checkIfBookExist(book, title, author) {
    let flag = false;

    myLibrary.forEach(book => {
        if(book['title'].toLowerCase() === title.toLowerCase() 
            && book['author'].toLowerCase() === author.toLowerCase()) {
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
