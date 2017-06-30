import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { User } from '../models/users';
declare var layer:any;

@Injectable()

export class RoleService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private menusUrl = 'api/menus';
  private menusUrl = 'api/query/findUser';
  private menusaddUrl = 'api/query/addUser';
  private menusmodifyUrl = 'api/query/modifyUser';
  private menusdeleteUrl = 'api/query/deleteUser';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<User[]> {
    // return this.getWarns()
    //   .then(warns => warns.find(warn => warn.id === id));
    // const url = `${this.menusUrl}/${id}`;
    return this.http.get(this.menusUrl)
      .toPromise()
      .then(response => response.json().objectbean as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    layer.open({
      title: '提示'
      ,content: error
    });
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMenuData(menuId: number): Promise<User> {
    const url = this.menusUrl+'?menuId='+menuId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as User)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }

  create(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
         address: string, remarks: string): Promise<User> {
    return this.http
      .post(this.menusaddUrl, JSON.stringify({userId:userId,userName: userName,password:password,role:role,sex:sex,phoneNumber:phoneNumber,
        address:address,remarks:remarks
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().objectbean as User)
      .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const durl=this.menusdeleteUrl+'?userId='+id;
    return this.http.get(durl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    return this.http
      .post(this.menusmodifyUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  search(term: string): Observable<User []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .map(response => response.json().objectbean as User[]
      );
  }
  search2(term: string): Promise<User []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .toPromise()
      .then(response => response.json().objectbean as User[])
      .catch(this.handleError);
  }
  // addItem(item){
  //     ITEMS.push(item);
  // }
  // test(){
  //     console.log(ITEMS);
  // }

}
