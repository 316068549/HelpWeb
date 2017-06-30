import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Role } from '../../models/role';
import { RoleService} from '../roles-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css']
})
export class RoleTableComponent implements OnInit {
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  roles: Role[];
  role: Role;
  selectedRole: Role;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  User=new Role();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private roleService: RoleService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();
  }
  delete(userId: number): void{

    this.roleService.delete(userId).then(() =>{
      layer.open({
        title: '提示'
        ,content: '删除成功！'
      });
    })
    this.getMenus();
  }

  getElectricities(): void {
    this.roleService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.roles = electricities
      this.data = this.roles;
    });
  }

  onSelect(user: Role): void {
    this.selectedRole = user;
    // console.log(electricity.data);

  }

  search2(term: string): void{

    this.roleService.search2(term).then( menus => {
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
    this.roleService.create(userId,userName, password, role, sex, phoneNumber,address, remarks)
      .then(menu => {
        if(typeof (menu)=='string'){
          layer.open({
            title: '提示'
            ,content: menu
          });
        }
        this.roles.push(menu);
        console.log(this.roles)
        this.getMenus();
        this.selectedRole = null;
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
    this.roleService.getMenuDatas().then( menus => {
      this.roles  = menus;
      this.data = this.roles;
    });
  }
  save(): void {
    this.roleService.update(this.selectedRole)
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







