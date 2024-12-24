"use strict";

const myLibrary = [];
const library = document.querySelector(".library");
const showButton = document.getElementById("showDialog");
const cancelButton = document.getElementById("cancelBtn");
const dialogBox = document.querySelector(".dialog");
const form = document.querySelector(".bookInputs");
const bookTitleInput = document.getElementById("bookTitle");
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === "yes" ? "I read it already" : "Not read it yet";
  }
}

Book.prototype.toggleRead = function () {
  this.read === "I read it already"
    ? (this.read = "Not read it yet")
    : (this.read = "I read it already");
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  return;
}

function initializeLibrary() {
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "yes");
  addBookToLibrary("1984", "George Orwell", 328, "yes");
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "no");
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "no");
}

function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.bookId = myLibrary.indexOf(book);
  card.innerHTML = `
    <div>
      <h2 class="header-secondary">${book.title}</h2>
      <p>by</p>
      <h3 class="header-tertiary">${book.author}</h3>
      <br>
      <p>${book.pages} pages</p>
      <br>
      <p>${book.read}</p>
    </div>
    <div class="cardBtns">
    <button class="btnRead"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btnCard-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>
</buttton>
    <button class="btnDel"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btnCard-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button>
    </div>
    `;
  library.appendChild(card);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    createCard(book);
  });
}

function renderLastBook() {
  const book = myLibrary[myLibrary.length - 1];
  createCard(book);
}

initializeLibrary();
displayBooks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const read = document.getElementById("bookRead").value;

  addBookToLibrary(title, author, pages, read);
  renderLastBook();
  dialogBox.close();
  form.reset();
});

library.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const bookId = card.dataset.bookId;
  const book = myLibrary[bookId];

  if (e.target.classList.contains("btnDel")) {
    card.remove();
    myLibrary.splice(bookId, 1);
    document.querySelectorAll(".card").forEach((card, index) => {
      card.dataset.bookId = index;
    });
  }

  if (e.target.classList.contains("btnRead")) {
    book.toggleRead();
    card.querySelector("p:last-of-type").textContent = book.read;
  }
});

showButton.addEventListener("click", () => {
  dialogBox.showModal();
  setTimeout(() => {
    bookTitleInput.focus();
  }, 800);
});

cancelButton.addEventListener("click", () => {
  dialogBox.close();
});
