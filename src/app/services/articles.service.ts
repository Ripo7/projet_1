import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getAllArticles(){
    return this.http.get<any>('http://localhost:3000/articles/all').toPromise();
  }

  addArticle(user: User, text : string){
    let formData = { userId: user.userId, text: text };
    return this.http.post<any>('http://localhost:3000/articles', formData).toPromise();
  }

}


export class Article {
  articleId: number;
  user: User;
  text: string;

  constructor(id:number,text: string, user: User){
    this.articleId = id;
    this.user = user; 
    this.text = text;
  }
}