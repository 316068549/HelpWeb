import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Permission } from '../models/permission';
declare var layer:any;

@Injectable()

export class PermissionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private menusUrl = 'api/query/findData';
  private menusaddUrl = 'api/query/addData';
  private menusmodifyUrl = 'api/query/modifyData';
  private menusdeleteUrl = 'api/query/deleteData';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<Permission[]> {
    return this.http.get(this.menusUrl)
      .toPromise()
      .then(response => response.json().objectbean as Permission[])
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

  getMenuData(dataId: number): Promise<Permission> {
    const url = this.menusUrl+'?dataId='+dataId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Permission)
      .catch(this.handleError);
  }


  create(dataId:number,dataName: string, dataCode: string, dataValid: string,  dateCommon: string,dataEnableEditing: string,
         dateDeleteAllowed: string): Observable<Permission[]> {
    return this.http
      .post(this.menusaddUrl, JSON.stringify({dataId:dataId,dataName: dataName,dataCode:dataCode,dataValid:dataValid,dateCommon:dateCommon,dataEnableEditing:dataEnableEditing,
        dateDeleteAllowed:dateDeleteAllowed
      }), {headers: this.headers})
      .map(response => {

          let result=response.json();
          return result;
        }
      )

  }


  delete(id: number): Promise<void> {
    const durl=this.menusdeleteUrl+'?dataId='+id;
    return this.http.get(durl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(data: Permission): Promise<Permission> {

    return this.http
      .post(this.menusmodifyUrl, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(() => data)
      .catch(this.handleError);
  }


  search2(term: string): Promise<Permission []> {
    return this.http.get(this.menusUrl+'?dataName='+term)
      .toPromise()
      .then(response => response.json().objectbean as Permission[])
      .catch(this.handleError);
  }


}
