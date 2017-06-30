import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Permission } from '../../models/permission';
import { PermissionService } from '../permission-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.css']
})
export class PermissionTableComponent implements OnInit {
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  permissions: Permission[];
  permission: Permission;
  selectedPermission: Permission;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;

  Dictionary=new Permission();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private dataService: PermissionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();

  }

  delete(userId: number): void{
      this.dataService.delete(userId).then(() =>{
        this.getMenus();
      })
    layer.open({
      title: '提示'
      ,content: '删除成功！'
    });
  }

  getElectricities(): void {
    this.dataService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.permissions = electricities
      this.data = this.permissions;
    });
  }

  onSelect(user: Permission): void {
    this.selectedPermission = user;
    // console.log(electricity.data);

  }

  search2(term: string): void{

    this.dataService.search2(term).then( menus => {
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
  add(dataId:number,dataName: string, dataCode: string, dataValid: string,  dateCommon: string,dataEnableEditing: string,
      dateDeleteAllowed: string ) {
    dataName = dataName.trim();
    dataCode = dataCode.trim();
    if (!dataId && !dataName && !dataCode && !dataValid && !dateCommon && !dataEnableEditing && !dateDeleteAllowed ) { return; }
     this.dataService.create(dataId,dataName, dataCode, dataValid, dateCommon, dataEnableEditing,dateDeleteAllowed)
      .subscribe(res => {
        console.log(res["status"])
        // console.log(typeof (res))
          if(res["status"]==1){
            layer.open({
              title: '提示'
              ,content: '添加成功'
            });
            // this.dictionarys.push(menu);
            this.getMenus();
            this.selectedPermission = null;
            this.tjmenu = false;
            this.clicked = false;
          }else{
            layer.open({
              title: '提示'
              ,content: res["objectbean"],
              end:function () {
                $('#dataId').focus();
              }
            });

          }
      });
  }
  getMenus(): void {
    this.dataService.getMenuDatas().then( menus => {
      this.permissions  = menus;
      this.data = this.permissions;
    });
  }
  save(): void {
    this.dataService.update(this.selectedPermission)
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







