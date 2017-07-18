import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Role } from '../../models/role';
import { Menu } from '../../models/menu';
import { PermissionService } from '../permissions-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.css']
})
export class PermissionTableComponent implements OnInit {
  roles: Role[];
  role: Role;
  menus: Menu[];
  selectedRole: Role;
  private tjmenu:boolean;
  private clicked:boolean;
  private submied:boolean = false;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  private deletemenu:boolean = false;
  Role=new Role();
  private addIDs = [];
  pages: any;
  parentNames = [];
  parentNames2 = [];
  originalRoleId:number;
  originalUserName:string;
  constructor(
    private router: Router,
    private userService: PermissionService,
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
      this.roles = res['list'];
      this.pages  = res['page'];
    });
  }
  onSelect(user: Role): void {
    this.selectedRole = user;
  }

  searchParMenu(): void{
    this.parentNames=[];
    this.userService.getMenuDatas().then( menus => {
      this.menus = menus['allList']
    });
  }
 //  ak(status,id){
 //    !status ? alert('选中') : alert('未选中');
 // }

  add(): void {
    // $.each($('#form1 input[type=checkbox]:checked'),function (index,item) {
    //
    // })
    // $('#form1 input[type=checkbox]:checked').each(function () {
    //   this.addIDs.push($(this).attr(name))
    // })


    // this.addIDs
    // console.log(menuSelected)
    // userName = userName.trim();
    // if(!role){
    //   $('.must3').show();
    //   return;
    // }
    // nickName = nickName.trim();
    // if (!userName && !nickName && !password  && !role  ) { return; }
    // this.userService.create(userName, nickName, password, role)
    //   .then(menu => {
    //     if(!menu) {
    //       layer.open({
    //         title: '提示'
    //         , content: "添加失败"
    //       });
    //       return;
    //     }
    //     if(typeof (menu)=='string'){
    //       layer.open({
    //         title: '提示'
    //         ,content: menu
    //       });
    //     }
    //     this.getElectricities();
    //     this.selectedUser = null;
    //     $('#details').val('');
    //     this.submied = true;
    //     this.tjmenu = false;
    //     this.clicked = false;
    //   });
  }

  // searchParMenu2(id:number): void{
  //   this.originalRoleId=null;
  //   this.originalUserName='';
  //   this.parentNames2=[];
  //
  //   this.userService.getMenuDetail(id).then( menus => {
  //     if(menus['adminUser']){
  //        this.originalRoleId = this.selectedRole.roleList[0].roleId;
  //        this.originalUserName = menus['adminUser']['nickName'];
  //     }
  //     if(menus['adminRoleList']){
  //       for(let i=0;i<menus['adminRoleList'].length;i++){
  //         this.parentNames2.push(menus['adminRoleList'][i])
  //       }
  //     }
  //   });
  // }
  //
  delete(role: Role): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(role.roleId).then(res =>{
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

  // save(usersId:number,userName: string, nickName: string, password: string,  role: number): void {
  //   console.log(this.selectedUser.roleList[0].roleId)
  //   this.userService.update(usersId,this.originalRoleId,this.originalUserName,userName, nickName, password,  role)
  //     .then(res => {
  //       if(res['code'] == 0){
  //         layer.open({
  //           title: '提示'
  //           ,content: '修改成功'
  //         });
  //
  //       }else{
  //         layer.open({
  //           title: '提示'
  //           ,content: res['data']
  //         });
  //         return
  //       }
  //       this.selectedUser = null;
  //       this.getElectricities();
  //       this.deletemenu = false;
  //       this.clicked = false;
  //   });
  // }



      // this.userService.create(userName, nickName, password, role)
      //   .then(menu => {
      //     if(!menu) {
      //       layer.open({
      //         title: '提示'
      //         , content: "添加失败"
      //       });
      //       return;
      //     }
      //     if(typeof (menu)=='string'){
      //       layer.open({
      //         title: '提示'
      //         ,content: menu
      //       });
      //     }
      //     this.getElectricities();
      //     this.selectedRole = null;
      //     $('#details').val('');
      //     this.submied = true;
      //     this.tjmenu = false;
      //     this.clicked = false;
      //   });
  // }




  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







