import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  value: number;
  options: Options = {
    floor: 20,
    ceil: 60
  };
  constructor(public formBuilder: FormBuilder, public appService: AppService, public router: Router,) { }
  public profileForm: FormGroup;

  ngOnInit(): void {
    this.userProfile = this.appService.userData;
    console.log(this.userProfile);

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

  

}
