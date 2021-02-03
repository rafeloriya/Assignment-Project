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
  imagePath: any;
  previewImage: any;

  constructor(public formBuilder: FormBuilder, public appService: AppService, public router: Router, public dialogref: MatDialogRef<RegistrationComponent>) { }
  // public registerForm: FormGroup;


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
  }

  close() {
    this.registerForm.reset();
    this.dialogref.close();
  }

  submitForm() {

    debugger
    this.appService.get().subscribe(response => {
      console.log(response);
      let userData: any = response
      let lastId = userData[userData.length - 1]
      console.log(lastId.id);
      this.registerForm.controls['age'].setValue(this.value);
      console.log(this.registerForm.value);
      let userObj = this.registerForm.value
      userObj.id = lastId.id + 1;
      let obj = {
        lastModified:this.imagePath.lastModified,
        lastModifiedDate: this.imagePath.lastModifiedDate,
        name: this.imagePath.name,
        size: this.imagePath.size,
        type: "image/png",
        webkitRelativePath: ""
      }
      console.log(JSON.stringify(obj));
      
      userObj.imagePath = JSON.stringify(obj)
      console.log(userObj.imagePath);
      this.appService.addUser(userObj).subscribe(response => {
        console.log(response);
        let resp: any = response
        console.log(resp.id);
        this.dialogref.close();
        this.router.navigate(['/profile/', resp.id]);
      }, error => {

      })
    })

//     lastModified: 1611227122499
// lastModifiedDate: Thu Jan 21 2021 16:35:22 GMT+0530 (India Standard Time) {}
// name: "git hub details.PNG"
// size: 59364
// type: "image/png"
// webkitRelativePath: ""

  }

  uploadImage(event: any) {
    console.log(event);
    console.log(event.target.files[0]);
    var reader = new FileReader();
    this.imagePath = event.target.files[0];
    console.log(this.imagePath);
    reader.readAsDataURL(this.imagePath);
    reader.onload = (_event) => {
      this.previewImage = reader.result;
    }
  }
  // getUser  

}
