let myLibrary = []

function Book(title = "No title", author = "Unknown author", pages = "x", read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // Methods: Set this.functionName to a function
    this.info = () => {
        return (read) ? `${title} by ${author}, ${pages} pages, read` : `${title} by ${author}, ${pages} pages, not read yet`
    }
}

let hobbit = new Book()
console.log(hobbit.info())

function addBook(book) {
    myLibrary.append(book);
}

function displayBooks() {
    
}