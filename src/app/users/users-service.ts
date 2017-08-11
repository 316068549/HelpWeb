import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { User } from '../models/user-model';
declare var layer:any;
import { Menu } from '../models/menu';
import { Role } from '../models/role';
import { rescueTeam } from '../models/rescueTeams';

@Injectable()

export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private headers2 = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  private menusbtnUrl = 'adminPermission/query/adminPermissionButton';
  private menuslistUrl = 'admin/query/adminUser';
  private rescueslistUrl = 'wwe/rescueTeam/find';
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
      uurl = this.menuslistUrl+'?current='+current +'&size='+ size +'&tokenId='+this.tokenId;
    }else{
      uurl = this.menuslistUrl+'?tokenId='+this.tokenId;
    }
    return this.http.get(uurl)
      .toPromise()
      .then(response => response.json() as object)
      .catch(this.handleError);
  }

  getMenuBtns(id:number): Promise<Menu[]> {
    const url = this.menusbtnUrl+'?permissionId='+id+'&roleId='+this.roleId+'&userId='+this.userId+'&tokenId='+this.tokenId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Menu[])
      .catch(this.handleError);
  }

  getRescuesList(): Promise<rescueTeam[]> {
    return this.http.get(this.rescueslistUrl)
      .toPromise()
      .then(response => response.json().data as rescueTeam[])
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

  create(userName: string, nickName: string, password: string,  role: string,rescueTeam:string): Promise<User> {
    let parment = 'addId='+''+'&userName='+userName+'&nickName='+nickName+'&userPassword='+password+'&rescueTeamId='+rescueTeam+
      '&roleId='+role+'&userId='+this.userId+'&tokenId='+this.tokenId;
    console.log(parment)
    return this.http
      .post(this.menusaddUrl,parment,{headers:this.headers2})
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  delete(id: number): Promise<object> {
    const durl=this.menusdeleteUrl+'?usersId='+id+'&tokenId='+this.tokenId;
    return this.http.get(durl)
      .toPromise()
      .then((res) => res.json() as object)
      .catch(this.handleError);
  }

  update(usersId:number,originalRoleId:number,originalUserName:string,userName: string, nickName: string, password: string,  role: number,rescueTeam: string): Promise<object> {
    console.log(role)
    let parment = 'addId='+''+'&usersId='+usersId+'&originalRoleId='+originalRoleId+'&originalUserName='+originalUserName+'&userName='+userName+'&nickName='+nickName+
      '&password='+password+'&roleId='+role+'&rescueTeamId='+rescueTeam+
      '&userId='+this.userId+'&tokenId='+this.tokenId;
    console.log(parment)
    return this.http
      .post(this.menusmodifyUrl, parment, {headers: this.headers2})
      .toPromise()
      .then(res => res.json() as object)
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



  // create(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
  //        address: string, remarks: string): Promise<User> {
  //   return this.http
  //     .post(this.menusaddUrl, JSON.stringify({userId:userId,userName: userName,password:password,role:role,sex:sex,phoneNumber:phoneNumber,
  //       address:address,remarks:remarks
  //     }), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json().objectbean as User)
  //     .catch(this.handleError);
  // }
  //
  //
  // delete(id: number): Promise<void> {
  //   const durl=this.menusdeleteUrl+'?userId='+id;
  //   return this.http.get(durl)
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  //
  // update(user: User): Promise<User> {
  //   return this.http
  //     .post(this.menusmodifyUrl, JSON.stringify(user), {headers: this.headers})
  //     .toPromise()
  //     .then(() => user)
  //     .catch(this.handleError);
  // }

  // search(term: string): Observable<User []> {
  //   return this.http.get(this.menusUrl+'?userName='+term)
  //     .map(response => response.json().objectbean as User[]
  //     );
  // }

  // addItem(item){
  //     ITEMS.push(item);
  // }
  // test(){
  //     console.log(ITEMS);
  // }

}
