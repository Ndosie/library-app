const myLibrary = [
    {
        uuid: 19101919197,
        name: 'Mabala the farmer',
        author: 'Fathom Igwe',
        pages: 356,
        read: false
    },
    {
        uuid: 19101919196,
        name: 'Mabala the farmer',
        author: 'Fathom Igwe',
        pages: 356,
        read: true
    },
    {
        uuid: 19101919195,
        name: 'Mabala the farmer',
        author: 'Fathom Igwe',
        pages: 356,
        read: false
    },
    {
        uuid: 19101919193,
        name: 'Mabala the farmer',
        author: 'Fathom Igwe',
        pages: 356,
        read: false
    },
    {
        uuid: 19101919194,
        name: 'Mabala the farmer',
        author: 'Fathom Igwe',
        pages: 356,
        read: false
    }
]
const contentDiv = document.querySelector('.content')
const addBtn = document.querySelector('#add_button')
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancel-button");

function Book(name, author, pages, read=false) {
    this.uid = crypto.randomUUID()
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleReadStatus = function () {
    this.read = this.read ? false : true
}

function addBookToLibrary(name, author, pages, read) {
    const book = new Book(name, author, pages, read)
    myLibrary.push(book)
}

function displayBooks() {
    let cards = ``
    for (let i = 0; i < myLibrary.length; i++) {
        let toCheck = myLibrary[i].read ? "checked" : ""
        cards += `<div id=${myLibrary[i].uuid} class="card">
            <p>Book: ${myLibrary[i].name}</p>
            <p>Author: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
            <label>Read?</label>
            <input type="checkbox" ${toCheck}/>
        </div>`
    }
    contentDiv.innerHTML = cards
}

addBtn.addEventListener('click', () => {
    dialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

displayBooks()