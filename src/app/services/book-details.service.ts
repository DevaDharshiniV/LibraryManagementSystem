import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {
  private default = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAChCAMAAAD3ErHsAAAAJ1BMVEX////Z2dnY2NjX19fh4eHn5+fd3d38/Pzu7u7z8/Pr6+v39/fk5OR1A7rfAAAD0ElEQVR4nO2a247sKAxFCzDm+v/fO7ZJCEkgyTmjeRl5S63uamEWNg4lsfP7qVQqlUqlUqlUKpVKpVL9v1Sy9zmmVMJfTxFKipGneZsiOmcdy0KNfwwMJVfY4p1LL6OTM5ustQZ8+o4LyaNE7frCOsYzLn6jhQzG2WGdn1hYAY2UQcKceS08kbzdh5MMQsUvLAstOvWF2jcakbaBWPNWdbCvrGg3VuNVlFkcxgdSRCd1w3F3n1mhxAqAA0smor7i0kBZhBUhUTnOGwsWYd3KlXbI4oXFk1UqDtH8LCx4rrMz/roU4Klo9/yUBVytCavT8F6UhFb28540s3gP1yw3ZREN5Fm47lrm3ZyXl1nukVWimbKoaTg1V8c6Bl6Am2S7zRbLI+vo+ZtCpSQsHjkUqp810138bX34t6yW2tHJiT8tknpjFTAvrF+gHdhhUXZq/YzvrHrbzOLR4iuLm4FahDskM/XhAe8s6pHT8xCAT9kvLKkjfVnQsflQvxOLpx5aqshp9olFHWFc5LRwdZBc8+K5h44S1DfWr1ph2XmD3Vk8LZ5YFqin/wuWD6gsZSlLWcpSlrKUpSxlKUtZylKWspSlrGdW+MQyWKv3MYXFfd0Li50b72vzAl5Z4h1YZk7tjSdWycDX55tn8YXV3RvnzB23ZIVsXHdUzAdWlPvq9mPEcbhebC5YqRrXDR+5Yn9llZxSijlX2Bdp7Zk2ZSXo1o2BmtmtS7m8sIaSlN1NORscE1ZCITmL9WwIPrIIkLmLqjiJpSSPQrPHne2NVWpbEWQOoJp4Dvf0KTyyxLLYxPeZQEFiVdjuFF1ZGdsNLo2UO9AjXP6/Zl3FQQgy235BfmY1l0jGjPbhoSeWHdQD5C54uyM/sWJLH4fFuXP4nCWthEDFzixfoU+xeT5iSw2sUF0j9VVR+B4t4exkzVi+5tK6KFCLiEfM43FIjRvyYLX67UlhA3G3l3a+hULnSJ6ytkbPgM0a5ZOGMzUgLcPWGD+gnZXEy5HqyhgpYBON5a5sU05Y9CuCGMSTLUYGIbTeal6AiFti3K6xpzgglgnLQAZzolz6g0EG5M+DJf/DRYRp/nS+s+x+bHIdJBMAtkplm1yzMpE9yM6y8hlb4ST1U0SfztxY2zLYIY4XY14OEy6v7H9ncd9IoXy+vqoQ6Pigb7C+/itL7P/16wbSNa37N++G18/W9ToiygsCVxZlCu+vNbADTaUSFiXl07NV1CKAynliwef3GQI9M8SCm6G8jkgweFLhc1wbHn7Lws31L948UalUKpVKpVKpVCqVSqV60T+IfzzFG8lRYAAAAABJRU5ErkJggg==';
  private books: Book[] = [
    {
      bookId: '1',
      title: 'It Starts with Us',
      author: 'Collen Hover',
      publicationDate: '2022-07-05',
      summary: 'It Starts with Us is a gripping novel by Janelle Brown that explores the complexities of family dynamics and the secrets that can tear them apart. With compelling characters and a suspenseful plot, it keeps readers on the edge of their seats.',
      image: 'https://m.media-amazon.com/images/I/51VC+Vru96L._SY344_BO1,204,203,200_.jpg',
      category: 'Romance',
    },
    {
      bookId: '2',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      publicationDate: '1997-06-26',
      summary: 'Harry Potter and the Philosopher\'s Stone is the first book in the beloved Harry Potter series by J.K. Rowling. It follows the journey of a young boy named Harry Potter as he discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
      image: 'https://m.media-amazon.com/images/I/51SkIDTd9rL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg',
      category: 'Fantasy'
    },
    {
      bookId: "3",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationDate: "1925-04-10",
      summary: "The Great Gatsby is a classic novel set in the Jazz Age of the 1920s. It explores themes of wealth, love, and the American Dream through the eyes of Jay Gatsby and narrator Nick Carraway.",
      image: 'https://m.media-amazon.com/images/I/41JFqILaXyL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg',
      category: "Classic Literature"
    },

    {
      bookId: '4',
      title: 'Eloquent JavaScript: A Modern Introduction to Programming',
      author: 'Marijn Haverbeke',
      publicationDate: '2011-12-04',
      summary: 'Eloquent JavaScript is a comprehensive guide to the JavaScript programming language. It covers the fundamentals of programming and provides in-depth explanations of JavaScript concepts and techniques. The book is suitable for both beginners and experienced programmers who want to enhance their skills in JavaScript.',
      image: 'https://www.booktopia.com.au/covers/big/9781593279509/0000/eloquent-javascript-3rd-edition.jpg',
      category: 'Programming'
    },

    {
      bookId: '5',
      title: 'The Martian',
      author: 'Andy Weir',
      publicationDate: '2011-09-27',
      summary: 'The Martian is a science fiction novel by Andy Weir that tells the story of an astronaut, Mark Watney, who is stranded alone on Mars after his crew mistakenly believes he died during a mission. It follows his struggle for survival and his ingenious attempts to communicate with Earth and find a way back home.',
      image: 'https://m.media-amazon.com/images/I/51Rad1zFU3L._SX315_BO1,204,203,200_.jpg',
      category: 'Science Fiction',
    },

    {
      bookId: "6",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publicationDate: "1960-07-11",
      summary: "To Kill a Mockingbird is a Pulitzer Prize-winning novel that addresses racial injustice and moral growth in a small Southern town during the 1930s. It is a coming-of-age story narrated by Scout Finch.",
      image: 'https://m.media-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg',
      category: "Classic Literature"
    },
    {
      bookId: "7",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publicationDate: "1951-07-16",
      summary: "The Catcher in the Rye is a coming-of-age novel that follows the experiences of Holden Caulfield, a disillusioned teenager struggling with identity, alienation, and the phoniness of the adult world.",
      image: 'https://m.media-amazon.com/images/I/61fgOuZfBGL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg',
      category: "Classic Literature"
    },
    {
      bookId: "10",
      title: "1984",
      author: "George Orwell",
      publicationDate: "1949-06-08",
      summary: "1984 is a dystopian novel set in a totalitarian society where individualism is suppressed and Big Brother reigns. It explores themes of government surveillance, censorship, and the power of language.",
      image: 'https://m.media-amazon.com/images/I/514CVwOrybL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg',
      category: "Science Fiction"
    },

    {
      bookId: "8",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publicationDate: "1813-01-28",
      summary: "Pride and Prejudice is a beloved novel that follows the story of Elizabeth Bennet as she navigates societal expectations, love, and personal growth in 19th-century England.",
      image: 'https://m.media-amazon.com/images/I/51k5YOv1e+L._SY344_BO1,204,203,200_.jpg',
      category: "Classic Literature"
    },

    {
      bookId: "9",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publicationDate: "1937-09-21",
      summary: "The Hobbit is a fantasy adventure novel that chronicles the journey of Bilbo Baggins as he joins a group of dwarves to reclaim their homeland from the fearsome dragon Smaug.",
      image: 'https://m.media-amazon.com/images/I/413V3sIKSJL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg',
      category: "Fantasy"
    },


    {
      bookId: '11',
      title: 'The Pragmatic Programmer: Your Journey to Mastery',
      author: 'Andrew Hunt, David Thomas',
      publicationDate: '1999-10-20',
      summary: 'The Pragmatic Programmer is a classic book that offers practical advice and techniques for software developers. It covers various aspects of software development, including coding, debugging, testing, and project management. The book emphasizes the importance of craftsmanship and professionalism in programming.',
      image: 'https://m.media-amazon.com/images/I/518FqJvR9aL._SX260_.jpg',
      category: 'Programming'
    },
    {
      bookId: "12",
      title: "Python Crash Course",
      author: "Eric Matthes",
      publicationDate: "2015-11-01",
      summary: "Python Crash Course is a beginner-friendly introduction to Python programming, covering basic concepts and building projects.",
      image: "https://m.media-amazon.com/images/I/51OOCVBfCQL._SX377_BO1,204,203,200_.jpg",
      category: "Programming"
    },
    {
      bookId: "13",
      title: "The C Programming Language",
      author: "Brian W. Kernighan, Dennis M. Ritchie",
      publicationDate: "1978-02-22",
      summary: "The C Programming Language is a classic book that introduces the C programming language and covers its fundamentals and usage.",
      image: "https://m.media-amazon.com/images/I/411ejyE8obL._SX198_BO1,204,203,200_QL40_FMwebp_.jpg",
      category: "Programming"
    },
    {
      bookId: "15",
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      publicationDate: "1998-07-02",
      summary: "Harry Potter and the Chamber of Secrets is the second book in the Harry Potter series. It continues the story of Harry Potter as he returns to Hogwarts and investigates the mysterious Chamber of Secrets, which holds dark secrets and dangers.",
      image: "https://m.media-amazon.com/images/I/51Q9uPHKhAL._SX324_BO1,204,203,200_.jpg",
      category: "Fantasy"
    },

    {
      bookId: "16",
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      publicationDate: "2000-07-08",
      summary: "Harry Potter and the Goblet of Fire is the fourth book in the Harry Potter series. It follows Harry Potter's participation in the Triwizard Tournament, a prestigious and dangerous competition, as dark forces begin to rise once again.",
      image: "https://m.media-amazon.com/images/I/51zBweKyrUL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
      category: "Fantasy"
    },
    {
      bookId: "17",
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      publicationDate: "2003-06-21",
      summary: "Harry Potter and the Order of the Phoenix is the fifth book in the Harry Potter series. It depicts Harry Potter's struggle against the oppressive Ministry of Magic and the rise of Voldemort's forces, while dealing with his own personal challenges.",
      image: "https://m.media-amazon.com/images/I/51hnjvl2NvL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
      category: "Fantasy"
    },
    {
      bookId: "18",
      title: "Harry Potter and the Half-Blood Prince",
      author: "J.K. Rowling",
      publicationDate: "2005-07-16",
      summary: "Harry Potter and the Half-Blood Prince is the sixth book in the Harry Potter series. It delves into the past of Voldemort and explores Harry Potter's final preparations to confront the dark wizard.",
      image: "https://m.media-amazon.com/images/I/5136QORtwkL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
      category: "Fantasy"
    },
    {
      bookId: "19",
      title: "The Awakening",
      author: "L.J. Smith",
      publicationDate: "1991-09-01",
      summary: "The Awakening is the first book in The Vampire Diaries series. It introduces the protagonist, Elena Gilbert, a high school student who becomes entangled in a supernatural love triangle between two vampire brothers, Stefan and Damon Salvatore.",
      image: "https://m.media-amazon.com/images/I/41kC8joFf6L._SX330_BO1,204,203,200_.jpg",
      category: "Paranormal Romance"
    },

    {
      bookId: "20",
      title: "The Struggle",
      author: "L.J. Smith",
      publicationDate: "1991-11-01",
      summary: "The Struggle is the second book in The Vampire Diaries series. It continues Elena Gilbert's journey as she grapples with her feelings for Stefan and Damon, while uncovering the secrets and dangers of the supernatural world.",
      image: "https://books.google.co.in/books/content?id=yHwVouQKOl8C&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3YP3_2xJbR7fN0RB5-5yMy0ocaxw&w=1280",
      category: "Paranormal Romance"
    },

    {
      bookId: "21",
      title: "The Fury",
      author: "L.J. Smith",
      publicationDate: "1991-12-01",
      summary: "The Fury is the third book in The Vampire Diaries series. Elena Gilbert faces new threats and challenges as she delves deeper into the supernatural world and the ancient curse that binds the Salvatore brothers.",
      image: "https://books.google.co.in/books/content?id=-pDKrQdTaK8C&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1RJitx2LGXEdwRzXjtAdiDwHlw3g&w=1280",
      category: "Paranormal Romance"
    }, {
      bookId: "22",
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      publicationDate: "1999-07-08",
      summary: "Harry Potter and the Prisoner of Azkaban is the third book in the Harry Potter series. In this installment, Harry Potter learns about a dangerous prisoner who has escaped from Azkaban, the wizarding prison, and poses a threat to him and his friends.",
      image: "https://m.media-amazon.com/images/I/51tO6+4vgFL._SX332_BO1,204,203,200_.jpg",
      category: "Fantasy"
    },

    {
      bookId: "23",
      title: "Dark Reunion",
      author: "L.J. Smith",
      publicationDate: "1992-03-01",
      summary: "Dark Reunion is the fourth book in The Vampire Diaries series. Elena Gilbert's journey reaches a climactic point as she confronts her past and battles the forces of darkness in a final showdown.",
      image: "https://books.google.co.in/books/content?id=r0rMNaorPQgC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U08YmhR0mc_8kEr0twS-gdkIw3Kxw&w=1280",
      category: "Paranormal Romance"
    },
    {
      bookId: '24',
      title: 'It Ends with Us',
      author: 'Colleen Hoover',
      publicationDate: '2016-08-02',
      summary: 'It Ends with Us is a powerful and emotional novel by Colleen Hoover. It tells the story of Lily Bloom, a young woman who finds herself caught in a tumultuous relationship with a charming but troubled man named Ryle Kincaid. As Lily navigates the complexities of love, she must confront her past and make difficult choices that will shape her future.',
      image: 'https://rukminim1.flixcart.com/image/416/416/k05ljm80/book/2/6/7/it-ends-with-us-original-imafjzsncws2h6rm.jpeg?q=70',
      category: 'Romance'
      },



    {
      bookId: "25",
      title: "The Return: Shadow Souls",
      author: "L.J. Smith",
      publicationDate: "2010-03-16",
      summary: "The Return: Shadow Souls is the sixth book in The Vampire Diaries series. Elena Gilbert embarks on a dangerous journey to save her friends and unravel the mysteries surrounding the Other Side and the dark forces that threaten to consume them all.",
      image: "https://m.media-amazon.com/images/I/51-VmJ7qB+L._SY344_BO1,204,203,200_.jpg",
      category: "Paranormal Romance"
    }
  ];

  constructor() { }

  getBookById(id: string): Observable<Book> {
    return of(this.books.find(b => b.bookId === id)).pipe(
      map((book: any) => book ?? null)
    );
  }

  getAllBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBooksByCategories(category: string): Observable<Book[]> {
    const filteredBooks = this.books.filter(book => book.category === category);
    return of(filteredBooks);

  }




}


