import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogged: User;
  logged: boolean = false

  users: User[] = [{id:0, pseudo:'Admin', mdp:'Admin', avatar: 'tester', role:0}]

  constructor(private router: Router) { }

  addUser(user:User){
    let promise = new Promise((resolve, reject) => {
      let oldLength = this.users.length;
      this.users.push(user);
      if(this.users.length == oldLength + 1){
        resolve();
      } else {
        reject();
      }
    });
    return promise;
  }

  getAllUser(){
    return this.users;
  }

  getUserLogged(){
    return this.userLogged;
  }

  isLogged(){
    return this.logged;
  }

  checkLogin(pseudo: string, mdp: string){
    let promise = new Promise((resolve, reject) => {
      for(let prop of this.users){
        if(prop.pseudo == pseudo && prop.mdp == mdp){
          this.logged = true;
          this.userLogged = prop;
          break;
        } else {
          this.logged = false;
        }
      }
      if(this.logged){
        resolve();
        console.log(`${this.userLogged.pseudo} is logged`);
        this.router.navigate(['home']);
      } else {
        reject();
        console.log("Error");
      }
    });
    return promise;
  }
}

export class User{
  id: number;
  pseudo: string;
  mdp: string;
  avatar: string;
  role: number
  

  constructor(id:number,pseudo:string, mdp: string, avatar: string, role:number){
    this.id = id;
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
