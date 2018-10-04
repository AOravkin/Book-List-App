// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to the UI prototype
UI.prototype.addBook = function(book) {
  // Get list
  const list = document.getElementById("book-list");
  // Create row element for the table
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  `;
  list.appendChild(row);
};

// Add Event Listener
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get values from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Add book to the list
  ui.addBook(book);

  e.preventDefault();
});
