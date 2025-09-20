let myLibrary = []
const contentDiv = document.querySelector('.content')
const addBtn = document.querySelector('#add-button')
const dialog = document.querySelector("dialog");
const addForm = document.querySelector('#add-form')
const cancelBtn = document.querySelector('#cancel-button')

class Book {
    constructor(name, author, pages, read=false) {
        this.uid = crypto.randomUUID()
        this.name = name
        this.author = author
        this.pages = pages
        this.read = read
    }

    toggleReadStatus() {
        this.read = this.read ? false : true
    }
}

function addBookToLibrary(name, author, pages, read) {
    const book = new Book(name, author, pages, read)
    myLibrary.push(book)
}

function displayBooks() {
    if (myLibrary.length === 0) {
        contentDiv.textContent = "No books to display. Kindly add"
        return
    }
    let cards = ``
    for (let i = 0; i < myLibrary.length; i++) {
        let toCheck = myLibrary[i].read ? "checked" : ""
        cards += `<div id=${myLibrary[i].uid} class="card">
            <p>Book: ${myLibrary[i].name}</p>
            <p>Author: ${myLibrary[i].author}</p>
            <p>Pages: ${myLibrary[i].pages}</p>
            <label for="name">Read?</label>
            <input type="checkbox" name="read" class="read" ${toCheck}/>
            <span class="material-icons delete-button">delete</span>
        </div>`
    }
    contentDiv.innerHTML = cards
    resetCheckboxes()
    resetDeleteButtons()
}

function resetCheckboxes() {
    const readChkboxes = document.querySelectorAll('.read')
    readChkboxes.forEach((chkBox) => {
        chkBox.addEventListener('change', function(e) {
            const bookId = e.target.parentElement.id
            const bookIndex = myLibrary.findIndex(obj => obj.uid === bookId)
            myLibrary[bookIndex].toggleReadStatus()
        })
    })
}

function resetDeleteButtons() {
    const deleteBtns = document.querySelectorAll('.delete-button')
    deleteBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
            const bookId = e.target.parentElement.id
            const remained = myLibrary.filter(obj => obj.uid !== bookId)
            myLibrary = remained
            displayBooks()
        })
    })
}

addBtn.addEventListener('click', () => {
    dialog.showModal();
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault()
    dialog.close()
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(addForm)
    const name = formData.get("name")
    const author = formData.get("author")
    const pages = formData.get("pages")
    const read = formData.get("read") === "on" ? true : false
    if (name === "" || author === "" || pages === "") {
        alert("Please enter all the fields.")
    } else {
        addBookToLibrary(name, author, pages, read)
        addForm.reset()
        dialog.close()
    }
    displayBooks()
})

displayBooks()