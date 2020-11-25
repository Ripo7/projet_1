import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, routes } from './app.component';
import { HighlightDirective } from './directive/highlight.directive';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminAuthGuard, AlwaysAuthGuard, UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    FormComponent,
    UserComponent,
    UserListComponent,
    HomeComponent,
    LoginComponent,
    ArticleComponent,
    ArticleListComponent,
    AddArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    MatCardModule,
    [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [UserService, AdminAuthGuard, AlwaysAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



