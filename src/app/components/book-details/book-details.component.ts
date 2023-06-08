
import { Component, OnInit, HostListener } from '@angular/core';
import { BookDetailsService } from 'src/app/services/book-details.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  bookRows: Book[][] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  cardsPerRow: number = 4;
  search: any = {
    title: '',
    author: '',
    subject: '',
    publishDate: ''
  };
  counts: any = {
    title: 0,
    author: 0,
    subject: 0,
    publishDate: 0
  };


  constructor(private bookService: BookDetailsService) { }

  ngOnInit() {
    this.getBooks();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.adjustCardsPerRow();
    this.generateBookRows();
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filteredBooks = books;
      this.totalItems = this.books.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.adjustCardsPerRow();
      this.generateBookRows();
    });
  }

  adjustCardsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      this.cardsPerRow = 4;
    } else if (screenWidth >= 992) {
      this.cardsPerRow = 3;
    } else if (screenWidth >= 768) {
      this.cardsPerRow = 2;
    } else {
      this.cardsPerRow = 1;
    }
  }

  generateBookRows() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const slicedBooks = this.filteredBooks.slice(start, end);

    this.bookRows = [];
    for (let i = 0; i < slicedBooks.length; i += this.cardsPerRow) {
      const row = slicedBooks.slice(i, i + this.cardsPerRow);
      this.bookRows.push(row);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generateBookRows();
    }
  }

  getBookCount(criterion: string): number {
    let count = 0;
    switch (criterion) {
      case 'title':
        count = this.filteredBooks.length;
        break;
      case 'author':
        count = this.filteredBooks.reduce(
          (sum, book) => (book.author === this.search.author ? sum + 1 : sum),
          0
        );
        break;
      case 'subject':
        count = this.filteredBooks.reduce(
          (sum, book) => (book.category === this.search.subject ? sum + 1 : sum),
          0
        );
        break;
      case 'publishDate':
        count = this.filteredBooks.reduce(
          (sum, book) => (book.publicationDate === this.search.publishDate ? sum + 1 : sum),
          0
        );
        break;
      default:
        break;
    }
    return count;
  }

  applysearch() {
    this.filteredBooks = this.books.filter((book: Book) => {
      const { title, author, subject, publishDate } = this.search;
      const bookTitle = book.title.toLowerCase();
      const bookAuthor = book.author.toLowerCase();
      const bookSubject = book.category.toLowerCase();
      const bookPublishDate = book.publicationDate.toLowerCase();

      return (
        bookTitle.includes(title.toLowerCase()) &&
        bookAuthor.includes(author.toLowerCase()) &&
        bookSubject.includes(subject.toLowerCase()) &&
        bookPublishDate.includes(publishDate.toLowerCase())
      );
    });

    this.totalItems = this.filteredBooks.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generateBookRows();

    this.counts.title = this.getBookCount('title');
    this.counts.author = this.getBookCount('author');
    this.counts.subject = this.getBookCount('subject');
    this.counts.publishDate = this.getBookCount('publishDate');
  }

}

