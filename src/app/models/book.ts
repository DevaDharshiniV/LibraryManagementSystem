export interface Book {
    daysLeft?: number;
    bookId: string;
    title: string;
    author: string;
    publicationDate: string;
    summary: string;
    image?:string;
    category: string;
    status?: string;
    issuedDate?: Date;
    dueDate?: Date;
    fine?:Number;
    borrower?: string;
    returnedBy?: string;
    returnedDate?: Date;
}
