import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogged: User;
  logged: boolean = false

  constructor(private router: Router, private http: HttpClient) { }

  addUser(pseudo:string, mdp: string, avatar: string, role: number){
    let formData = { pseudo, mdp, avatar, role }
    return this.http.post<any>('http://localhost:3000/users', formData).toPromise();
  }

  getAllUser(){
    return this.http.get<any>('http://localhost:3000/users/all').toPromise();
  }

  getUserByPseudo(pseudo :string) {
    return this.http.get<any>(`http://localhost:3000/users/${pseudo}`).toPromise();
  }

  getUserLogged(){
    return this.userLogged;
  }

  isLogged(){
    return this.logged;
  }

  setLogged(isLogged: boolean, user: User) {
    this.logged = isLogged;
    this.userLogged = user;
  }


  checkLogin(pseudo: string, mdp: string){
    return this.http.post<any>('http://localhost:3000/users/login', { pseudo, mdp }).toPromise();
  }

}

export class User{
  userId: number;
  pseudo: string;
  mdp: string;
  avatar: string;
  role: number
  

  constructor(id:number,pseudo:string, mdp: string, avatar: string, role:number){
    this.userId = id;
    this.pseudo = pseudo;
    this.mdp = mdp;
    this.avatar = avatar;
    this.role = role;
  }

}

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    if(this.userService.isLogged() && this.userService.getUserLogged().role == 0){
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false
    }
  }
}

@Injectable()
export class AlwaysAuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}
  canActivate() {
    if(this.userService.isLogged()){
      return true;
    } else {
      window.alert("You must be logged to have access to this page");
      this.router.navigate(['login']);
      return false;
    }
  }
}
