import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';


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
  imagePath: any;

  constructor(public formBuilder: FormBuilder, public appService: AppService, public router: Router, public route: ActivatedRoute) { }
  public profileForm: FormGroup;
  previewImage: any;

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

  switchAddressType() {
    debugger
    if (this.profileForm.controls['address'].value === 'home') {
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
      // this.previewImage = resp.imagePath
      this.uploadImage(resp.imagePath, 'ts')
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




    this.appService.updateUser(object).subscribe(response => {
      console.log(response)
    })

  }

  uploadImage(event: any, from: any) {
    // var reader: any
    if (from === 'ts') {
      let file : Blob = new Blob(event)
      this.imagePath = file;

    } else if (from === 'html') {
      console.log(event);
      console.log(event.target.files[0]);
      this.imagePath = event.target.files[0];
    }
console.log(this.imagePath);

    var reader = new FileReader();
    reader.readAsDataURL(this.imagePath);
    reader.onload = (_event) => {
      this.previewImage = reader.result;
    }
  }

}




