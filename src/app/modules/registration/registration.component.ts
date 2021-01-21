import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  value: number = 20;
  options: Options = {
    floor: 20,
    ceil: 60
  };
  public registerForm: FormGroup;
  

  constructor(public formBuilder: FormBuilder, public appService: AppService,public router: Router, public dialogref: MatDialogRef<RegistrationComponent>) { }
  // public registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.compose([
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(20),
      ])],
      lastName:[],
      email:[],
      phoneNumber:[],
      age:[],
      state:[],
      country:[],
      address:[],
      homeAddress1:[],
      homeAddress2:[],
      companyAddress1:[],
      companyAddress2:[],
      subscriptionToNewsletter:[],
    })
  }

  close(){
    this.registerForm.reset();
    this.dialogref.close();
  }

  submitForm(){
    this.registerForm.controls['age'].setValue(this.value);
    console.log(this.registerForm.value);
    this.appService.userData.push(this.registerForm.value)
    console.log(this.appService.userData);
    this.dialogref.close();
    this.router.navigate(['/profile']);
  }

}
