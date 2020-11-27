import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().then(data => {
      data.forEach(element => {
        let user: User = new User(element.userId, element.pseudo, element.mdp, element.avatar, element.role);
        this.users.push(user);
      });
    })
  }
}
