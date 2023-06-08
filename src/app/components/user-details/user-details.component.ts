
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookDetailsService } from 'src/app/services/book-details.service';
import { BookRequestService } from 'src/app/services/book-request.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userEmail!: string;
  bookReport!: Book[];
  recommendedBooks!: Book[];

  constructor(private bookRequestService: BookRequestService, private bookDetailsService: BookDetailsService) { }

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    this.fetchBookHistory();
    console.log('Calling recommendBooks()');
    this.recommendBooks();
  }
  
  fetchBookHistory(): void {
    this.bookRequestService.getBookReport().subscribe((bookReport: Book[]) => {
      this.bookReport = bookReport.filter((book: Book) => book.status === 'Issued');
    });
  }

  recommendBooks(): void {
    const categoryCounts: { [category: string]: number } = {};
    this.bookReport.forEach((book: Book) => {
      if (book.category in categoryCounts) {
        categoryCounts[book.category]++;
      } else {
        categoryCounts[book.category] = 1;
      }
    });

    const sortedCategories = Object.keys(categoryCounts).sort(
      (a: string, b: string) => categoryCounts[b] - categoryCounts[a]
    );
    const mostFrequentCategory = sortedCategories[0];
    console.log(mostFrequentCategory);
    console.log('Recommended Categories:', sortedCategories);
    this.bookDetailsService.getBooksByCategories(mostFrequentCategory).subscribe((recommendedBooks: Book[]) => {
      this.recommendedBooks = recommendedBooks
        .filter((book: Book) => !this.bookReport.some((reportedBook: Book) => reportedBook.bookId === book.bookId))
        .slice(0, 3);
    });
  }
}
