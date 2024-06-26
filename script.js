let myLibrary = [];
const newBook = document.querySelector('form');
const bookFeedback = document.querySelector('#add-book-message');
const main = document.querySelector('main');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

newBook.addEventListener("submit", addBookToLibrary);

function updateBookList() {
    document.querySelector('.book-list').remove();
    const bookList = document.createElement('section');
    bookList.classList.add('book-list');
    main.appendChild(bookList);

    myLibrary.forEach((book, index) => {
        const newItem = document.createElement('div');
        newItem.classList.add('book-item');
        newItem.dataset.index = index;

        const newItemTitle = document.createElement('span');
        newItemTitle.classList.add('book-item-text');
        newItemTitle.textContent = book.title;
        newItem.appendChild(newItemTitle);

        const newItemAuthor = document.createElement('span');
        newItemAuthor.classList.add('book-item-text');
        newItemAuthor.textContent = book.author;
        newItem.appendChild(newItemAuthor);

        const newItemPages = document.createElement('span');
        newItemPages.classList.add('book-item-text');
        newItemPages.textContent = book.pages;
        newItem.appendChild(newItemPages);

        const newItemBtnRead = document.createElement('button');
        if(book.read === true) {
            newItemBtnRead.classList.add('book-item-btn', 'read');
            newItemBtnRead.textContent = 'Read';
        } else {
            newItemBtnRead.classList.add('book-item-btn', 'read', 'unread');
            newItemBtnRead.textContent = 'Unread';
        }
        newItem.appendChild(newItemBtnRead);

        const newItemBtnRemove = document.createElement('button');
        newItemBtnRemove.classList.add('book-item-btn', 'remove');
        newItemBtnRemove.textContent = 'Remove';
        newItem.appendChild(newItemBtnRemove);

        bookList.appendChild(newItem);
    })

    updateEventListeners();
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


function updateEventListeners() {
    const bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach(item => {
        const removeBtn = item.querySelector('.remove');
        removeBtn.addEventListener("click", (e) => {
            removeBookFromLibrary(item.dataset['index']);
            updateBookList();
        });
        
        const readBtn = item.querySelector('.read');
        readBtn.addEventListener("click", (e) => {
            changeReadStatus(item.dataset['index']);
        })
        });
}


function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}


function changeReadStatus(index) {
    myLibrary[index]['read'] = !myLibrary[index]['read'];
    updateBookList();
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


updateBookList();
