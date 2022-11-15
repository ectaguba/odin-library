// Array of objects
let myLibrary = []

// Obtain Elements
const addBtn = document.querySelector("#add-book");
const modalContainer = document.querySelector("#modal-container");
const modal = document.querySelector("#modal")
const reqInputs = document.querySelectorAll("input[required]")
const submitBtn = document.querySelector("#submit");
const library = document.querySelector("#library");

addBtn.addEventListener('click', openModal);
document.addEventListener('click', function isClickedOutsideForm(event) {
    // Click outside form a.k.a on the container
    if (event.target == modalContainer) {
        modalContainer.style.opacity = "0";
        modalContainer.style.pointerEvents = "none";
    }
});
submitBtn.addEventListener('click', addBook);

function Book(title = "No title", author = "Unknown author", pages = "x", read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return (this.read) ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not read yet`
    }
}

function openModal() {
    modalContainer.style.opacity = "100";
    modalContainer.style.pointerEvents = "auto";
}

function addBook() {   
    // validate inputs 

    // close modal
    modalContainer.style.opacity = "0";
    modalContainer.style.pointerEvents = "none";
    // get text from input value attribute
    titleInput = document.querySelector("#title").value;
    authorInput = document.querySelector("#author").value;
    numberInput = document.querySelector("#pages").value;
    readInput = document.querySelector("#is-read").checked;
    // create new book object
    let newBook = new Book(titleInput, authorInput, numberInput, readInput)
    // add to array
    myLibrary.push(newBook);
    // Display and reset
    displayBook(newBook);
    resetInputs();
}

function displayBook(book) {
    // create, add, append

    const { title: titleVal, author: authorVal, pages: pagesVal, read: readVal } = book
    const newTitle = document.createElement("h2");
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

    library.appendChild(newCard);
}

// set read status 
function setRead() {

}

function removeBook() {

}
// remove book from DOM and library
    // NodeList = myLibrary array of objects

function resetInputs() {
    reqInputs.forEach( (input) => {
        setTimeout( () => input.value = "", 500);
    });
    setTimeout( () => document.querySelector("#is-read").checked = false, 500);
}