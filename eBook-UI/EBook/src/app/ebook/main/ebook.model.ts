import { Category } from 'app/category/main/category.model';
import { Language } from 'app/language/main/language.model';
import { User } from 'app/user/main/user.model';

export class EBook {
    public eBookId: number;
    public title: string;
    public author: string;
    public category: Category;
    public categoryId: number;
    public language: Language;
    public languageId: number; 
    public fileName: string;
    public keywords: string;
    public mime: string;
    public publicationYear: number;
    public userId: number;
    public user: User;
}