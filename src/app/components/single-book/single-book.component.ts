import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookDetailsService } from 'src/app/services/book-details.service';
import { BookRequestService } from 'src/app/services/book-request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: Book | undefined;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  books: Book[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private bookRequestService: BookRequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBookDetails();
  }

  getBookDetails() {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      if (bookId) {
        this.bookDetailsService.getBookById(bookId).subscribe(
          (book: Book | null) => { 
            if (book) {
              this.book = book;
              console.log(this.book);
            } else {
              console.log('Book not found');
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }

  requestBook() {
    if (this.book) {
      this.bookRequestService.requestBook(this.book.bookId).subscribe(
        (book: Book | null) => {
          if (book) {
            const currentBorrowings = JSON.parse(localStorage.getItem('currentBorrowings') || '[]');
            currentBorrowings.push(book);
            localStorage.setItem('currentBorrowings', JSON.stringify(currentBorrowings));

            this.successMessage = 'Book requested successfully!';
            this.errorMessage = undefined;
            console.log(book.status, book.issuedDate, book.dueDate); // Display the updated values
            this.router.navigate(['/book-report']);
          } else {
            this.successMessage = undefined;
            this.errorMessage = 'Failed to request book.';
          }
        },
        (error: any) => {
          console.log(error);
          this.successMessage = undefined;
          this.errorMessage = 'Failed to request book.';
        }
      );
    }
  }
}
