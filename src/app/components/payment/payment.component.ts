import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


  fineAmount: number | null = null;
  bookId: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.fineAmount = Number(localStorage.getItem('fineAmount'));
    this.bookId = localStorage.getItem('bookId');
  }
  paymentDetails = {
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  get formValid(): boolean {
    const cardNumber = this.paymentDetails.cardNumber;
    const expirationDate = this.paymentDetails.expirationDate;
    const cvv = this.paymentDetails.cvv;

    return this.paymentDetails.cardName.length > 0 &&
           /^\d+$/.test(cardNumber) && cardNumber.length === 16 &&
           /^\d{2}\/\d{2}$/.test(expirationDate) &&
           /^\d+$/.test(this.paymentDetails.cvv) && this.paymentDetails.cvv.length === 3;
  }
onSubmit(): void {
    if (this.formValid) {
      const paymentDetails = this.paymentDetails;
      // payment logic
    } else {
      // error
    }
  }
   isCardNumberValid(): boolean {
    const cardNumber = this.paymentDetails.cardNumber;
    return /^\d+$/.test(cardNumber);
  }

  isExpirationDateValid(): boolean {
    const expirationDate = this.paymentDetails.expirationDate;
    return !isNaN(Date.parse(expirationDate));


}
iscvvValid(): boolean{
  return /^\d+$/.test(this.paymentDetails.cvv);
}

}
