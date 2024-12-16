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

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  return;
}

function initializeLibrary() {
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
  addBookToLibrary("1984", "George Orwell", 328, true);
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
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
    <button class="btnDel">Delete</button>`;
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
  if (e.target.classList.contains("btnDel")) {
    const card = e.target.closest(".card");
    const bookId = card.dataset.bookId;
    card.remove();
    myLibrary.splice(bookId, 1);
    document.querySelectorAll(".card").forEach((card, index) => {
      card.dataset.bookId = index;
    });
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
