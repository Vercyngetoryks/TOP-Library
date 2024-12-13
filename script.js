"use strict";

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read === "yes" ? "read already" : "not read yet"
  }`;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "no");

console.log(theHobbit.info());
