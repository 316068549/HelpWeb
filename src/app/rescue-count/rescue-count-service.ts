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
  private menusUrl = 'api/query/findUser';
  // private menusaddUrl = 'api/query/addUser';
  // private menusmodifyUrl = 'api/query/modifyUser';
  // private menusdeleteUrl = 'api/query/deleteUser';
  private userId = localStorage.getItem("userId");
  private roleId = localStorage.getItem("roleId");
  private tokenId = localStorage.getItem("tokenId");
  private parUrl;

  constructor(public http:Http
  ){}

  getMenuDatas(current?:number,size?:number): Promise<object> {
    let uurl='';
    if(current){
      uurl = this.menusUrl+'?pageIndex='+current +'&pageSize=5&tokenId='+this.tokenId;
    }else{
      uurl = this.menusUrl+'?tokenId='+this.tokenId;
    }
    return this.http.get(uurl)
      .toPromise()
      .then(response => response .json() as object)
      .catch(this.handleError);
  }

  search2(term: string): Promise<object> {
    return this.http.get(this.menusUrl+'?userName='+term)
      .toPromise()
      .then(response => response.json().data as object)
      .catch(this.handleError);
  }

  // getMenuDatas(): Promise<Rescue[]> {
  //   return Promise.resolve(Rescues);
  // }

  private handleError(error: any): Promise<any> {
    layer.open({
      title: '提示'
      ,content: error
    });
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getMenuData(rescueId: number): Promise<Rescue> {
  //   const url = this.menusUrl+'?rescueId='+rescueId;
  //   return this.http.get(url)
  //     .toPromise()
  //     .then(response => response.json().objectbean[0] as Rescue)
  //     .catch(this.handleError);
  // }


  // search(term: string): Observable<Rescue []> {
  //   return this.http.get(this.menusUrl+'?userName='+term)
  //     .map(response => response.json().objectbean as Rescue[]
  //     );
  // }


}
