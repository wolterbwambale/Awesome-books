class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}


class BookCollection {
  constructor() {
    this.books =  [];
    this.container = document.getElementById('book-list');
    this.addButton = document.getElementById('add-button');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    
    this.addButton.addEventListener('click', (event) => {
      event.preventDefault(); 
      this.addBookToCollection(this.titleInput.value, this.authorInput.value);
      this.titleInput.value = ''; 
      this.authorInput.value = ''; 
    });
    
    this.displayBooks();
  }
  
  addBookToCollection(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    // this.saveToLocalStorage();
    this.displayBooks();
  }
  
  removeBookFromCollection(title, author) {
    this.books = this.books.filter((book) => book.title !== title || book.author !== author);
    // this.saveToLocalStorage();
    this.displayBooks();
  }
  
  displayBooks() {
    this.container.innerHTML = '';
  
    for (let i = 0; i < this.books.length; i += 1) {
      const book = this.books[i];
      const bookElement = document.createElement('div');
      bookElement.innerHTML = `<p>Title: ${book.title}</p>
                               <p>Author: ${book.author}</p>`;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBookFromCollection(book.title, book.author);
      });
      
      bookElement.appendChild(removeButton);
      this.container.appendChild(bookElement);
    }
  }
  
  // loadFromLocalStorage() {
  //   return JSON.parse(localStorage.getItem('booksCollection'));
  // }
  
  // saveToLocalStorage() {
  //   localStorage.setItem('booksCollection', JSON.stringify(this.books));
  // }
}

const bookCollection = new BookCollection();
