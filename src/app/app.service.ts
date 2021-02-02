import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public apiURL = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  public userData: any = []
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  addUser(object: any) {
    
    let userObj = JSON.stringify(object);
    return this.http.post(this.apiURL + '/user', userObj, this.httpOptions)
  }
  getUser(id: any){ 
    return this.http.get(this.apiURL + '/user/'+id)
  }
  updateUser(object: any){
    let userObj = JSON.stringify(object);
    return this.http.put(this.apiURL + '/user/' + object.id, userObj, this.httpOptions)

  }


  get(){ 
    return this.http.get(this.apiURL + '/user')
  }

  
}
