// Array of objects
let myLibrary = [

]

// Obtain Elements
const addBtn = document.querySelector("#add-book");
const modalContainer = document.querySelector("#modal-container");
const submitBtn = document.querySelector("#submit");
// const readBtn = document.querySelector("#read-button");
// const removeBtn = document.querySelector("#remove-button")


addBtn.addEventListener('click', inputBook);

function Book(title = "No title", author = "Unknown author", pages = "x", read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return (read) ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not read yet`
    }
}

let hobbit = new Book()
console.log(hobbit.info())

function inputBook() {
    modalContainer.style.opacity = "100";
    modalContainer.style.pointerEvents = "auto";
}

function addBook(book) {

    myLibrary.append(book);
}

function displayBooks() {

}