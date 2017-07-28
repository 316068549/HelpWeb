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
    let headers2 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
    const url = this.userLoginURL+"?userName="+user.userName+"&password="+user.userPassword;
    // const url = this.userLoginURL;
    // let parment = 'username='+user.userName+'&password='+user.userPassword;
    return this.http.post(url,{headers: headers2})
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
