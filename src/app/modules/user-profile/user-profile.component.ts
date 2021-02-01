import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  id: any;
  

  value: number = 20;
  options: Options = {
    floor: 20,
    ceil: 60
  };
  public registerForm: FormGroup;
  
  constructor(public formBuilder: FormBuilder, public appService: AppService, public router: Router, public route: ActivatedRoute) { }
  public profileForm: FormGroup;

  ngOnInit(): void {
    this.userProfile = this.appService.userData;
    console.log(this.userProfile);

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.getUserProfile();

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.pattern('[a-zA-Z ]*'),
        Validators.maxLength(20),
      ])],
      lastName: [],
      email: [],
      phoneNumber: [],
      age: [],
      state: [],
      country: [],
      address: [],
      homeAddress1: [],
      homeAddress2: [],
      companyAddress1: [],
      companyAddress2: [],
      subscriptionToNewsletter: [],
    })
    if (this.userProfile?.length > 0) {
      this.value = this.userProfile[0].age
      this.profileForm.patchValue(this.userProfile[0])
    }
  }

  switchAddressType(){
    debugger
    if(this.profileForm.controls['address'].value === 'home'){
      this.profileForm.controls['companyAddress1'].setValue('')
      this.profileForm.controls['companyAddress2'].setValue('')
    } else {
      this.profileForm.controls['homeAddress1'].setValue('')
      this.profileForm.controls['homeAddress2'].setValue('')
    }
  }

  getUserProfile() {
    this.appService.getUser(this.id).subscribe(response => {
      console.log(response);
      let resp: any = response
      console.log(resp.id);
      this.profileForm.patchValue(resp);
      this.value = Number(resp.age)

    }
    )

  }
  updateUSer() {
    console.log(this.profileForm.value);
    console.log(this.value);
    this.profileForm.controls['age'].setValue(this.value);
    
    console.log(this.profileForm.value);
    let object = this.profileForm.value
    object.id = this.id
    console.log(this.id);
    
    console.log(object);
    
    
    
    this.appService.updateUser(object).subscribe(response =>{
      console.log(response)
    })
  }
  

}




