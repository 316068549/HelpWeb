import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Menu } from '../models/menu';
import { Helpers } from '../models/helpers';
declare var layer:any;

@Injectable()

export class HelperService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private headers2 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  private menusbtnUrl = 'adminPermission/query/adminPermissionButton';
  private menusUrl2 = 'web/vo/findVos';
  private menusUrl = 'web/vo/findVo';
  private menusaddUrl = 'web/vo/addVo';
  private menusmodifyUrl = 'web/vo/modifyVo';
  private menusdeleteUrl = 'web/vo/deleteVo';
  private userId = localStorage.getItem("userId");
  private roleId = localStorage.getItem("roleId");
  private tokenId = localStorage.getItem("tokenId");
  private parUrl;

  constructor(public http:Http
  ){}

  getMenuBtns(id:number): Promise<Menu[]> {
    const url = this.menusbtnUrl+'?permissionId='+id+'&roleId='+this.roleId+'&userId='+this.userId+'&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Menu[])
      .catch(this.handleError);
  }

  getMenuDatas(current?:number,size?:number): Promise<object> {
    let uurl='';
    if(current){
      uurl = this.menusUrl2+'?pageIndex='+current +'&pageSize=5&tokenId='+this.tokenId;
    }else{
      uurl = this.menusUrl2+'?tokenId='+this.tokenId;
    }
    return this.http.get(uurl)
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError);
  }

  search2(term: string): Promise<Helpers> {
    return this.http.get(this.menusUrl+'?mobile='+term)
      .toPromise()
      .then(response => response.json().data as Helpers)
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

  // create(helperId:number,helperName: string, age: number, sex: string,  address: string,phoneNumber: string,
  //                nationalId: string): Promise<Helpers> {
  //   return this.http
  //     .post(this.menusUrl, JSON.stringify({helperId:helperId,helperName: helperName,age:age,sex:sex,address:address,phoneNumber:phoneNumber,nationalId:nationalId}), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().data as Helpers)
  //     .catch(this.handleError);
  // }

  create(helperName: string, sex: string, password: string,phone: string,
         nationalId: string, rescue: string,imageUrl:string): Observable<Helpers> {
    return this.http
      .post(this.menusaddUrl, JSON.stringify({name: helperName,sex:sex,password:password,mobile:phone,identityCard:nationalId,rescueTeam:rescue,imageUrl:imageUrl}), {headers: this.headers})
      .map(response => {
          let result=response.json();
          return result;
        })
    // return this.http
    //   .post(this.menusaddUrl, JSON.stringify({userId:userId,userName: userName,password:password,role:role,sex:sex,phoneNumber:phoneNumber,
    //     address:address,remarks:remarks
    //   }), {headers: this.headers})
    //   .map(response => {
    //       let result=response.json();
    //       return result;
    //     }
    //   )
  }


  delete(helperId: string): Promise<object> {
    const durl=this.menusdeleteUrl+'?volunteerId='+helperId;
    return this.http.get(durl)
      .toPromise()
      .then(res => res.json() as object)
      .catch(this.handleError);
  }

  update(user: Helpers): Promise<Helpers> {
    // const url = `${this.menusUrl}/${user.helperId}`;
    // return this.http
    //   .post(url, JSON.stringify(user), {headers: this.headers})
    //   .toPromise()
    //   .then(() => user)
    //   .catch(this.handleError);
    return this.http
      .post(this.menusmodifyUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }



  // search(term: string): Observable<Helpers []> {
  //   return this.http.get(this.menusUrl+'?helperName='+term)
  //     .map(response => response.json().objectbean as Helpers[]
  //     );
  //   // return this.http.get(this.menusUrl+'?userName='+term)
  //   //   .map(response => response.json().objectbean as Helpers[]
  //   //   );
  // }
  // search2(term: string): Promise<Helpers[]> {
  //   return this.http
  //     .get(`api/helpers/?helperName=${term}`)
  //     .toPromise()
  //     .then(response => response.json().data as Helpers[])
  //     .catch(this.handleError);
  // }


  // addItem(item){
  //     ITEMS.push(item);
  // }
  // test(){
  //     console.log(ITEMS);
  // }

}
