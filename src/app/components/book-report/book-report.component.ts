
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookRequestService } from 'src/app/services/book-request.service';

@Component({
  selector: 'app-book-report',
  templateUrl: './book-report.component.html',
  styleUrls: ['./book-report.component.css']
})
export class BookReportComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookRequestService: BookRequestService) { }

  ngOnInit(): void {
    this.fetchBookReport();
  }
  fetchBookReport(): void {
    this.bookRequestService.getBookReport().subscribe((books: Book[]) => {
      this.bookRequestService.updateBookStatus(books);
      this.books = books;
    });
  }
  isDueDateExceeded(dueDate: Date | undefined): boolean {
    if (!dueDate) {
      return false;
    }
    const currentDate = new Date();
    return dueDate < currentDate;
  }

    payFine(bookId: string) {
    const storedBook = this.books?.find(book => book.bookId === bookId);
    if (storedBook) {
      const dueDate = storedBook.dueDate;
      if (dueDate) {
        const today = new Date();
        const daysLate = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
        const fine = daysLate * 5;
        console.log(`Fine for book with ID: ${bookId}. Amount: ₹${fine}`);
        localStorage.setItem('fineAmount', fine.toString());
        localStorage.setItem('bookId', bookId);
      }
    } else {
      console.log(`Book not found with ID: ${bookId}`);
    }
  }

  returnBook(bookId: string): void {
    this.bookRequestService.returnBook(bookId).subscribe((book: Book | null) => {
      if (book) {
        alert("Book Returned Successfully");
        this.fetchBookReport();
      } else {
        // Fail
      }
    });
  }
}

