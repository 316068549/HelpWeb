import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Menu } from '../models/menu';


@Injectable()

export class MenuService {
  private headers = new Headers({'Content-Type': 'application/json'});
  // private menusUrl = 'api/menus';
  private menusUrl = 'api/query/findMenu';
  private menusaddUrl = 'api/query/addMenu';
  private menusmodifyUrl = 'api/query/modifyMenu';
  private menusdeleteUrl = 'api/query/deleteMenu';

  constructor(public http:Http
  ){}

  getMenuDatas(): Promise<Menu[]> {
    // return this.getWarns()
    //   .then(warns => warns.find(warn => warn.id === id));
    // const url = `${this.menusUrl}/${id}`;
    return this.http.get(this.menusUrl)
      .toPromise()
      .then(response => response.json().objectbean as Menu[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getMenuData(menuId: number): Promise<Menu> {
    const url = this.menusUrl+'?menuId='+menuId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().objectbean[0] as Menu)
      .catch(this.handleError);
  }

  // getMenuData(id: number): Promise<Menu> {
  //   return this.getMenuDatas()
  //     .then(menus => menus.find(menu => menu.id === id));
  // }

  create(id:number,name: string, coding: string, address: string,  parentName: string,parentCode: string,
         newWindow: string, details: string): Promise<Menu> {
    return this.http
      .post(this.menusaddUrl, JSON.stringify({menuId:id,menuTitle: name,menuNumber:coding,menuLink:address,menuParentNumber:parentCode,menuParentTitle:parentName,
        menuNewWindow:newWindow,menuRemark:details
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().objectbean as Menu)
      .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const durl=this.menusdeleteUrl+'?menuId='+id;
    return this.http.get(durl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(menu: Menu): Promise<Menu> {
    return this.http
      .post(this.menusmodifyUrl, JSON.stringify(menu), {headers: this.headers})
      .toPromise()
      .then(() => menu)
      .catch(this.handleError);
  }

  search(term: string): Observable<Menu []> {
    return this.http.get(this.menusUrl+'?menuTitle='+term)
      .map(response => response.json().objectbean as Menu[]
      );
  }
  search2(term: string): Promise<Menu []> {
    return this.http.get(this.menusUrl+'?menuTitle='+term)
      .toPromise()
      .then(response => response.json().objectbean as Menu[])
      .catch(this.handleError);
  }
    // addItem(item){
    //     ITEMS.push(item);
    // }
    // test(){
    //     console.log(ITEMS);
    // }

}
