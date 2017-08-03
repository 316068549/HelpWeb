import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { rescuePaper } from '../models/rescue-paper';
declare var layer:any;

@Injectable()

export class RescuePapersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private menusUrl = 'web/query/allRescue';
  private menusdetailUrl = 'web/query/allRescueUrl';
  private userId = localStorage.getItem("userId");
  private roleId = localStorage.getItem("roleId");
  private tokenId = localStorage.getItem("tokenId");

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

  search2(IMEI: string): Promise<object> {
    return this.http.get(this.menusUrl+'?rescueTeam='+IMEI+'&pageIndex=1&pageSize=5&tokenId='+this.tokenId)
      .toPromise()
      .then(response => response.json().data as object)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMenuData(taskId: number): Promise<object> {
    const url = this.menusdetailUrl+'?taskId='+taskId+'&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError);
  }


}
