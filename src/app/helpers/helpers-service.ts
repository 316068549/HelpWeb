import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Helpers } from '../models/helpers';
declare var layer:any;

@Injectable()

export class HelperService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private menusUrl = 'api/helpers';
  // private menusUrl = 'api/query/findUser';
  // private menusaddUrl = 'api/query/addUser';
  // private menusmodifyUrl = 'api/query/modifyUser';
  // private menusdeleteUrl = 'api/query/deleteUser';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<Helpers[]> {
    // return this.getWarns()
    //   .then(warns => warns.find(warn => warn.id === id));
    // const url = `${this.menusUrl}/${id}`;
    return this.http.get(this.menusUrl)
      .toPromise()
      .then(response => response.json().data as Helpers[])
      .catch(this.handleError);
    // return this.http.get(this.menusUrl)
    //   .toPromise()
    //   .then(response => response.json().objectbean as Helpers[])
    //   .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    layer.open({
      title: '提示'
      ,content: error
    });
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMenuData(menuId: number): Promise<Helpers> {
    const url = this.menusUrl+'?helperId='+menuId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Helpers)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }  helperId,helperName,age,sex,address,phoneNumber,nationalId

  create(helperId:number,helperName: string, age: number, sex: string,  address: string,phoneNumber: string,
                 nationalId: string): Promise<Helpers> {
    return this.http
      .post(this.menusUrl, JSON.stringify({helperId:helperId,helperName: helperName,age:age,sex:sex,address:address,phoneNumber:phoneNumber,nationalId:nationalId}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Helpers)
      .catch(this.handleError);
  }

  // create(helperId:number,helperName: string, age: number, sex: string,  address: string,phoneNumber: string,
  //        nationalId: string): Observable<Helpers> {
  //   return this.http
  //     .post(this.menusUrl, JSON.stringify({helperId:helperId,helperName: helperName,age:age,sex:sex,address:address,phoneNumber:phoneNumber,nationalId:nationalId}), {headers: this.headers})
  //     .map(response => {
  //         let result=response.json();
  //         return result;
  //       })
  //   // return this.http
  //   //   .post(this.menusaddUrl, JSON.stringify({userId:userId,userName: userName,password:password,role:role,sex:sex,phoneNumber:phoneNumber,
  //   //     address:address,remarks:remarks
  //   //   }), {headers: this.headers})
  //   //   .map(response => {
  //   //       let result=response.json();
  //   //       return result;
  //   //     }
  //   //   )
  // }


  delete(helperId: number): Promise<void> {
    const durl=`${this.menusUrl}/${helperId}`;
    return this.http.delete(durl,{headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);


    // const durl=this.menusUrl+'?helperId='+id;
    // return this.http.get(durl)
    //   .toPromise()
    //   .then(() => null)
    //   .catch(this.handleError);
    // const durl=this.menusdeleteUrl+'?userId='+id;
    // return this.http.get(durl)
    //   .toPromise()
    //   .then(() => null)
    //   .catch(this.handleError);
  }

  update(user: Helpers): Promise<Helpers> {
    const url = `${this.menusUrl}/${user.helperId}`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
    // return this.http
    //   .post(this.menusmodifyUrl, JSON.stringify(user), {headers: this.headers})
    //   .toPromise()
    //   .then(() => user)
    //   .catch(this.handleError);
  }



  search(term: string): Observable<Helpers []> {
    return this.http.get(this.menusUrl+'?helperName='+term)
      .map(response => response.json().objectbean as Helpers[]
      );
    // return this.http.get(this.menusUrl+'?userName='+term)
    //   .map(response => response.json().objectbean as Helpers[]
    //   );
  }
  search2(term: string): Promise<Helpers[]> {
    return this.http
      .get(`api/helpers/?helperName=${term}`)
      .toPromise()
      .then(response => response.json().data as Helpers[])
      .catch(this.handleError);
  }
  // search2(term: string): Promise<Helpers []> {
  //   return this.http.get(this.menusUrl+'?helperName='+term)
  //     .toPromise()
  //     .then(response => response.json().objectbean as Helpers[])
  //     .catch(this.handleError);
  // }
  //   return this.http.get(this.menusUrl+'?userName='+term)
  //     .toPromise()
  //     .then(response => response.json().objectbean as Helpers[])
  //     .catch(this.handleError);
  // }
  // addItem(item){
  //     ITEMS.push(item);
  // }
  // test(){
  //     console.log(ITEMS);
  // }

}
