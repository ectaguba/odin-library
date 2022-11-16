// Data Structures
class Book {
    constructor(
        title = "No title", 
        author = "Unknown author", 
        pages = "x", 
        read = false
    ) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return (this.read) ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not read yet`
    }
    
    }
}

class Library {
    constructor() {
        this.books = [];
    }
    
    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(title) {
        this.books = this.books.filter( (book) => book.title !== title);
    }

    getBook(title) {
        return this.books.find( (book) => book.title == title);
    }

    setRead(title){
        this.books.forEach( (book) => {
            if (book.title == title) {
                if (book.read) {
                    book.read = false
                } else {
                    book.read = true;
                }
            }
        });
    }

    isInLibrary(title) {
        return this.books.includes(title);
    }
}

const myLibrary = new Library();

// Obtain Elements
const addBtn = document.querySelector("#add-book");
const modalContainer = document.querySelector("#modal-container");
const modal = document.querySelector("#modal")
const reqInputs = document.querySelectorAll("input[required]")
const submitBtn = document.querySelector("#submit-button");
const libraryDOM = document.querySelector("#library");

console.log(reqInputs)
// Modal Functions
addBtn.addEventListener('click', function openModal() {
    modalContainer.style.opacity = "100";
    modalContainer.style.pointerEvents = "auto";
});

document.addEventListener('click', function isClickedOutsideForm(event) {
    // Click outside form a.k.a on the container
    if (event.target == modalContainer) {
        // Remove Modal
        modalContainer.style.opacity = "0";
        modalContainer.style.pointerEvents = "none";
    }
});
submitBtn.addEventListener('click', submitBook);

// Submit book functions

function getBookFromInputs() {   
    // close modal
    modalContainer.style.opacity = "0";
    modalContainer.style.pointerEvents = "none";
    // get text from input value attribute
    titleInput = document.querySelector("#title-input").value;
    authorInput = document.querySelector("#author-input").value;
    numberInput = document.querySelector("#pages-input").value;
    readInput = document.querySelector("#is-read").checked;
    // create new book object
    const newBook = new Book(titleInput, authorInput, numberInput, readInput);
    return newBook;
}

function submitBook() {
    // Validate Inputs
    for (let i = 0; i < reqInputs.length; i++) {
        if (!reqInputs[i].value) return;
    }
    // Send objects to DOM and arrays
    const book = getBookFromInputs(); 
    addBookCard(book);
    myLibrary.addBook(book);
    // Reset Inputs
    setTimeout( () => resetInputs(), 500);;
}

function resetInputs() {
    reqInputs.forEach( (input) => {
        input.value = "";
    });
    document.querySelector("#is-read").checked = false;
}

function addBookCard(bookObj) {
    // create, add, append
    const { title: titleVal, author: authorVal, pages: pagesVal, read: readVal } = bookObj
    const newTitle = document.createElement("h2");
    newTitle.classList.add('book-title');
    newTitle.textContent = titleVal;

    const newAuthor = document.createElement("h4");
    newAuthor.textContent = authorVal;

    const newPages = document.createElement ("p");
    newPages.textContent = pagesVal;

    const readBtn = document.createElement("button");
    readBtn.classList.add('read-button');
    readBtn.addEventListener('click', setRead)
    
    if (readVal) {
        readBtn.classList.add('active');
        readBtn.textContent = "Read";
    } else {
        readBtn.textContent = "Not Read";
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.textContent = "Remove Book";
    
    const newCard = document.createElement("div");
    newCard.classList.add("book-card");
    newCard.appendChild(newTitle);
    newCard.appendChild(newAuthor);
    newCard.appendChild(newPages);
    newCard.appendChild(readBtn);
    newCard.appendChild(removeBtn);

    libraryDOM.appendChild(newCard);
}

// Functions for modifying book and library
// IMPORTANT: Book title connects the DOM to the myLibrary.books array
function obtainTitleFromButton(b) {
    return b.parentNode.querySelector(".book-title").textContent;
}

function setRead(e) {
    const button = e.target;
    const title = obtainTitleFromButton(button);
    myLibrary.setRead(title);

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.textContent = "Not Read";
    } else {
        button.classList.add('active');
        button.textContent = "Read";
    }
}

function removeBook(e) {
    const button = e.target;
    const title = obtainTitleFromButton(button);
    myLibrary.removeBook(title);
    button.parentNode.remove(); // child button -> parent div
}