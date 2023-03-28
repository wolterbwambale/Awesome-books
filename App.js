let booksCollection = loadFromLocalStorage() || [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function removeBookFromCollection(title, author) {
  booksCollection = booksCollection.filter((book) => book.title !== title || book.author !== author);
  saveToLocalStorage();
}

function displayBooks() {
  const booksContainer = document.getElementById('book-list');
  booksContainer.innerHTML = '';

  for (let i = 0; i < booksCollection.length; i += 1) {
    const book = booksCollection[i];
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `<p>Title: ${book.title}</p><p>Author: ${book.author}</p>`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBookFromCollection(book.title, book.author);
      displayBooks();
    });
    bookElement.appendChild(removeButton);
    booksContainer.appendChild(bookElement);
  }
}

function addBookToCollection(title, author) {
  const newBook = new Book(title, author);
  booksCollection.push(newBook);
  saveToLocalStorage();
  displayBooks();
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem('booksCollection'));
}

function saveToLocalStorage() {
  localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
}

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  addBookToCollection(titleInput.value, authorInput.value);
  titleInput.value = ''; 
  authorInput.value = ''; 
});

displayBooks();
