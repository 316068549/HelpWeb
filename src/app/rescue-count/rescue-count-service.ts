import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Rescue } from '../models/rescue';
import { Rescues } from '../mock-data/mock-rescue';
declare var layer:any;

@Injectable()

export class RescueCountService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private menusUrl = 'api/menus';
  private menusUrl = 'api/query/findUser';
  private menusaddUrl = 'api/query/addUser';
  private menusmodifyUrl = 'api/query/modifyUser';
  private menusdeleteUrl = 'api/query/deleteUser';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<Rescue[]> {
    return Promise.resolve(Rescues);
    // return this.getWarns()
    //   .then(warns => warns.find(warn => warn.id === id));
    // const url = `${this.menusUrl}/${id}`;


    // return this.http.get(this.menusUrl)
    //   .toPromise()
    //   .then(response => response.json().objectbean as Rescue[])
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

  getMenuData(rescueId: number): Promise<Rescue> {
    const url = this.menusUrl+'?rescueId='+rescueId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Rescue)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }


  search(term: string): Observable<Rescue []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .map(response => response.json().objectbean as Rescue[]
      );
  }
  search2(term: string): Promise<Rescue []> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .toPromise()
      .then(response => response.json().objectbean as Rescue[])
      .catch(this.handleError);
  }

}
