import { Logo } from "./logo";

export class Book {

    bookId!: number;
    bookTitle!: string;
    bookCategory!: string;
    authorId!: number;
    bookAuthor!: string;
    bookPrice!: number;
    bookLogo!: string;
    bookContent!: string;
    bookPublisher!: string;
    bookPublishedDate!: Date;
    bookBlockedStatus!: string;

    logo!: Logo;



}
