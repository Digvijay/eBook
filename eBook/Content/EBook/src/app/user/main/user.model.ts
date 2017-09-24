import { Category } from 'app/category/main/category.model';

export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userPassword: string;
    public typeName: string;
    public categoryId: number;
    public category: Category;
}