import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loggedResponse: boolean = true;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      pseudo: ['', [Validators.required]],
      mdp: ['', [Validators.required]]
    })
  }
  
  get pseudo() { return this.myForm.get('pseudo'); }
  get mdp() { return this.myForm.get('mdp')}

  onSubmit(){
    this.userService.checkLogin(this.pseudo.value, this.mdp.value).then((data) => {
      if(data.length == 1) {
        let user = new User(data[0].userId, data[0].pseudo, data[0].mdp, data[0].avatar, data[0].role);
        this.loggedResponse = true;
        this.router.navigate(['home']);
        this.userService.setLogged(true, user);
      } else {
        this.loggedResponse = false;
        this.userService.setLogged(false, null);
      }
    });
   }

}
