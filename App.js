class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.booksCollection = JSON.parse(localStorage.getItem('booksCollection')) || [];
    this.booksContainer = document.getElementById('book-list');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addButton = document.getElementById('add-button');
    this.addButton.addEventListener('click', this.addBookToCollection.bind(this));
    this.displayBooks();
  }

  addBookToCollection() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    const newBook = new Book(title, author);
    this.booksCollection.push(newBook);
    localStorage.setItem('booksCollection', JSON.stringify(this.booksCollection));
    this.titleInput.value = '';
    this.authorInput.value = '';
    this.displayBooks();
  }

  removeBookFromCollection(title, author) {
    this.booksCollection = this.booksCollection.filter(
      (book) => book.title !== title || book.author !== author
    );
    localStorage.setItem('booksCollection', JSON.stringify(this.booksCollection));
    this.displayBooks();
  }

  displayBooks() {
    this.booksContainer.innerHTML = '';
    for (let i = 0; i < this.booksCollection.length; i++) {
      const book = this.booksCollection[i];
      const bookElement = document.createElement('div');
      bookElement.innerHTML = `<h2>All awesome books</h2><p>Title: ${book.title}</p><p>Author: ${book.author}</p>`;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBookFromCollection(book.title, book.author);
      });
      bookElement.appendChild(removeButton);
      this.booksContainer.appendChild(bookElement);
    }
  }
}

const library = new Library();
