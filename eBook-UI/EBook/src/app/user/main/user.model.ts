import { Category } from 'app/category/main/category.model';

export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName :string;
    public userPassword: string;
    public type: string;
    public categoryId: number;
    public category: Category;
}