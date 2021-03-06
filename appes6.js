class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    // Get list
    const list = document.getElementById("book-list");
    // Create row element for the table
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    // Append row to list
    list.appendChild(row);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showMessage(message, className) {
    // Create div element
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    // Append message
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const heading = document.querySelector("h2");

    // Insert div before heading
    container.insertBefore(div, heading);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      // Show message
      this.showMessage("Book deleted", "success");
    }
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBook(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get values from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Show error
    ui.showMessage("Please fill in all fields", "error");
  } else {
    // Add book to the list
    ui.addBook(book);

    // Add to LS
    Store.addBook(book);

    // Clear form inputs
    ui.clearFields();

    // Show success
    ui.showMessage("Book added", "success");
  }

  e.preventDefault();
});

// Event Listener for delete book
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate ui
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove book from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
