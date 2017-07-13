import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../models/user-model';

@Injectable()
export class UserLoginService {
  // public userLoginURL = 'data/user-login-mock.json';
  public userLoginURL = 'login';
  public subject: Subject<User> = new Subject<User>();

  constructor(public http:Http
              ){}

  public get currentUser():Observable<User>{
      return this.subject.asObservable();
  }

  public login(user:User){
    console.log(JSON.stringify(user))
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const url = this.userLoginURL+"?userName="+user.userName+"&userPassword="+user.userPassword;
    return this.http.get(url,headers)
      .map(response => {
          if(response.json().code==0){
            let result=response.json().data;
            return result;
          }else {
            alert(response.json().error);
          }

        }
      )
  }

  // public logout():void{
  //   localStorage.removeItem("currentUser");
  //   this.subject.next(Object.assign({}));
  // }
}
