import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article, ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  submitted: boolean = false;
  hasError: boolean = false;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private articlesService: ArticlesService, private userService: UserService, private router: Router) { }

  get text() {return this.myForm.get('text')}

  onSubmit(){
    this.articlesService.addArticle(new Article(this.text.value, this.userService.getUserLogged()))
    .then(() => {
      this.submitted = true;
      this.hasError = false;
    })
    .catch(() => {
      this.submitted = true;
      this.hasError = true;
    });
    this.myForm.reset();
    this.text.setErrors(null);
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(10)]],
    })
  }

}
