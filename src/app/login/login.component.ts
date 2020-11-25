import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loggedResponse: boolean = true;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      pseudo: ['', [Validators.required]],
      mdp: ['', [Validators.required]]
    })
  }
  
  get pseudo() { return this.myForm.get('pseudo'); }
  get mdp() { return this.myForm.get('mdp')}

  onSubmit(){
   this.userService.checkLogin(this.pseudo.value, this.mdp.value).then(() => {
     this.loggedResponse = true;
   }).catch(() => {
     this.loggedResponse = false;
   })
  }

}
