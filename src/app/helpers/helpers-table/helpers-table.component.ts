import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Helpers } from '../../models/helpers';
import { HelperService } from '../helpers-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-helpers-table',
  templateUrl: './helpers-table.component.html',
  styleUrls: ['./helpers-table.component.css']
})
export class HelpersTableComponent implements OnInit {
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  helpers: Helpers[];
  helper: Helpers;
  selectedHelper: Helpers;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  Helpers=new Helpers();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: HelperService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();
  }
  delete(userId: number): void{
    layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(userId).then(() =>{
          this.getMenus();
        })
      }
      , btn2: () => {

      }
    })
  }

  getElectricities(): void {
    this.userService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.helpers = electricities
      this.data = this.helpers;
    });
  }

  onSelect(helper: Helpers): void {
    this.selectedHelper = helper;
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
          this.selectedHelper = null;
          this.tjmenu = false;
          this.clicked = false;
        }else{
          layer.open({
            title: '提示'
            ,content: res["objectbean"],
            end:function () {
              $('#helperId').focus();
            }
          });

        }
      });
  }
  getMenus(): void {
    this.userService.getMenuDatas().then( menus => {
      this.helpers  = menus;
      this.data = this.helpers;
    });
  }
  save(): void {
    this.userService.update(this.selectedHelper)
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







