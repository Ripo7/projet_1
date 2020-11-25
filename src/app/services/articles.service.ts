import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

articles: Article[] = [{text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque magna purus, varius a ligula et, pulvinar tempor tellus. Vestibulum vitae justo vitae velit rutrum sodales. Suspendisse finibus vitae justo vitae porttitor. Ut porta felis eu purus pellentesque consectetur at et eros. Aliquam vitae tellus commodo, fermentum metus eget, mollis enim. Nam eu tortor placerat, mollis dui eu, venenatis est. Vestibulum auctor felis tincidunt mauris imperdiet, lacinia facilisis erat fringilla.', user: {id:0, pseudo:'Super', mdp:'Admin', avatar: 'tester', role:0}}];

  constructor() { }

  getAllArticles(){
    return this.articles;
  }

  addArticle(article: Article){
    let promise = new Promise((resolve, reject) => {
      let oldLength = this.articles.length;
      this.articles.push(article);
      if(this.articles.length == oldLength + 1){
        resolve();
      } else {
        reject();
      }
    })
    return promise;
  }

}


export class Article {
  text: string;
  user:User

  constructor(text: string, user: User){
    this.text = text;
    this.user = user;
  }
}