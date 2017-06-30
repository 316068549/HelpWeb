import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from '../../models/users';
import { UserService } from '../users-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  users: User[];
  user: User;
  selectedUser: User;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  User=new User();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();
  }
  delete(userId: number): void{

    this.userService.delete(userId).then(() =>{
      layer.open({
        title: '提示'
        ,content: '删除成功！'
      });
    })
    this.getMenus();
  }

  getElectricities(): void {
    this.userService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.users = electricities
      this.data = this.users;
    });
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    // console.log(electricity.data);

  }

  search2(term: string): void{

    this.userService.search2(term).then( menus => {
      if(typeof (menus)=='string'){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }else{
        this.data=menus;
      }
      console.log(this.data);
    });
  }
  add(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
      address: string, remarks: string ): void {
    userName = userName.trim();
    if(!role){
      $('.must3').show();
      return;
    }
    address = address.trim();
    remarks = remarks.trim();
    phoneNumber = phoneNumber.trim();
    if (!userId && !userName && !password && !role && !sex && !phoneNumber && !address ) { return; }
    this.userService.create(userId,userName, password, role, sex, phoneNumber,address, remarks)
      .then(menu => {
        if(typeof (menu)=='string'){
          layer.open({
            title: '提示'
            ,content: menu
          });
        }
        this.users.push(menu);
        console.log(this.users)
        this.getMenus();
        this.selectedUser = null;
        $('#details').val('');
      });
    $('#details').val('');
    this.tjmenu = false;
    this.clicked = false;
    layer.open({
      title: '提示'
      ,content: '添加成功'
    });
  }
  getMenus(): void {
    this.userService.getMenuDatas().then( menus => {
      this.users  = menus;
      this.data = this.users;
    });
  }
  save(): void {
    this.userService.update(this.selectedUser)
      .then(() => {this.getMenus();this.deletemenu = false;this.clicked = false;
        layer.open({
          title: '提示'
          ,content: '修改成功'
        });

    });
  }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







