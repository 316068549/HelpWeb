import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Dictionary } from '../models/dictionary';
declare var layer:any;

@Injectable()

export class DataService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private menusUrl = 'api/menus';
  private menusUrl = 'api/query/findData';
  private menusaddUrl = 'api/query/addData';
  private menusmodifyUrl = 'api/query/modifyData';
  private menusdeleteUrl = 'api/query/deleteData';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<Dictionary[]> {
    // return this.getWarns()
    //   .then(warns => warns.find(warn => warn.id === id));
    // const url = `${this.menusUrl}/${id}`;
    return this.http.get(this.menusUrl)
      .toPromise()
      .then(response => response.json().objectbean as Dictionary[])
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

  getMenuData(dataId: number): Promise<Dictionary> {
    const url = this.menusUrl+'?dataId='+dataId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Dictionary)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }
  change(obj){
    if(obj=="true"){
      return "是";
    }else{
      return "否";
    }
  }
  create(dataId:number,dataName: string, dataCode: string, dataValid: string,  dataCommon: string,dataEnableEditing: string,
         dataDeleteAllowed: string): Observable<Dictionary[]> {
    // dataValid=this.change(dataValid);
    // dataEnableEditing=this.change(dataEnableEditing);
    // dataCommon=this.change(dataCommon);
    // dataDeleteAllowed=this.change(dataDeleteAllowed);

    return this.http
      .post(this.menusaddUrl, JSON.stringify({dataId:dataId,dataName: dataName,dataCode:dataCode,dataValid:dataValid,dataCommon:dataCommon,dataEnableEditing:dataEnableEditing,
        dataDeleteAllowed:dataDeleteAllowed
      }), {headers: this.headers})
      .map(response => {

          let result=response.json();
          return result;

        // else {
        //   layer.open({
        //     title: '提示'
        //     , content: response.json().objectbean
        //   });
        //   return 1;
        // }
        }
      )
      // .toPromise()
      // .then(res =>{
      //   if(res.status==1){
      //     res.json().objectbean as Dictionary
      //   }else{
      //     layer.open({
      //       title: '提示'
      //       ,content: res.json().objectbean
      //     });
      //     return;
      //   }
      //
      // } )
      // .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const durl=this.menusdeleteUrl+'?dataId='+id;
    return this.http.get(durl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(dataId:number,dataName: string, dataCode: string, dataValid: string,  dateCommon: string,dataEnableEditing: string,
         dateDeleteAllowed: string): Promise<Dictionary> {
    // data.dataValid=this.change(data.dataValid.toString());
    // data.dataEnableEditing=this.change(data.dataEnableEditing.toString());
    // data.dataCommon=this.change(data.dataCommon.toString());
    // data.dataDeleteAllowed=this.change(data.dataDeleteAllowed.toString());
    // if(data.dataValid.toString()=="true"){
    //   data.dataValid="是";
    // }
    // if(data.dataValid.toString()=="false"){
    //   data.dataValid="否";
    // }
    return this.http
      .post(this.menusmodifyUrl, JSON.stringify({dataId:dataId,dataName: dataName,dataCode:dataCode,dataValid:dataValid,dataCommon:dateCommon,dataEnableEditing:dataEnableEditing,
        dataDeleteAllowed:dateDeleteAllowed
      }), {headers: this.headers})
      .toPromise()
      .then(() => null )
      .catch(this.handleError);
  }

  search(term: string): Observable<Dictionary []> {
    return this.http.get(this.menusUrl+'?dataName='+term)
      .map(response => response.json().objectbean as Dictionary[]
      );
  }
  search2(term: string): Promise<Dictionary []> {
    return this.http.get(this.menusUrl+'?dataName='+term)
      .toPromise()
      .then(response => response.json().objectbean as Dictionary[])
      .catch(this.handleError);
  }
  // addItem(item){
  //     ITEMS.push(item);
  // }
  // test(){
  //     console.log(ITEMS);
  // }

}
