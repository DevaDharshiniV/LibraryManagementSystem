import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  fineAmount: number | null = null;
  bookId: string | null = null;
  ngOnInit(): void {
    this.fineAmount = Number(localStorage.getItem('fineAmount'));
    this.bookId = localStorage.getItem('bookId');
  }

}
