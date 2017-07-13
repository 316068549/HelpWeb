import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Device } from '../models/device';
import { Devices } from '../mock-data/mock-device';
declare var layer:any;

@Injectable()

export class DeviceService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private menusUrl = 'api/menus';
  private menusUrl = 'api/query/findUser';
  private menusaddUrl = 'api/query/addUser';
  private menusmodifyUrl = 'api/query/modifyUser';
  private menusdeleteUrl = 'api/query/deleteUser';

  constructor(public http:Http
  ){}
  getMenuDatas(): Promise<Device[]> {
    return Promise.resolve(Devices);
  }


  // getMenuDatas(): Promise<Device[]> {
  //   // return this.getWarns()
  //   //   .then(warns => warns.find(warn => warn.id === id));
  //   // const url = `${this.menusUrl}/${id}`;
  //   return this.http.get(this.menusUrl)
  //     .toPromise()
  //     .then(response => response.json().objectbean as Device[])
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMenuData(menuId: number): Promise<Device> {
    const url = this.menusUrl+'?menuId='+menuId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Device)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }

  create(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
         address: string, remarks: string): Observable<Device> {
    return this.http
      .post(this.menusaddUrl, JSON.stringify({userId:userId,userName: userName,password:password,role:role,sex:sex,phoneNumber:phoneNumber,
        address:address,remarks:remarks
      }), {headers: this.headers})
      .map(response => {
          let result=response.json();
          return result;
        }
      )
  }


  delete(id: number): Promise<void> {
    const durl=this.menusdeleteUrl+'?userId='+id;

    return this.http.get(durl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(user: Device): Promise<Device> {
    return this.http
      .post(this.menusmodifyUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  search(term: string): Observable<Device []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .map(response => response.json().objectbean as Device[]
      );
  }
  search2(term: string): Promise<Device []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .toPromise()
      .then(response => response.json().objectbean as Device[])
      .catch(this.handleError);
  }


}
