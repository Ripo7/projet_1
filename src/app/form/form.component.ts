import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItunesService } from '../services/itunes.service';
import { User, UserService } from '../services/user.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  submitted: boolean = false;
  hasError: boolean = false;

  selected: string;
  
  results = [];

  avatars:string[] = [
    'aigle',
    'lion',
    'tigre',
    'canon',
    'couronne',
    'epees'
  ]

  id = 0;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router:Router, private itunes: ItunesService) { }
  

  onSubmit(){
    this.id++;
    this.userService.addUser(new User(this.id,this.pseudo.value,this.mdp.value, this.avatar.value, 1))
    .then(() => {
      this.submitted = true;
      this.hasError = false;
    })
    .catch(() => {
      console.log("catch");
      this.submitted = true;
      this.hasError = true;
    });
    this.myForm.reset();
    this.pseudo.setErrors(null);
    this.mdp.setErrors(null);
    this.avatar.setErrors(null);
  }

  get pseudo() { return this.myForm.get('pseudo'); }
  get mdp() { return this.myForm.get('mdp'); }
  get avatar() { return this.myForm.get('avatar'); }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      mdp: ['', [Validators.required, Validators.minLength(3)]],
      avatar: ['', [Validators.required]]
    })
  }
}

export class Avatar {
  title: string;
  name: string;
}
