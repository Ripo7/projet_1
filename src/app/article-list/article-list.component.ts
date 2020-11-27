import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../services/articles.service';
import { User } from '../services/user.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAllArticles().then(data => {
      data.forEach(element => {
        let user: User = new User(element.userId, element.pseudo, element.mdp, element.avatar, element.role);
        let article: Article = new Article(element.articleId, element.text, user);
        this.articles.push(article);
      });
    })
  }

}
