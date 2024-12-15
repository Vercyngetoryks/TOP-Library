"use strict";

const myLibrary = [];
const library = document.querySelector(".library");
const showButton = document.getElementById("showDialog");
const cancelButton = document.getElementById("cancelBtn");
const dialogBox = document.querySelector(".dialog");
const bookTitleInput = document.getElementById("bookTitle");
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === true ? "I read it already" : "Not read it yet";
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  return;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

function displayBooks() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2 class="header-secondary">${book.title}</h2>
      <p>by</p>
      <h3 class="header-tertiary">${book.author}</h3>
      <br>
      <p>${book.pages} pages</p>
      <br>
      <p>${book.read}</p>`;
    library.appendChild(card);
  });
}

displayBooks();

showButton.addEventListener("click", () => {
  dialogBox.showModal();
  setTimeout(() => {
    bookTitleInput.focus();
  }, 800);
});

cancelButton.addEventListener("click", () => {
  dialogBox.close();
});
