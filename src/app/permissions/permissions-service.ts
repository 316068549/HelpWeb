import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
declare var layer:any;
import { Menu } from '../models/menu';
import { Role } from '../models/role';

@Injectable()

export class PermissionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private headers2 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  private menusbtnUrl = 'adminPermission/query/adminPermissionButton';
  private menusUrl = 'adminPermission/queryAdminPermission';
  private menuslistUrl = 'role/query/adminRole';
  private roleUrl = 'role/query/adminRoleAll';
  private userUrl = 'admin/query/adminUserId';
  private menusaddUrl = 'admin/add/adminUser';
  private menusmodifyUrl = 'admin/update/adminUser';
  private menusdeleteUrl = 'admin/del/adminUser';
  private userId = localStorage.getItem("userId");
  private roleId = localStorage.getItem("roleId");
  private tokenId = localStorage.getItem("tokenId");
  private parUrl;

  constructor(public http:Http
  ){}

  getMenuList(current?:number,size?:number): Promise<object> {
    let uurl='';
    if(current){
      uurl = this.menuslistUrl+'?current='+current +'&size='+ size +'?tokenId='+this.tokenId;
    }else{
      uurl = this.menuslistUrl+'?tokenId='+this.tokenId;
    }
    return this.http.get(uurl)
      .toPromise()
      .then(response => response.json().data as object)
      .catch(this.handleError);
  }

  getMenuBtns(id:number): Promise<Menu[]> {
    const url = this.menusbtnUrl+'?permissionId='+id+'&roleId='+this.roleId+'&userId='+this.userId+'&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Menu[])
      .catch(this.handleError);
  }

  getMenuDatas(): Promise<object> {
    const url = this.menusUrl+'?null&userId=undefined&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as object)
      .catch(this.handleError);
  }

  getParMenus(): Promise<Role[]> {
      this.parUrl = this.roleUrl+'?roleId='+this.roleId+'&userId='+this.userId+'&tokenId='+this.tokenId;
    return this.http.get(this.parUrl)
      .toPromise()
      .then(response => response.json().data as Role[])
      .catch(this.handleError);
  }

  getMenuDetail(id:number): Promise<object> {
    const url = this.userUrl+'?usersId='+id+'&roleId='+this.roleId+'&userId='+this.userId+'&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as object)
      .catch(this.handleError);
  }

  // create(userName: string, nickName: string, password: string,  role: string): Promise<User> {
  //   let parment = 'addId='+''+'&userName='+userName+'&nickName='+nickName+'&userPassword='+password+
  //     '&roleId='+role+'&userId='+this.userId+'&tokenId='+this.tokenId;
  //   console.log(parment)
  //   return this.http
  //     .post(this.menusaddUrl,parment,{headers:this.headers2})
  //     .toPromise()
  //     .then(res => res.json().data as User)
  //     .catch(this.handleError);
  // }
  //
  delete(id: number): Promise<object> {
    const durl=this.menusdeleteUrl+'?usersId='+id+'&tokenId='+this.tokenId;
    return this.http.get(durl)
      .toPromise()
      .then((res) => res.json() as object)
      .catch(this.handleError);
  }
  //
  // update(usersId:number,originalRoleId:number,originalUserName:string,userName: string, nickName: string, password: string,  role: number): Promise<object> {
  //   console.log(role)
  //   let parment = 'addId='+''+'&usersId='+usersId+'&originalRoleId='+originalRoleId+'&originalUserName='+originalUserName+'&userName='+userName+'&nickName='+nickName+
  //     '&password='+password+'&roleId='+role+
  //     '&userId='+this.userId+'&tokenId='+this.tokenId;
  //   console.log(parment)
  //   return this.http
  //     .post(this.menusmodifyUrl, parment, {headers: this.headers2})
  //     .toPromise()
  //     .then(res => res.json() as object)
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    layer.open({
      title: '提示'
      ,content: error
    });
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // search(term: string): Observable<User []> {
  //   return this.http.get(this.menusUrl+'?userName='+term)
  //     .map(response => response.json().objectbean as User[]
  //     );
  // }
  // search2(term: string): Promise<User []> {
  //   return this.http.get(this.menusUrl+'?userName='+term)
  //     .toPromise()
  //     .then(response => response.json().objectbean as User[])
  //     .catch(this.handleError);
  // }


}
