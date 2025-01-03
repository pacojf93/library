
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read?"read":"not read yet"}`
    };
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

const myLibrary = [
    new Book("The Colour of Magic", "Terry Pratchett", 288, true),
    new Book("The Light Fantastic", "Terry Pratchett", 241, true),
    new Book("Equal Rites", "Terry Pratchett", 228, true),
    new Book("Mort", "Terry Pratchett", 272, true),
    new Book("Sourcery", "Terry Pratchett", 260, true),
    new Book("Wyrd Sisters", "Terry Pratchett", 265, true),
    new Book("Pyramids", "Terry Pratchett", 336, true),
    new Book("Guards! Guards!", "Terry Pratchett", 416, true),
    new Book("Eric", "Terry Pratchett", 197, true),
    new Book("Moving Pictures", "Terry Pratchett", 399, true),
    new Book("Reaper Man", "Terry Pratchett", 352, true),
    new Book("Witches Abroad", "Terry Pratchett", 386, false),
    new Book("Small Gods", "Terry Pratchett", 400, false),
    new Book("Lords and Ladies", "Terry Pratchett", 352, false),
    new Book("Men at Arms", "Terry Pratchett", 352, true),
    new Book("Soul Music", "Terry Pratchett", 400, false),
    new Book("Interesting Times", "Terry Pratchett", 272, false),
    new Book("Maskerade", "Terry Pratchett", 368, false),
    new Book("Feet of Clay", "Terry Pratchett", 384, true),
    new Book("Hogfather", "Terry Pratchett", 432, false),
    new Book("Jingo", "Terry Pratchett", 416, false),
    new Book("The Last Continent", "Terry Pratchett", 352, false),
    new Book("Carpe Jugulum", "Terry Pratchett", 419, false),
    new Book("The Fifth Elephant", "Terry Pratchett", 400, true),
    new Book("The Truth", "Terry Pratchett", 400, false),
    new Book("Thief of Time", "Terry Pratchett", 432, false),
    new Book("The Last Hero", "Terry Pratchett", 176, false),
    new Book("The Amazing Maurice and his Educated Rodents", "Terry Pratchett", 272, false),
    new Book("Night Watch", "Terry Pratchett", 432, false),
    new Book("The Wee Free Men", "Terry Pratchett", 263, false),
    new Book("Monstrous Regiment", "Terry Pratchett", 432, false),
    new Book("A Hat Full of Sky", "Terry Pratchett", 352, false),
    new Book("Going Postal", "Terry Pratchett", 480, false),
    new Book("Thud!", "Terry Pratchett", 384, false),
    new Book("Wintersmith", "Terry Pratchett", 336, false),
    new Book("Making Money", "Terry Pratchett", 400, false),
    new Book("Unseen Academicals", "Terry Pratchett", 400, false),
    new Book("I Shall Wear Midnight", "Terry Pratchett", 355, false),
    new Book("Snuff", "Terry Pratchett", 400, false),
    new Book("Raising Steam", "Terry Pratchett", 384, false),
    new Book("The Shepherd's Crown", "Terry Pratchett", 336, false)
];


const container = document.querySelector("#library-container")
const form = document.querySelector("#new-book-form")

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}

function eraseDisplay() {
    const displayedBooks = container.querySelectorAll(".library-item")
    displayedBooks.forEach(book => book.remove())
}

function displayLibrary() {
    myLibrary.forEach( (book, index) => {
        const libraryItem = document.createElement("div")
        libraryItem.classList.add("library-item")

        /* title */
        const bookTitle = document.createElement("div")
        bookTitle.classList.add("book-title")
        bookTitle.textContent = book.title

        /* author */
        const bookAuthor = document.createElement("div")
        bookAuthor.classList.add("book-author")
        bookAuthor.textContent = `by ${book.author}`

        /* pages */
        const bookPages = document.createElement("div")
        bookPages.classList.add("book-pages")
        bookPages.textContent = `${book.pages} pages`

        /* read */
        const bookIsRead = document.createElement("div")
        bookIsRead.classList.add("book-read")
        bookIsRead.textContent = book.read?"Read":"Not read yet"

        /* delete button */
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("book-delete-button")
        deleteButton.textContent = "Delete"
        deleteButton.id = `delete-${index}`

        /* toggle read button */
        const toggleReadButton = document.createElement("button")
        toggleReadButton.classList.add("toggle-read-button")
        toggleReadButton.textContent = book.read?'Unmark "Read"':'Mark "Read"'
        toggleReadButton.id = `toggle-${index}`

        libraryItem.appendChild(bookTitle)
        libraryItem.appendChild(bookAuthor)
        libraryItem.appendChild(bookPages)
        libraryItem.appendChild(bookIsRead)
        libraryItem.appendChild(deleteButton)
        libraryItem.appendChild(toggleReadButton)

        container.appendChild(libraryItem)
    })
}

container.addEventListener("click", event => {
    if(Array.from(event.target.classList).includes("book-delete-button")) {
        myLibrary.splice(event.target.id.replace("delete-",""), 1)
        eraseDisplay()
        displayLibrary()
    } 

    if(Array.from(event.target.classList).includes("toggle-read-button")) {
        myLibrary[event.target.id.replace("toggle-","")].toggleRead()
        eraseDisplay()
        displayLibrary()
    }
})

form.addEventListener("submit", event => {
    event.preventDefault()
    const formData = new FormData(form)
    const title = formData.get("title")
    const author = formData.get("author")
    const pages = formData.get("pages")
    const read = formData.get("read") === "yes"
    addBookToLibrary(title, author, pages, read)
    form.reset()
    eraseDisplay()
    displayLibrary()
})

//eraseDisplay()
displayLibrary()