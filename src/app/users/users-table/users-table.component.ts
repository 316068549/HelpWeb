import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from '../../models/user-model';
import { UserService } from '../users-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: User[];
  user: User;
  selectedUser: User;
  private tjmenu:boolean;
  private clicked:boolean;
  private submied:boolean = false;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  private deletemenu:boolean = false;
  User=new User();
  pages: any;
  parentNames = [];
  parentNames2 = [];
  originalRoleId:number;
  originalUserName:string;
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
  private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getMenuBtns(params['permissionId']))
      .subscribe(rescue => {
        for(let i=0;i<rescue.length;i++){
          if(rescue[i].permissionUrl=="add"){
            this.addbtn = true;
          }
          if(rescue[i].permissionUrl=="edit"){
            this.edit = true;
          }
          if(rescue[i].permissionUrl=="del"){
            this.del = true;
          }

        }
      });
    this.getElectricities();
  }

  getElectricities(): void {
    this.userService.getMenuList().then( res => {
      // if(res['code'] == 0){
      //   this.getElectricities();
      // }else if(res['code'] == 5){
      //   alert(res['error']);
      //   this.router.navigate(['login']);
      // }else if(res['code'] == 6){
      //   alert(res['error']);
      //   this.router.navigate(['login']);
      // }else{
      //   alert(res['error']);
      // }
      this.users = res['list'];
      this.pages  = res['page'];
    });
  }
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  searchParMenu(): void{
    this.parentNames=[];
    this.userService.getParMenus().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.parentNames.push(menus[i])
      }
    });
  }

  searchParMenu2(id:number): void{
    this.originalRoleId=null;
    this.originalUserName='';
    this.parentNames2=[];

    this.userService.getMenuDetail(id).then( menus => {
      if(menus['adminUser']){
         this.originalRoleId = this.selectedUser.roleList[0].roleId;
         this.originalUserName = menus['adminUser']['nickName'];
      }
      if(menus['adminRoleList']){
        for(let i=0;i<menus['adminRoleList'].length;i++){
          this.parentNames2.push(menus['adminRoleList'][i])
        }
        // this.selectedMenu.subPermissionList = menus['subPermissionList'];
        // for(let i=0;i<menus['subPermissionList'].length;i++){
        //   if(this.selectedMenu.permissionParentId==menus['subPermissionList'][i].permissionId){
        //     this.selectedMenu.parentPermission = menus['subPermissionList'][i].permissionParentId;
        //   }
        //   this.parentNames2.push(menus['subPermissionList'][i])
        // }
      }
    });
  }

  delete(user: User): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(user.userId).then(res =>{
          if(res['code'] == 0){
            this.getElectricities();
          }else if(res['code'] == 5){
            alert(res['error']);
            this.router.navigate(['login']);
          }else if(res['code'] == 6){
            alert(res['error']);
            this.router.navigate(['login']);
          }else{
            alert(res['error']);
          }
          layer.close(ak);
        })
      }
      , btn2: () => {

      }
    })
  }

  save(usersId:number,userName: string, nickName: string, password: string,  role: number): void {
    console.log(this.selectedUser.roleList[0].roleId)
    this.userService.update(usersId,this.originalRoleId,this.originalUserName,userName, nickName, password,  role)
      .then(res => {
        if(res['code'] == 0){
          layer.open({
            title: '提示'
            ,content: '修改成功'
          });

        }else{
          layer.open({
            title: '提示'
            ,content: res['data']
          });
          return
        }
        this.selectedUser = null;
        this.getElectricities();
        this.deletemenu = false;
        this.clicked = false;
    });
  }

  ak(a){
    console.log(a)
  }
  // search2(term: string): void{
  //
  //   this.userService.search2(term).then( menus => {
  //     if(typeof (menus)=='string'){
  //       layer.open({
  //         title: '提示'
  //         ,content: '没有查询到数据！'
  //       });
  //     }else{
  //       this.data=menus;
  //     }
  //     console.log(this.data);  userName.value,nickName.value,password.value, role.value,
  //   });
  // }
  add(userName: string, nickName: string, password: string,  role: string,menuSelected: number): void {
    console.log(menuSelected)
    userName = userName.trim();
    if(!role){
      $('.must3').show();
      return;
    }
    nickName = nickName.trim();
    if (!userName && !nickName && !password  && !role  ) { return; }
      this.userService.create(userName, nickName, password, role)
        .then(menu => {
          if(!menu) {
            layer.open({
              title: '提示'
              , content: "添加失败"
            });
            return;
          }
          if(typeof (menu)=='string'){
            layer.open({
              title: '提示'
              ,content: menu
            });
          }
          this.getElectricities();
          this.selectedUser = null;
          $('#details').val('');
          this.submied = true;
          this.tjmenu = false;
          this.clicked = false;
        });
  }

  // add(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
  //     address: string, remarks: string ): void {
  //   userName = userName.trim();
  //   if(!role){
  //     $('.must3').show();
  //     return;
  //   }
  //   address = address.trim();
  //   remarks = remarks.trim();
  //   phoneNumber = phoneNumber.trim();
  //   if (!userId && !userName && !password && !role && !sex && !phoneNumber && !address ) { return; }
  //   this.userService.create(userId,userName, password, role, sex, phoneNumber,address, remarks)
  //     .then(menu => {
  //       if(typeof (menu)=='string'){
  //         layer.open({
  //           title: '提示'
  //           ,content: menu
  //         });
  //       }
  //       this.users.push(menu);
  //       console.log(this.users)
  //       this.getMenus();
  //       this.selectedUser = null;
  //       $('#details').val('');
  //     });
  //   $('#details').val('');
  //   this.tjmenu = false;
  //   this.clicked = false;
  //   layer.open({
  //     title: '提示'
  //     ,content: '添加成功'
  //   });
  // }



  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







