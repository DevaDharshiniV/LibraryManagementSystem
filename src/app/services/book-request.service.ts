import { Injectable } from '@angular/core';
import { Observable, merge, mergeMap, of } from 'rxjs';
import { Book } from '../models/book';
import { BookDetailsService } from './book-details.service';
import { AuthService } from './auth.service';
import { map, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookRequestService {
  private bookReport: Book[] = [];
  daysLeftMap: any;
  previousUser: any;
  authService: any;
  private recommendedBooks: Book[]=[];


  constructor(private bookDetailsService: BookDetailsService,authService:AuthService) {
    this.loadBookReport();
  }

  private loadBookReport(): void {
    const storedBookReport = localStorage.getItem('bookReport');
    if (storedBookReport) {
      this.bookReport = JSON.parse(storedBookReport);
    }
  }

  private saveBookReport(): void {
    localStorage.setItem('bookReport', JSON.stringify(this.bookReport));
  }
  clearBookReport() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser !== this.previousUser) {
      this.bookReport = [];
      this.recommendedBooks = [];
    }

    this.previousUser = currentUser;
  }

  updateBookStatus(books: Book[]): void {
    const currentDate = new Date();
    books.forEach(book => {
      if (book.status === 'Issued' && book.dueDate && book.dueDate < currentDate) {
        book.status = 'Overdue';
      }
    });
    this.bookReport = books;
    this.saveBookReport();
  }

  requestBook(bookId: string): Observable<Book | null> {
    return this.bookDetailsService.getBookById(bookId).pipe(
      mergeMap((book: Book | null) => {
        if (book) {
          return this.simulateServerRequest(book);
        } else {
          return of(null);
        }
      })
    );
  }

  getBookReport(): Observable<Book[]> {
    return of(this.bookReport);
  }

  private simulateServerRequest(book: Book): Observable<Book> {
    return new Observable<Book>(observer => {
      setTimeout(() => {
        book.status = 'Issued';
        book.issuedDate = new Date();
        const dueDate = new Date(book.issuedDate);
        dueDate.setDate(dueDate.getDate() + 20);

        book.dueDate = dueDate;

        this.bookReport.push(book);
        this.saveBookReport();

        observer.next(book);
        observer.complete();
      }, 2000);
    });
  }


  returnBook(bookId: string): Observable<Book | null> {
    const bookIndex = this.bookReport.findIndex((book) => book.bookId === bookId);
    if (bookIndex !== -1) {
      const book = this.bookReport[bookIndex];
      book.status = 'Returned';
      book.issuedDate = undefined;
      book.dueDate = undefined;
      this.bookReport.splice(bookIndex, 1);

      localStorage.setItem('bookReport', JSON.stringify(this.bookReport));

      localStorage.removeItem('issueDate');
      localStorage.removeItem('dueDate');

      return of(book);
    } else {
      return of(null);
    }
  }

  updateDaysLeft(bookId: string, daysLeft: number) {
    this.daysLeftMap[bookId] = daysLeft;
    localStorage.setItem('daysLeftMap', JSON.stringify(this.daysLeftMap));
  }

  getRecommendedBooks(categories: string[]): Observable<Book[]> {
    const userHistory = [...this.bookReport];

    const filteredBooks: Observable<Book[]>[] = [];
    categories.forEach(category => {
      const booksByCategory = this.bookDetailsService.getBooksByCategories(category);
      filteredBooks.push(booksByCategory);
    });

    return merge(...filteredBooks).pipe(
      toArray(),
      map((booksByCategory: Book[][]) => {
        const flattenedBooks = ([] as Book[]).concat(...booksByCategory);
        const recommendedBooks = flattenedBooks.filter((book: Book) => !userHistory.includes(book));
        console.log('Recommended Books:', recommendedBooks);
        return recommendedBooks;
      })
    );
  }
}
