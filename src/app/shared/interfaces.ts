import { Moment } from 'moment';

export interface IBook {
    id: number;
    title: string;
    pub_date: Moment;
    isbn: string;
    category: string;
    price: number;
    description: string;
    image: string;
}

export interface ICart {
    book: IBook;
    quantity: number;
}