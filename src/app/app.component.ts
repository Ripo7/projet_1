import { AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard, AlwaysAuthGuard, User, UserService } from './services/user.service';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked, OnInit {

  userLogged: User;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
  ){
    this.matIconRegistry.addSvgIcon(
      "aigle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/aigle.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "tigre",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/tigre.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "lion",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/lion.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "epees",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/epees.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "couronne",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/couronne.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "canon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/canon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "tester",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/tester.svg")
    );
    
  }
  ngOnInit(): void {
    this.userLogged = {id: -1, pseudo: '-1', mdp:'-1', avatar: '-1', role: -1};
  }

  ngAfterContentChecked(): void {
    if(this.userService.getUserLogged()){
      this.userLogged = this.userService.getUserLogged();
    } else {
      this.userLogged = {id: -1, pseudo: '-1', mdp:'-1', avatar: '-1', role: -1};
    }
  }
}

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AlwaysAuthGuard] },
  { path: "add-user", component: FormComponent, canActivate: [AdminAuthGuard]},
  { path: "users", component: UserListComponent, canActivate: [AlwaysAuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "articles", component: ArticleListComponent, canActivate: [AlwaysAuthGuard] },
  { path: "add-article", component: AddArticleComponent, canActivate: [AlwaysAuthGuard] }
]



